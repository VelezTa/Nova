export type PalmReadingStatus =
  | 'pending'
  | 'generating'
  | 'completed'
  | 'failed'
  | 'needs_better_images';

export type PalmReading = {
  id: string;
  user_id: string;
  status: PalmReadingStatus;
  summary: string | null;
  image_quality_note: string | null;
  heart_line: string | null;
  head_line: string | null;
  life_line: string | null;
  fate_line: string | null;
  mounts: string | null;
  hand_shape: string | null;
  personality_reflection: string | null;
  emotional_style: string | null;
  decision_making_style: string | null;
  strengths: string | null;
  growth_areas: string | null;
  safety_status: 'pending' | 'safe' | 'redirected';
  generation_source: 'openai' | 'safety_redirect' | null;
  model: string | null;
  input_tokens: number | null;
  output_tokens: number | null;
  error_message: string | null;
  created_at?: string;
  updated_at?: string;
};

export type PalmReadingImage = {
  id: string;
  user_id: string;
  palm_reading_id: string;
  hand_side: PalmReadingHandSide;
  storage_path: string;
  mime_type: string;
  file_size: number;
  width: number | null;
  height: number | null;
  created_at?: string;
  updated_at?: string;
};

export type PalmReadingHandSide = 'left' | 'right';

export type PalmReadingResponse = {
  cached: boolean;
  reading: PalmReading;
};

export type PalmReadingEntitlement = 'free' | 'plus' | 'pro' | 'palm_full';

export type SelectedPalmImage = {
  fileSize: number | null;
  height: number | null;
  mimeType: string;
  uri: string;
  width: number | null;
};
