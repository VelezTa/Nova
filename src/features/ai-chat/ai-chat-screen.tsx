import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import type { AIChatMessage } from './types';
import { useAIChat } from './use-ai-chat';

import {
  AppButton,
  CelestialCard,
  CosmicScreen,
  EmptyStateCard,
  LoadingStateCard,
  SafeDisclaimerBlock,
  ScreenHeader,
} from '@/components';
import { Phase3VisualBackground } from '@/components/phase3-backgrounds';
import { colors, radii, spacing, typography } from '@/theme';

const suggestedPrompts = [
  'What should I focus on today?',
  'Give me gentle clarity in love.',
  'What energy may help my career this week?',
];

function ChatBubble({ message }: { message: AIChatMessage }) {
  const isUser = message.role === 'user';

  return (
    <View style={[styles.bubbleRow, isUser && styles.userBubbleRow]}>
      <View
        style={[styles.bubble, isUser ? styles.userBubble : styles.novaBubble]}
      >
        <Text style={[styles.bubbleText, isUser && styles.userBubbleText]}>
          {message.content}
        </Text>
      </View>
    </View>
  );
}

function PromptChips({
  disabled,
  onPrompt,
}: {
  disabled: boolean;
  onPrompt: (value: string) => void;
}) {
  return (
    <View style={styles.promptGrid}>
      {suggestedPrompts.map((prompt) => (
        <Pressable
          disabled={disabled}
          key={prompt}
          onPress={() => onPrompt(prompt)}
          style={[styles.promptChip, disabled && styles.disabled]}
        >
          <Text style={styles.promptText}>{prompt}</Text>
        </Pressable>
      ))}
    </View>
  );
}

function AIChatInput({
  blocked,
  onSend,
  sending,
}: {
  blocked: boolean;
  onSend: (value: string) => Promise<boolean>;
  sending: boolean;
}) {
  const [message, setMessage] = useState('');
  const trimmedMessage = message.trim();

  const handleSend = async () => {
    const sent = await onSend(message);

    if (sent) {
      setMessage('');
    }
  };

  return (
    <View style={styles.inputShell}>
      <TextInput
        editable={!blocked && !sending}
        maxLength={1000}
        multiline
        onChangeText={setMessage}
        placeholder="Ask Nova a reflective question"
        placeholderTextColor={colors.text.muted}
        style={styles.input}
        value={message}
      />
      <AppButton
        disabled={!trimmedMessage || blocked || sending}
        icon="send-outline"
        label={sending ? 'Sending' : 'Send'}
        onPress={() => {
          void handleSend();
        }}
        variant="primary"
      />
    </View>
  );
}

function UpgradeCard() {
  return (
    <CelestialCard
      eyebrow="Nova Plus"
      icon="lock-closed-outline"
      title="Continue the conversation"
    >
      <Text style={styles.body}>
        Your free AI Chat trial has been used. Unlock more reflective guidance
        with Nova Plus or Pro.
      </Text>
      <AppButton
        href="/paywall"
        label="View upgrade options"
        style={styles.cardAction}
        variant="secondary"
      />
    </CelestialCard>
  );
}

export function AIChatScreen() {
  const {
    access,
    blocked,
    error,
    messages,
    reload,
    sendMessage,
    sending,
    status,
  } = useAIChat();

  const handlePrompt = (prompt: string) => {
    void sendMessage(prompt);
  };

  return (
    <CosmicScreen background={<Phase3VisualBackground variant="cosmic" />}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboard}
      >
        <ScreenHeader
          body="A positive cosmic guide for symbolic reflection."
          eyebrow="AI Chat"
          icon="chatbubble-ellipses-outline"
          title="Talk with Nova"
        />

        {status === 'loading' || status === 'idle' ? (
          <LoadingStateCard
            body="Opening your private chat history."
            icon="moon-outline"
            title="Listening gently"
          />
        ) : null}

        {status === 'error' ? (
          <>
            <EmptyStateCard
              body={error ?? 'AI Chat could not be loaded.'}
              icon="alert-circle-outline"
              title="AI Chat is not ready"
            />
            <AppButton label="Try again" onPress={reload} variant="secondary" />
          </>
        ) : null}

        {status === 'ready' ? (
          <>
            {messages.length === 0 ? (
              <EmptyStateCard
                body="Start with a gentle question about focus, love, career, daily energy, or personal growth."
                icon="sparkles-outline"
                title="Ask Nova anything reflective"
              />
            ) : (
              <View style={styles.messageStack}>
                {messages.map((message) => (
                  <ChatBubble key={message.id} message={message} />
                ))}
              </View>
            )}

            {error ? (
              <EmptyStateCard
                body={error}
                icon="alert-circle-outline"
                title="Message not sent"
              />
            ) : null}

            {blocked ? <UpgradeCard /> : null}

            <PromptChips
              disabled={blocked || sending}
              onPrompt={handlePrompt}
            />

            <AIChatInput
              blocked={blocked}
              onSend={sendMessage}
              sending={sending}
            />

            {access.entitlement === 'free' && !blocked ? (
              <Text style={styles.caption}>Free trial question available.</Text>
            ) : null}

            <SafeDisclaimerBlock />
          </>
        ) : null}
      </KeyboardAvoidingView>
    </CosmicScreen>
  );
}

const styles = StyleSheet.create({
  body: {
    ...typography.body,
    color: colors.text.secondary,
  },
  bubble: {
    borderRadius: radii.md,
    maxWidth: '86%',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  bubbleRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  bubbleText: {
    ...typography.body,
    color: colors.text.primary,
  },
  caption: {
    ...typography.caption,
    color: colors.text.muted,
    textAlign: 'center',
  },
  cardAction: {
    marginTop: spacing.md,
  },
  disabled: {
    opacity: 0.5,
  },
  input: {
    ...typography.body,
    color: colors.text.primary,
    flex: 1,
    maxHeight: 116,
    minHeight: 48,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  inputShell: {
    alignItems: 'flex-end',
    backgroundColor: colors.surface.glass,
    borderColor: colors.border.violet,
    borderRadius: radii.lg,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    padding: spacing.sm,
  },
  keyboard: {
    gap: spacing.lg,
  },
  messageStack: {
    gap: spacing.md,
  },
  novaBubble: {
    backgroundColor: colors.surface.soft,
    borderColor: colors.border.card,
    borderWidth: 1,
  },
  promptChip: {
    backgroundColor: colors.surface.glass,
    borderColor: colors.border.subtleGold,
    borderRadius: radii.pill,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  promptGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  promptText: {
    ...typography.caption,
    color: colors.accent.gold,
  },
  userBubble: {
    backgroundColor: colors.accent.gold,
  },
  userBubbleRow: {
    justifyContent: 'flex-end',
  },
  userBubbleText: {
    color: colors.text.inverse,
  },
});
