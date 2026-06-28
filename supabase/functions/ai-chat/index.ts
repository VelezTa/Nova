import { createClient } from 'npm:@supabase/supabase-js@2';

type ChatEntitlement = 'free' | 'plus' | 'pro';

type AIChat = {
  id: string;
  user_id: string;
  title: string;
  context_scope: string;
  last_message_at: string;
  created_at: string;
  updated_at: string;
};

type AIMessage = {
  id: string;
  user_id: string;
  chat_id: string;
  role: 'user' | 'assistant';
  content: string;
  safety_status: 'safe' | 'redirected';
  generation_source: 'user' | 'openai' | 'safety_redirect';
  model: string | null;
  input_tokens: number | null;
  output_tokens: number | null;
  created_at: string;
};

type ProfileRow = {
  cosmic_summary: string | null;
  id: string;
  main_interest: string;
  name: string;
};

type BirthProfileRow = {
  approximate_time_range: string | null;
  birth_city: string;
  birth_country: string;
  birth_date: string;
  birth_time: string | null;
  birth_time_accuracy: string;
  name: string;
};

const corsHeaders = {
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const chatFields =
  'id, user_id, title, context_scope, last_message_at, created_at, updated_at';

const messageFields =
  'id, user_id, chat_id, role, content, safety_status, generation_source, model, input_tokens, output_tokens, created_at';

const redirectMessage =
  'I cannot confirm or predict something like that. What I can do is help you reflect on the emotional energy of the situation and offer a grounded, positive perspective.';

const forbiddenPatterns = [
  /\bdeath\b/i,
  /\bdie\b/i,
  /\billness\b/i,
  /\bmedical\b/i,
  /\bdiagnos/i,
  /\baccident\b/i,
  /\bviolence\b/i,
  /\bpregnan/i,
  /\bcurse/i,
  /\bevil eye\b/i,
  /\bbetray/i,
  /\binfidel/i,
  /\bcheat/i,
  /\bdoomed\b/i,
  /\bdanger/i,
  /\bcatastroph/i,
  /\bsomething bad\b/i,
  /\bwill happen\b/i,
  /\byou will\b/i,
  /\bdestined\b/i,
  /\bmust leave\b/i,
  /\bmust stay\b/i,
  /\bfinancial advice\b/i,
  /\blegal advice\b/i,
  /\bpsychological diagnosis\b/i,
  /\bmedical diagnosis\b/i,
  /\bguaranteed\b/i,
  /\bfor certain\b/i,
  /\bhidden behavior\b/i,
  /\bthey are hiding\b/i,
  /\bpartner is hiding\b/i,
];

const moneyForbiddenPatterns = [
  /\binvest\b/i,
  /\bstock\b/i,
  /\bcrypto\b/i,
  /\bbuy\b/i,
  /\bsell\b/i,
  /\bprofit\b/i,
  /\bguarantee\b/i,
  /\bfinancial certainty\b/i,
];

const wellnessForbiddenPatterns = [
  /\bmedical\b/i,
  /\bdiagnos/i,
  /\btreatment\b/i,
  /\bcure\b/i,
  /\bsymptom\b/i,
  /\bdoctor\b/i,
  /\btherapy\b/i,
  /\bemergency\b/i,
];

function jsonResponse(body: unknown, status = 200) {
  return Response.json(body, { headers: corsHeaders, status });
}

function getPublishableKey() {
  const publishableKeys = Deno.env.get('SUPABASE_PUBLISHABLE_KEYS');

  if (publishableKeys) {
    try {
      const parsed = JSON.parse(publishableKeys) as Record<string, string>;
      if (parsed.default) {
        return parsed.default;
      }
    } catch {
      return null;
    }
  }

  return (
    Deno.env.get('SUPABASE_PUBLISHABLE_KEY') ??
    Deno.env.get('SUPABASE_ANON_KEY') ??
    null
  );
}

function getAIChatEntitlement(): ChatEntitlement {
  return 'free';
}

function getAccess(entitlement: ChatEntitlement, usedUserMessages: number) {
  if (entitlement === 'pro') {
    return {
      entitlement,
      limit_reached: false,
      remaining_free_messages: undefined,
    };
  }

  if (entitlement === 'plus') {
    return {
      entitlement,
      limit_reached: false,
      remaining_free_messages: undefined,
    };
  }

  const remaining = Math.max(0, 1 - usedUserMessages);

  return {
    entitlement,
    limit_reached: remaining <= 0,
    remaining_free_messages: remaining,
  };
}

function textIsSafe(value: string) {
  return !forbiddenPatterns.some((pattern) => pattern.test(value));
}

function categoryTextIsSafe(value: string, patterns: RegExp[]) {
  return textIsSafe(value) && !patterns.some((pattern) => pattern.test(value));
}

function userRequestNeedsRedirect(value: string) {
  return (
    !textIsSafe(value) ||
    !categoryTextIsSafe(value, moneyForbiddenPatterns) ||
    !categoryTextIsSafe(value, wellnessForbiddenPatterns)
  );
}

function validateAssistantMessage(value: unknown) {
  if (typeof value !== 'string') {
    throw new Error('AI Chat response was not displayable.');
  }

  const content = value.trim();

  if (
    content.length < 1 ||
    content.length > 1200 ||
    !textIsSafe(content) ||
    !categoryTextIsSafe(content, moneyForbiddenPatterns) ||
    !categoryTextIsSafe(content, wellnessForbiddenPatterns)
  ) {
    throw new Error('AI Chat response did not pass validation.');
  }

  return content;
}

function outputTextFromResponse(value: Record<string, unknown>) {
  if (typeof value.output_text === 'string') {
    return value.output_text;
  }

  const output = Array.isArray(value.output) ? value.output : [];

  for (const item of output) {
    if (!item || typeof item !== 'object' || !('content' in item)) {
      continue;
    }

    const content = Array.isArray(item.content) ? item.content : [];
    for (const contentItem of content) {
      if (!contentItem || typeof contentItem !== 'object') {
        continue;
      }

      if (
        'text' in contentItem &&
        typeof contentItem.text === 'string' &&
        ('type' in contentItem
          ? contentItem.type === 'output_text' || contentItem.type === 'text'
          : true)
      ) {
        return contentItem.text;
      }
    }
  }

  return null;
}

function usageFromResponse(value: Record<string, unknown>) {
  const usage = value.usage;

  if (!usage || typeof usage !== 'object') {
    return { input_tokens: null, output_tokens: null };
  }

  const inputTokens =
    'input_tokens' in usage && typeof usage.input_tokens === 'number'
      ? usage.input_tokens
      : null;
  const outputTokens =
    'output_tokens' in usage && typeof usage.output_tokens === 'number'
      ? usage.output_tokens
      : null;

  return { input_tokens: inputTokens, output_tokens: outputTokens };
}

async function generateChatResponse({
  birthProfile,
  messages,
  model,
  profile,
  userMessage,
}: {
  birthProfile: BirthProfileRow;
  messages: AIMessage[];
  model: string;
  profile: ProfileRow;
  userMessage: string;
}) {
  const apiKey = Deno.env.get('OPENAI_API_KEY');

  if (!apiKey) {
    throw new Error('AI Chat generation is not configured yet.');
  }

  const recentMessages = messages.slice(-8).map((message) => ({
    role: message.role,
    content: message.content,
  }));

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      input: [
        {
          role: 'system',
          content:
            'You are Nova, a positive cosmic guide for symbolic astrology-inspired reflection, emotional clarity, daily energy, weekly energy, love, career, money reflection, wellness reflection, and personal growth. Write in English. Keep responses concise, warm, grounded, supportive, symbolic, reflective, emotionally safe, and non-deterministic. Use language such as may, could, suggests, reflects, invites reflection, a helpful way to see this is, or a gentle next step could be. Never mention or imply death, illness, accidents, violence, pregnancy predictions, curses, dark spiritual threats, evil eye certainty, betrayal certainty, infidelity certainty, diagnosis, legal certainty, financial certainty, dangerous predictions, fear-based warnings, catastrophic predictions, guaranteed outcomes, or certainty about another person. Love content must not imply betrayal, cheating, danger, doom, or certainty about private behavior. Money content must be mindful reflection only, never investment or financial advice. Wellness content must be grounding reflection only, never medical advice, treatment, or diagnosis. If a request is unsafe, redirect with: I cannot confirm or predict something like that. What I can do is help you reflect on the emotional energy of the situation and offer a grounded, positive perspective.',
        },
        {
          role: 'user',
          content: JSON.stringify({
            profile: {
              name: profile.name,
              main_interest: profile.main_interest,
              cosmic_summary: profile.cosmic_summary,
            },
            birth_profile: {
              birth_date: birthProfile.birth_date,
              birth_time_accuracy: birthProfile.birth_time_accuracy,
              birth_time: birthProfile.birth_time,
              approximate_time_range: birthProfile.approximate_time_range,
              birth_city: birthProfile.birth_city,
              birth_country: birthProfile.birth_country,
            },
            recent_chat: recentMessages,
            current_message: userMessage,
          }),
        },
      ],
      max_output_tokens: 700,
    }),
  });

  if (!response.ok) {
    throw new Error('AI Chat generation could not complete.');
  }

  const data = (await response.json()) as Record<string, unknown>;
  const outputText = outputTextFromResponse(data);

  return {
    content: validateAssistantMessage(outputText),
    usage: usageFromResponse(data),
  };
}

async function loadMessages(
  supabase: ReturnType<typeof createClient>,
  chatId: string,
) {
  const { data, error } = await supabase
    .from('ai_messages')
    .select(messageFields)
    .eq('chat_id', chatId)
    .order('created_at', { ascending: true })
    .limit(30)
    .returns<AIMessage[]>();

  if (error) {
    throw new Error('AI Chat messages could not be loaded.');
  }

  return data ?? [];
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Use POST to send an AI Chat message.' }, 405);
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const publishableKey = getPublishableKey();
  const authorization = req.headers.get('Authorization');

  if (!supabaseUrl || !publishableKey) {
    return jsonResponse({ error: 'AI Chat service is not configured.' }, 503);
  }

  if (!authorization) {
    return jsonResponse({ error: 'Sign in to chat with Nova.' }, 401);
  }

  const supabase = createClient(supabaseUrl, publishableKey, {
    auth: { persistSession: false },
    global: { headers: { Authorization: authorization } },
  });

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return jsonResponse({ error: 'Sign in to chat with Nova.' }, 401);
  }

  let body: { chat_id?: unknown; message?: unknown };
  try {
    body = (await req.json()) as { chat_id?: unknown; message?: unknown };
  } catch {
    return jsonResponse({ error: 'AI Chat request was invalid.' }, 400);
  }

  const message = typeof body.message === 'string' ? body.message.trim() : '';
  const chatId = typeof body.chat_id === 'string' ? body.chat_id.trim() : null;

  if (message.length < 1 || message.length > 1000) {
    return jsonResponse(
      { error: 'AI Chat message must be between 1 and 1000 characters.' },
      400,
    );
  }

  const { count: usedUserMessages, error: usageError } = await supabase
    .from('ai_messages')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('role', 'user');

  if (usageError) {
    return jsonResponse({ error: 'AI Chat access could not be checked.' }, 500);
  }

  const entitlement = getAIChatEntitlement();
  const access = getAccess(entitlement, usedUserMessages ?? 0);

  if (access.limit_reached) {
    return jsonResponse(
      {
        access,
        error: 'Your free AI Chat trial has been used.',
      },
      402,
    );
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, name, main_interest, cosmic_summary')
    .eq('user_id', user.id)
    .maybeSingle<ProfileRow>();

  if (profileError || !profile) {
    return jsonResponse(
      { error: 'Complete your profile before chatting with Nova.' },
      409,
    );
  }

  const { data: birthProfile, error: birthProfileError } = await supabase
    .from('birth_profiles')
    .select(
      'name, birth_date, birth_time, birth_time_accuracy, approximate_time_range, birth_city, birth_country',
    )
    .eq('user_id', user.id)
    .eq('profile_id', profile.id)
    .eq('person_label', 'self')
    .maybeSingle<BirthProfileRow>();

  if (birthProfileError || !birthProfile) {
    return jsonResponse(
      { error: 'Complete your birth profile before chatting with Nova.' },
      409,
    );
  }

  let chat: AIChat | null = null;

  if (chatId) {
    const { data: existingChat, error: chatError } = await supabase
      .from('ai_chats')
      .select(chatFields)
      .eq('user_id', user.id)
      .eq('id', chatId)
      .maybeSingle<AIChat>();

    if (chatError) {
      return jsonResponse({ error: 'AI Chat could not be loaded.' }, 500);
    }

    if (!existingChat) {
      return jsonResponse({ error: 'AI Chat was not found.' }, 404);
    }

    chat = existingChat;
  } else {
    const { data: insertedChat, error: insertChatError } = await supabase
      .from('ai_chats')
      .insert({
        context_scope: 'profile_birth_chat',
        title: 'Nova chat',
        user_id: user.id,
      })
      .select(chatFields)
      .single<AIChat>();

    if (insertChatError || !insertedChat) {
      return jsonResponse({ error: 'AI Chat could not be started.' }, 500);
    }

    chat = insertedChat;
  }

  let existingMessages: AIMessage[];
  try {
    existingMessages = await loadMessages(supabase, chat.id);
  } catch {
    return jsonResponse({ error: 'AI Chat messages could not be loaded.' }, 500);
  }

  const needsRedirect = userRequestNeedsRedirect(message);
  const model = Deno.env.get('OPENAI_AI_CHAT_MODEL') ?? 'gpt-5.5';

  const { data: insertedUserMessage, error: userMessageError } = await supabase
    .from('ai_messages')
    .insert({
      chat_id: chat.id,
      content: message,
      generation_source: 'user',
      role: 'user',
      safety_status: needsRedirect ? 'redirected' : 'safe',
      user_id: user.id,
    })
    .select(messageFields)
    .single<AIMessage>();

  if (userMessageError || !insertedUserMessage) {
    return jsonResponse({ error: 'AI Chat message could not be saved.' }, 500);
  }

  let assistantContent = redirectMessage;
  let assistantSafetyStatus: 'safe' | 'redirected' = 'redirected';
  let assistantSource: 'openai' | 'safety_redirect' = 'safety_redirect';
  let inputTokens: number | null = null;
  let outputTokens: number | null = null;

  if (!needsRedirect) {
    try {
      const generated = await generateChatResponse({
        birthProfile,
        messages: existingMessages,
        model,
        profile,
        userMessage: message,
      });

      assistantContent = generated.content;
      assistantSafetyStatus = 'safe';
      assistantSource = 'openai';
      inputTokens = generated.usage.input_tokens;
      outputTokens = generated.usage.output_tokens;
    } catch {
      assistantContent =
        'Nova is not ready to answer that gently right now. A helpful next step could be to pause, breathe, and return to the question with a calmer focus.';
      assistantSafetyStatus = 'redirected';
      assistantSource = 'safety_redirect';
    }
  }

  const { data: insertedAssistantMessage, error: assistantMessageError } =
    await supabase
      .from('ai_messages')
      .insert({
        chat_id: chat.id,
        content: assistantContent,
        generation_source: assistantSource,
        input_tokens: inputTokens,
        model: assistantSource === 'openai' ? model : null,
        output_tokens: outputTokens,
        role: 'assistant',
        safety_status: assistantSafetyStatus,
        user_id: user.id,
      })
      .select(messageFields)
      .single<AIMessage>();

  if (assistantMessageError || !insertedAssistantMessage) {
    return jsonResponse({ error: 'AI Chat response could not be saved.' }, 500);
  }

  const { data: updatedChat, error: updateChatError } = await supabase
    .from('ai_chats')
    .update({ last_message_at: new Date().toISOString(), title: chat.title })
    .eq('id', chat.id)
    .eq('user_id', user.id)
    .select(chatFields)
    .single<AIChat>();

  if (updateChatError || !updatedChat) {
    return jsonResponse({ error: 'AI Chat could not be updated.' }, 500);
  }

  const messages = [
    ...existingMessages,
    insertedUserMessage,
    insertedAssistantMessage,
  ];
  const nextAccess = getAccess(entitlement, (usedUserMessages ?? 0) + 1);

  return jsonResponse({
    access: nextAccess,
    assistant_message: insertedAssistantMessage,
    chat: updatedChat,
    messages,
  });
});
