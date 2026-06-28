import { createClient } from 'npm:@supabase/supabase-js@2';

type PalmReadingStatus =
  | 'pending'
  | 'generating'
  | 'completed'
  | 'failed'
  | 'needs_better_images';

type PalmReading = {
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
  created_at: string;
  updated_at: string;
};

type PalmReadingImage = {
  id: string;
  user_id: string;
  palm_reading_id: string;
  hand_side: 'left' | 'right';
  storage_path: string;
  mime_type: string;
  file_size: number;
  width: number | null;
  height: number | null;
  created_at: string;
  updated_at: string;
};

type ProfileRow = {
  cosmic_summary: string | null;
  id: string;
  main_interest: string;
  name: string;
};

type GeneratedPalmReading = {
  image_quality_status: 'enough' | 'insufficient';
  image_quality_note: string;
  summary: string;
  heart_line: string;
  head_line: string;
  life_line: string;
  fate_line: string;
  mounts: string;
  hand_shape: string;
  personality_reflection: string;
  emotional_style: string;
  decision_making_style: string;
  strengths: string;
  growth_areas: string;
};

const corsHeaders = {
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const readingFields =
  'id, user_id, status, summary, image_quality_note, heart_line, head_line, life_line, fate_line, mounts, hand_shape, personality_reflection, emotional_style, decision_making_style, strengths, growth_areas, safety_status, generation_source, model, input_tokens, output_tokens, error_message, created_at, updated_at';

const imageFields =
  'id, user_id, palm_reading_id, hand_side, storage_path, mime_type, file_size, width, height, created_at, updated_at';

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
  /\bdark spiritual\b/i,
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
  /\blifespan\b/i,
  /\blife span\b/i,
  /\bmust leave\b/i,
  /\bmust stay\b/i,
  /\bfinancial advice\b/i,
  /\blegal advice\b/i,
  /\bpsychological diagnosis\b/i,
  /\bmedical diagnosis\b/i,
  /\bguaranteed\b/i,
  /\bfor certain\b/i,
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

function textIsSafe(value: string) {
  return !forbiddenPatterns.some((pattern) => pattern.test(value));
}

function stringField(value: unknown, min: number, max: number) {
  return (
    typeof value === 'string' &&
    value.trim().length >= min &&
    value.trim().length <= max
  );
}

function validateTextField(value: unknown, label: string, max = 800) {
  if (!stringField(value, 1, max)) {
    throw new Error(`Palm Reading ${label} was not displayable.`);
  }

  const trimmed = (value as string).trim();

  if (!textIsSafe(trimmed)) {
    throw new Error(`Palm Reading ${label} did not pass validation.`);
  }

  return trimmed;
}

function validateGeneratedPalmReading(value: unknown): GeneratedPalmReading {
  if (!value || typeof value !== 'object') {
    throw new Error('Palm Reading response was not structured.');
  }

  const candidate = value as Partial<GeneratedPalmReading>;

  if (
    candidate.image_quality_status !== 'enough' &&
    candidate.image_quality_status !== 'insufficient'
  ) {
    throw new Error('Palm Reading image quality response was invalid.');
  }

  const imageQualityNote = validateTextField(
    candidate.image_quality_note,
    'image quality note',
    600,
  );

  if (candidate.image_quality_status === 'insufficient') {
    return {
      decision_making_style: '',
      emotional_style: '',
      fate_line: '',
      growth_areas: '',
      hand_shape: '',
      head_line: '',
      heart_line: '',
      image_quality_note: imageQualityNote,
      image_quality_status: 'insufficient',
      life_line: '',
      mounts: '',
      personality_reflection: '',
      strengths: '',
      summary: '',
    };
  }

  return {
    decision_making_style: validateTextField(
      candidate.decision_making_style,
      'decision-making style',
    ),
    emotional_style: validateTextField(
      candidate.emotional_style,
      'emotional style',
    ),
    fate_line: validateTextField(candidate.fate_line, 'fate line'),
    growth_areas: validateTextField(candidate.growth_areas, 'growth areas'),
    hand_shape: validateTextField(candidate.hand_shape, 'hand shape'),
    head_line: validateTextField(candidate.head_line, 'head line'),
    heart_line: validateTextField(candidate.heart_line, 'heart line'),
    image_quality_note: imageQualityNote,
    image_quality_status: 'enough',
    life_line: validateTextField(candidate.life_line, 'life line'),
    mounts: validateTextField(candidate.mounts, 'mounts'),
    personality_reflection: validateTextField(
      candidate.personality_reflection,
      'personality reflection',
    ),
    strengths: validateTextField(candidate.strengths, 'strengths'),
    summary: validateTextField(candidate.summary, 'summary', 900),
  };
}

function palmReadingSchema() {
  const stringProperty = { type: 'string' };

  return {
    type: 'object',
    additionalProperties: false,
    required: [
      'image_quality_status',
      'image_quality_note',
      'summary',
      'heart_line',
      'head_line',
      'life_line',
      'fate_line',
      'mounts',
      'hand_shape',
      'personality_reflection',
      'emotional_style',
      'decision_making_style',
      'strengths',
      'growth_areas',
    ],
    properties: {
      decision_making_style: stringProperty,
      emotional_style: stringProperty,
      fate_line: stringProperty,
      growth_areas: stringProperty,
      hand_shape: stringProperty,
      head_line: stringProperty,
      heart_line: stringProperty,
      image_quality_note: stringProperty,
      image_quality_status: {
        type: 'string',
        enum: ['enough', 'insufficient'],
      },
      life_line: stringProperty,
      mounts: stringProperty,
      personality_reflection: stringProperty,
      strengths: stringProperty,
      summary: stringProperty,
    },
  };
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

async function generatePalmReading({
  leftImageUrl,
  model,
  profile,
  rightImageUrl,
}: {
  leftImageUrl: string;
  model: string;
  profile: ProfileRow;
  rightImageUrl: string;
}) {
  const apiKey = Deno.env.get('OPENAI_API_KEY');

  if (!apiKey) {
    throw new Error('Palm Reading generation is not configured yet.');
  }

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
            'You create Nova palm readings for symbolic reflection and entertainment. Return only safe JSON. Interpret visible palm features as gentle symbolic themes only. Use positive, grounded, non-deterministic language with words such as may, could, suggests, reflects, invites reflection, a helpful way to see this is, or a gentle next step could be. Never mention or imply death, illness, accidents, violence, pregnancy predictions, curses, dark spiritual threats, evil eye certainty, betrayal certainty, infidelity certainty, diagnosis, legal certainty, financial certainty, dangerous predictions, fear-based warnings, catastrophic predictions, guaranteed outcomes, lifespan, or certainty about another person. Do not infer identity, age, health, pregnancy, or private facts from the images. If image quality is insufficient, set image_quality_status to insufficient and ask for clearer lighting, full palms, and less blur instead of guessing.',
        },
        {
          role: 'user',
          content: [
            {
              type: 'input_text',
              text: JSON.stringify({
                profile: {
                  cosmic_summary: profile.cosmic_summary,
                  main_interest: profile.main_interest,
                  name: profile.name,
                },
                instructions: {
                  left_image: 'left hand palm photo',
                  right_image: 'right hand palm photo',
                  life_line:
                    'energy rhythm only, never lifespan or health claims',
                  optional_features:
                    'If fate line, mounts, or hand shape are not visible, say they are not clear enough to interpret.',
                },
              }),
            },
            {
              type: 'input_image',
              image_url: leftImageUrl,
            },
            {
              type: 'input_image',
              image_url: rightImageUrl,
            },
          ],
        },
      ],
      max_output_tokens: 1500,
      text: {
        format: {
          type: 'json_schema',
          name: 'nova_palm_reading',
          strict: true,
          schema: palmReadingSchema(),
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error('Palm Reading generation could not complete.');
  }

  const data = (await response.json()) as Record<string, unknown>;
  const outputText = outputTextFromResponse(data);

  if (!outputText) {
    throw new Error(
      'Palm Reading generation did not return displayable content.',
    );
  }

  return {
    reading: validateGeneratedPalmReading(JSON.parse(outputText)),
    usage: usageFromResponse(data),
  };
}

async function markReadingFailed(
  supabase: ReturnType<typeof createClient>,
  readingId: string,
  userId: string,
  message: string,
) {
  await supabase
    .from('palm_readings')
    .update({
      error_message: message,
      generation_source: 'safety_redirect',
      safety_status: 'redirected',
      status: 'failed',
      updated_at: new Date().toISOString(),
    })
    .eq('id', readingId)
    .eq('user_id', userId);
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Use POST to request a Palm Reading.' }, 405);
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const publishableKey = getPublishableKey();
  const authorization = req.headers.get('Authorization');

  if (!supabaseUrl || !publishableKey) {
    return jsonResponse(
      { error: 'Palm Reading service is not configured.' },
      503,
    );
  }

  if (!authorization) {
    return jsonResponse({ error: 'Sign in to create a Palm Reading.' }, 401);
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
    return jsonResponse({ error: 'Sign in to create a Palm Reading.' }, 401);
  }

  let body: { palm_reading_id?: unknown };
  try {
    body = (await req.json()) as { palm_reading_id?: unknown };
  } catch {
    return jsonResponse({ error: 'Palm Reading request was invalid.' }, 400);
  }

  const palmReadingId =
    typeof body.palm_reading_id === 'string' ? body.palm_reading_id.trim() : '';

  if (!palmReadingId) {
    return jsonResponse({ error: 'Palm Reading id is required.' }, 400);
  }

  const { data: reading, error: readingError } = await supabase
    .from('palm_readings')
    .select(readingFields)
    .eq('user_id', user.id)
    .eq('id', palmReadingId)
    .maybeSingle<PalmReading>();

  if (readingError) {
    return jsonResponse({ error: 'Palm Reading could not be loaded.' }, 500);
  }

  if (!reading) {
    return jsonResponse({ error: 'Palm Reading was not found.' }, 404);
  }

  if (
    reading.status === 'completed' ||
    reading.status === 'needs_better_images'
  ) {
    return jsonResponse({ cached: true, reading });
  }

  const { data: images, error: imagesError } = await supabase
    .from('palm_reading_images')
    .select(imageFields)
    .eq('user_id', user.id)
    .eq('palm_reading_id', palmReadingId)
    .returns<PalmReadingImage[]>();

  if (imagesError) {
    return jsonResponse(
      { error: 'Palm Reading images could not be loaded.' },
      500,
    );
  }

  const leftImage = images?.find((image) => image.hand_side === 'left');
  const rightImage = images?.find((image) => image.hand_side === 'right');

  if (!leftImage || !rightImage) {
    return jsonResponse(
      { error: 'Both left and right palm images are required.' },
      400,
    );
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, name, main_interest, cosmic_summary')
    .eq('user_id', user.id)
    .maybeSingle<ProfileRow>();

  if (profileError || !profile) {
    return jsonResponse(
      { error: 'Complete your profile before creating a Palm Reading.' },
      409,
    );
  }

  const now = new Date().toISOString();
  const { error: generatingError } = await supabase
    .from('palm_readings')
    .update({
      error_message: null,
      safety_status: 'pending',
      status: 'generating',
      updated_at: now,
    })
    .eq('id', palmReadingId)
    .eq('user_id', user.id);

  if (generatingError) {
    return jsonResponse({ error: 'Palm Reading could not be started.' }, 500);
  }

  const { data: leftSigned, error: leftSignedError } = await supabase.storage
    .from('palm-images')
    .createSignedUrl(leftImage.storage_path, 300);
  const { data: rightSigned, error: rightSignedError } = await supabase.storage
    .from('palm-images')
    .createSignedUrl(rightImage.storage_path, 300);

  if (
    leftSignedError ||
    rightSignedError ||
    !leftSigned?.signedUrl ||
    !rightSigned?.signedUrl
  ) {
    const message = 'Palm images could not be opened safely.';
    await markReadingFailed(supabase, palmReadingId, user.id, message);
    return jsonResponse({ error: message }, 500);
  }

  const model = Deno.env.get('OPENAI_PALM_READING_MODEL') ?? 'gpt-5.5';

  let generated: Awaited<ReturnType<typeof generatePalmReading>>;
  try {
    generated = await generatePalmReading({
      leftImageUrl: leftSigned.signedUrl,
      model,
      profile,
      rightImageUrl: rightSigned.signedUrl,
    });
  } catch {
    const message =
      'Palm Reading is not ready yet. Please try again after generation is configured.';
    await markReadingFailed(supabase, palmReadingId, user.id, message);
    return jsonResponse({ error: message }, 503);
  }

  const generatedReading = generated.reading;
  const completedAt = new Date().toISOString();
  const update =
    generatedReading.image_quality_status === 'insufficient'
      ? {
          error_message: generatedReading.image_quality_note,
          generation_source: 'safety_redirect',
          image_quality_note: generatedReading.image_quality_note,
          input_tokens: generated.usage.input_tokens,
          model: null,
          output_tokens: generated.usage.output_tokens,
          safety_status: 'redirected',
          status: 'needs_better_images',
          updated_at: completedAt,
        }
      : {
          decision_making_style: generatedReading.decision_making_style,
          emotional_style: generatedReading.emotional_style,
          error_message: null,
          fate_line: generatedReading.fate_line,
          generation_source: 'openai',
          growth_areas: generatedReading.growth_areas,
          hand_shape: generatedReading.hand_shape,
          head_line: generatedReading.head_line,
          heart_line: generatedReading.heart_line,
          image_quality_note: generatedReading.image_quality_note,
          input_tokens: generated.usage.input_tokens,
          life_line: generatedReading.life_line,
          model,
          mounts: generatedReading.mounts,
          output_tokens: generated.usage.output_tokens,
          personality_reflection: generatedReading.personality_reflection,
          safety_status: 'safe',
          status: 'completed',
          strengths: generatedReading.strengths,
          summary: generatedReading.summary,
          updated_at: completedAt,
        };

  const { data: updatedReading, error: updateError } = await supabase
    .from('palm_readings')
    .update(update)
    .eq('id', palmReadingId)
    .eq('user_id', user.id)
    .select(readingFields)
    .single<PalmReading>();

  if (updateError || !updatedReading) {
    return jsonResponse({ error: 'Palm Reading could not be saved.' }, 500);
  }

  return jsonResponse({ cached: false, reading: updatedReading });
});
