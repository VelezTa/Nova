export type AIChatEntitlement = 'free' | 'plus' | 'pro';

export type AIChat = {
  id: string;
  user_id: string;
  title: string;
  context_scope: string;
  last_message_at: string;
  created_at: string;
  updated_at: string;
};

export type AIChatMessage = {
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

export type AIChatAccess = {
  entitlement: AIChatEntitlement;
  limit_reached: boolean;
  remaining_free_messages?: number;
};

export type AIChatResponse = {
  access: AIChatAccess;
  assistant_message: AIChatMessage;
  chat: AIChat;
  messages: AIChatMessage[];
};
