export type DailyCard = {
  id: string;
  user_id: string;
  card_date: string;
  word: string;
  message: string;
  number_of_day: number;
  color_name: string;
  color_hex: string;
  energy: string;
  advice: string;
  generation_source: 'openai';
  created_at?: string;
  updated_at?: string;
};

export type DailyCardResponse = {
  cached: boolean;
  card: DailyCard;
};

export type DailyCardEntitlement = 'free' | 'plus' | 'pro';
