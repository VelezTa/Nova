import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  loadAIChatState,
  sendAIChatMessage,
  upgradeAccessAfterLocalSend,
} from './ai-chat-service';
import { canSendAIChatMessage } from './access';
import type { AIChat, AIChatAccess, AIChatMessage } from './types';

import { useAuth } from '@/features/auth/auth-context';

type AIChatStatus = 'idle' | 'loading' | 'ready' | 'error';

const defaultAccess: AIChatAccess = {
  entitlement: 'free',
  limit_reached: false,
  remaining_free_messages: 1,
};

export function useAIChat() {
  const { user } = useAuth();
  const [access, setAccess] = useState<AIChatAccess>(defaultAccess);
  const [chat, setChat] = useState<AIChat | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<AIChatMessage[]>([]);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<AIChatStatus>('idle');

  const activeChatId = chat?.id ?? null;
  const blocked = useMemo(() => !canSendAIChatMessage(access), [access]);

  const loadChat = useCallback(async () => {
    if (!user) {
      setError('Sign in to chat with Nova.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setError(null);

    try {
      const state = await loadAIChatState(user.id);
      setAccess(state.access);
      setChat(state.chat);
      setMessages(state.messages);
      setStatus('ready');
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'AI Chat could not be loaded.',
      );
      setStatus('error');
    }
  }, [user]);

  const sendMessage = useCallback(
    async (rawMessage: string) => {
      const message = rawMessage.trim();

      if (!message || sending) {
        return false;
      }

      if (!user) {
        setError('Sign in to chat with Nova.');
        setStatus('error');
        return false;
      }

      if (!canSendAIChatMessage(access)) {
        setError('Your free AI Chat trial has been used.');
        setStatus('ready');
        return false;
      }

      setSending(true);
      setError(null);

      try {
        const result = await sendAIChatMessage({
          chatId: activeChatId,
          message,
        });

        setAccess(result.access ?? upgradeAccessAfterLocalSend(access));
        setChat(result.chat);
        setMessages(result.messages);
        setStatus('ready');
        return true;
      } catch (caughtError) {
        setError(
          caughtError instanceof Error
            ? caughtError.message
            : 'Nova is not ready to chat yet. Please try again.',
        );
        setStatus('ready');
        return false;
      } finally {
        setSending(false);
      }
    },
    [access, activeChatId, sending, user],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadChat();
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, [loadChat]);

  return {
    access,
    blocked,
    chat,
    error,
    messages,
    reload: loadChat,
    sendMessage,
    sending,
    status,
  };
}
