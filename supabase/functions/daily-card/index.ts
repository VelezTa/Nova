import { createClient } from 'npm:@supabase/supabase-js@2';

type DailyCard = {
  id?: string;
  user_id?: string;
  card_date: string;
  word: string;
  message: string;
  number_of_day: number;
  color_name: string;
  color_hex: string;
  energy: string;
  advice: string;
  generation_source: 'openai';
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

const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const colorPattern = /^#[0-9A-Fa-f]{6}$/;

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
  /\bdestined\b/i,
  /\bmust leave\b/i,
  /\bmust stay\b/i,
  /\bfinancial advice\b/i,
  /\blegal advice\b/i,
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

function isValidDate(value: unknown): value is string {
  if (typeof value !== 'string' || !datePattern.test(value)) {
    return false;
  }

  const parsed = new Date(`${value}T00:00:00Z`);
  return (
    !Number.isNaN(parsed.getTime()) &&
    value === parsed.toISOString().slice(0, 10)
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

function validateGeneratedCard(value: unknown, cardDate: string): DailyCard {
  if (!value || typeof value !== 'object') {
    throw new Error('Daily card response was not structured.');
  }

  const candidate = value as Partial<DailyCard>;
  const word = typeof candidate.word === 'string' ? candidate.word.trim() : '';
  const message =
    typeof candidate.message === 'string' ? candidate.message.trim() : '';
  const colorName =
    typeof candidate.color_name === 'string' ? candidate.color_name.trim() : '';
  const colorHex =
    typeof candidate.color_hex === 'string' ? candidate.color_hex : '';
  const energy =
    typeof candidate.energy === 'string' ? candidate.energy.trim() : '';
  const advice =
    typeof candidate.advice === 'string' ? candidate.advice.trim() : '';
  const numberOfDay = candidate.number_of_day;
  const textFields = [word, message, colorName, energy, advice];

  if (
    !stringField(word, 1, 40) ||
    !stringField(message, 1, 420) ||
    !Number.isInteger(numberOfDay) ||
    Number(numberOfDay) < 1 ||
    Number(numberOfDay) > 99 ||
    !stringField(colorName, 1, 60) ||
    !colorPattern.test(colorHex) ||
    !stringField(energy, 1, 240) ||
    !stringField(advice, 1, 420) ||
    candidate.generation_source !== 'openai' ||
    !textFields.every((field) => textIsSafe(field))
  ) {
    throw new Error('Daily card response did not pass validation.');
  }

  return {
    advice,
    card_date: cardDate,
    color_hex: colorHex.toUpperCase(),
    color_name: colorName,
    energy,
    generation_source: 'openai',
    message,
    number_of_day: numberOfDay,
    word,
  };
}

function dailyCardSchema() {
  return {
    type: 'object',
    additionalProperties: false,
    required: [
      'word',
      'message',
      'number_of_day',
      'color_name',
      'color_hex',
      'energy',
      'advice',
      'generation_source',
    ],
    properties: {
      word: { type: 'string' },
      message: { type: 'string' },
      number_of_day: { type: 'integer' },
      color_name: { type: 'string' },
      color_hex: { type: 'string' },
      energy: { type: 'string' },
      advice: { type: 'string' },
      generation_source: { type: 'string', enum: ['openai'] },
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

async function generateDailyCard(
  cardDate: string,
  profile: ProfileRow,
  birthProfile: BirthProfileRow,
) {
  const apiKey = Deno.env.get('OPENAI_API_KEY');

  if (!apiKey) {
    throw new Error('Daily card generation is not configured yet.');
  }

  const model = Deno.env.get('OPENAI_DAILY_CARD_MODEL') ?? 'gpt-5.5';
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
            'You create Nova daily cards for symbolic reflection and entertainment. Return only safe JSON. Use positive, grounded, non-deterministic language with words such as may, could, suggests, reflects, invites reflection, or a gentle next step could be. Never mention or imply death, illness, accidents, violence, pregnancy predictions, curses, dark spiritual threats, evil eye certainty, betrayal certainty, infidelity certainty, diagnosis, legal certainty, financial certainty, dangerous predictions, fear-based warnings, catastrophic predictions, or guaranteed outcomes.',
        },
        {
          role: 'user',
          content: JSON.stringify({
            date: cardDate,
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
            output_rules: {
              word: '1 to 3 uplifting words',
              message: 'one short positive reflective message',
              number_of_day: 'integer from 1 to 99',
              color_hex: 'valid #RRGGBB',
              money: 'no financial certainty',
              wellness: 'no medical claims',
            },
          }),
        },
      ],
      max_output_tokens: 700,
      text: {
        format: {
          type: 'json_schema',
          name: 'nova_daily_card',
          strict: true,
          schema: dailyCardSchema(),
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error('Daily card generation could not complete.');
  }

  const data = (await response.json()) as Record<string, unknown>;
  const outputText = outputTextFromResponse(data);

  if (!outputText) {
    throw new Error(
      'Daily card generation did not return displayable content.',
    );
  }

  return validateGeneratedCard(JSON.parse(outputText), cardDate);
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Use POST to request a daily card.' }, 405);
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const publishableKey = getPublishableKey();
  const authorization = req.headers.get('Authorization');

  if (!supabaseUrl || !publishableKey) {
    return jsonResponse(
      { error: 'Daily card service is not configured.' },
      503,
    );
  }

  if (!authorization) {
    return jsonResponse({ error: 'Sign in to view your daily card.' }, 401);
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
    return jsonResponse({ error: 'Sign in to view your daily card.' }, 401);
  }

  let body: { card_date?: unknown };
  try {
    body = (await req.json()) as { card_date?: unknown };
  } catch {
    return jsonResponse({ error: 'Daily card request was invalid.' }, 400);
  }

  if (!isValidDate(body.card_date)) {
    return jsonResponse({ error: 'Daily card date must use YYYY-MM-DD.' }, 400);
  }

  const cardDate = body.card_date;

  const { data: cachedCard, error: cachedError } = await supabase
    .from('daily_cards')
    .select(
      'id, user_id, card_date, word, message, number_of_day, color_name, color_hex, energy, advice, generation_source, created_at, updated_at',
    )
    .eq('user_id', user.id)
    .eq('card_date', cardDate)
    .maybeSingle();

  if (cachedError) {
    return jsonResponse({ error: 'Daily card could not be loaded.' }, 500);
  }

  if (cachedCard) {
    return jsonResponse({ cached: true, card: cachedCard });
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, name, main_interest, cosmic_summary')
    .eq('user_id', user.id)
    .maybeSingle<ProfileRow>();

  if (profileError || !profile) {
    return jsonResponse(
      { error: 'Complete your profile before opening Daily Card.' },
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
      { error: 'Complete your birth profile before opening Daily Card.' },
      409,
    );
  }

  let generatedCard: DailyCard;
  try {
    generatedCard = await generateDailyCard(cardDate, profile, birthProfile);
  } catch {
    return jsonResponse(
      {
        error:
          'Daily Card is not ready yet. Please try again after generation is configured.',
      },
      503,
    );
  }

  const { data: insertedCard, error: insertError } = await supabase
    .from('daily_cards')
    .insert({ ...generatedCard, user_id: user.id })
    .select(
      'id, user_id, card_date, word, message, number_of_day, color_name, color_hex, energy, advice, generation_source, created_at, updated_at',
    )
    .single();

  if (insertError) {
    const { data: existingCard } = await supabase
      .from('daily_cards')
      .select(
        'id, user_id, card_date, word, message, number_of_day, color_name, color_hex, energy, advice, generation_source, created_at, updated_at',
      )
      .eq('user_id', user.id)
      .eq('card_date', cardDate)
      .maybeSingle();

    if (existingCard) {
      return jsonResponse({ cached: true, card: existingCard });
    }

    return jsonResponse({ error: 'Daily Card could not be saved.' }, 500);
  }

  return jsonResponse({ cached: false, card: insertedCard });
});
