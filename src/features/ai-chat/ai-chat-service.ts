import { getAIChatAccess, getAIChatEntitlement } from './access';
import { aiAssistantTextIsSafe } from './safety';
import type {
  AIChat,
  AIChatAccess,
  AIChatMessage,
  AIChatResponse,
} from './types';

import { supabase } from '@/lib/supabase';

const chatFields =
  'id, user_id, title, context_scope, last_message_at, created_at, updated_at';

const messageFields =
  'id, user_id, chat_id, role, content, safety_status, generation_source, model, input_tokens, output_tokens, created_at';

function assertSupabaseConfigured() {
  if (!supabase) {
    throw new Error('Supabase is not configured.');
  }

  return supabase;
}

function assertSafeAssistantMessages(messages: AIChatMessage[]) {
  messages.forEach((message) => {
    if (
      message.role === 'assistant' &&
      !aiAssistantTextIsSafe(message.content)
    ) {
      throw new Error('AI Chat content did not pass safety validation.');
    }
  });
}

async function getFunctionErrorMessage(error: unknown) {
  if (error && typeof error === 'object' && 'context' in error) {
    const context = error.context as { json?: () => Promise<unknown> };

    if (typeof context?.json === 'function') {
      try {
        const body = (await context.json()) as { error?: unknown };

        if (typeof body.error === 'string') {
          return body.error;
        }
      } catch {
        return null;
      }
    }
  }

  return error instanceof Error ? error.message : null;
}

export async function getAIChatUsage(userId: string) {
  const client = assertSupabaseConfigured();
  const { count, error } = await client
    .from('ai_messages')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('role', 'user');

  if (error) {
    throw error;
  }

  return count ?? 0;
}

export async function getRecentAIChat(userId: string) {
  const client = assertSupabaseConfigured();
  const { data: chat, error } = await client
    .from('ai_chats')
    .select(chatFields)
    .eq('user_id', userId)
    .order('last_message_at', { ascending: false })
    .limit(1)
    .maybeSingle<AIChat>();

  if (error) {
    throw error;
  }

  if (!chat) {
    return { chat: null, messages: [] as AIChatMessage[] };
  }

  const { data: messages, error: messagesError } = await client
    .from('ai_messages')
    .select(messageFields)
    .eq('user_id', userId)
    .eq('chat_id', chat.id)
    .order('created_at', { ascending: true })
    .limit(30)
    .returns<AIChatMessage[]>();

  if (messagesError) {
    throw messagesError;
  }

  const safeMessages = messages ?? [];
  assertSafeAssistantMessages(safeMessages);

  return { chat, messages: safeMessages };
}

export async function loadAIChatState(userId: string) {
  const [usage, recent] = await Promise.all([
    getAIChatUsage(userId),
    getRecentAIChat(userId),
  ]);
  const access = getAIChatAccess(getAIChatEntitlement(), usage);

  return { ...recent, access };
}

export async function sendAIChatMessage({
  chatId,
  message,
}: {
  chatId: string | null;
  message: string;
}) {
  const client = assertSupabaseConfigured();
  const { data, error } = await client.functions.invoke<AIChatResponse>(
    'ai-chat',
    {
      body: {
        chat_id: chatId,
        message,
      },
    },
  );

  if (error) {
    throw new Error(
      (await getFunctionErrorMessage(error)) ??
        'Nova is not ready to chat yet. Please try again.',
    );
  }

  if (!data?.chat || !data.assistant_message || !data.messages) {
    throw new Error('Nova is not ready to chat yet. Please try again.');
  }

  assertSafeAssistantMessages(data.messages);

  return data;
}

export function upgradeAccessAfterLocalSend(access: AIChatAccess) {
  if (access.entitlement !== 'free') {
    return access;
  }

  return {
    entitlement: access.entitlement,
    limit_reached: true,
    remaining_free_messages: 0,
  };
}
