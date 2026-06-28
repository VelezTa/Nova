export type WeeklyPrediction = {
  id: string;
  user_id: string;
  week_start: string;
  general_energy: string;
  love: string;
  work: string;
  money: string;
  wellness: string;
  favorable_day: string;
  word_of_week: string;
  color_name: string;
  color_hex: string;
  advice: string;
  generation_source: 'openai';
  created_at?: string;
  updated_at?: string;
};

export type WeeklyPredictionResponse = {
  cached: boolean;
  prediction: WeeklyPrediction;
};

export type WeeklyPredictionEntitlement = 'free' | 'plus' | 'pro';
