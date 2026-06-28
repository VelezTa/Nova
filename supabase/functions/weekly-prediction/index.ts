import { createClient } from 'npm:@supabase/supabase-js@2';

type WeeklyPrediction = {
  id?: string;
  user_id?: string;
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
  /\byou will\b/i,
  /\bdestined\b/i,
  /\bmust leave\b/i,
  /\bmust stay\b/i,
  /\bfinancial advice\b/i,
  /\blegal advice\b/i,
  /\bpsychological diagnosis\b/i,
  /\bguaranteed\b/i,
  /\bfor certain\b/i,
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

function isMondayDate(value: string) {
  return new Date(`${value}T00:00:00Z`).getUTCDay() === 1;
}

function textIsSafe(value: string) {
  return !forbiddenPatterns.some((pattern) => pattern.test(value));
}

function categoryTextIsSafe(value: string, patterns: RegExp[]) {
  return textIsSafe(value) && !patterns.some((pattern) => pattern.test(value));
}

function stringField(value: unknown, min: number, max: number) {
  return (
    typeof value === 'string' &&
    value.trim().length >= min &&
    value.trim().length <= max
  );
}

function validateGeneratedPrediction(
  value: unknown,
  weekStart: string,
): WeeklyPrediction {
  if (!value || typeof value !== 'object') {
    throw new Error('Weekly prediction response was not structured.');
  }

  const candidate = value as Partial<WeeklyPrediction>;
  const generalEnergy =
    typeof candidate.general_energy === 'string'
      ? candidate.general_energy.trim()
      : '';
  const love = typeof candidate.love === 'string' ? candidate.love.trim() : '';
  const work = typeof candidate.work === 'string' ? candidate.work.trim() : '';
  const money =
    typeof candidate.money === 'string' ? candidate.money.trim() : '';
  const wellness =
    typeof candidate.wellness === 'string' ? candidate.wellness.trim() : '';
  const favorableDay =
    typeof candidate.favorable_day === 'string'
      ? candidate.favorable_day.trim()
      : '';
  const wordOfWeek =
    typeof candidate.word_of_week === 'string'
      ? candidate.word_of_week.trim()
      : '';
  const colorName =
    typeof candidate.color_name === 'string' ? candidate.color_name.trim() : '';
  const colorHex =
    typeof candidate.color_hex === 'string' ? candidate.color_hex : '';
  const advice =
    typeof candidate.advice === 'string' ? candidate.advice.trim() : '';
  const textFields = [
    generalEnergy,
    love,
    work,
    favorableDay,
    wordOfWeek,
    colorName,
    advice,
  ];

  if (
    !stringField(generalEnergy, 1, 520) ||
    !stringField(love, 1, 420) ||
    !stringField(work, 1, 420) ||
    !stringField(money, 1, 420) ||
    !stringField(wellness, 1, 420) ||
    !stringField(favorableDay, 1, 40) ||
    !stringField(wordOfWeek, 1, 40) ||
    !stringField(colorName, 1, 60) ||
    !colorPattern.test(colorHex) ||
    !stringField(advice, 1, 520) ||
    candidate.generation_source !== 'openai' ||
    !textFields.every((field) => textIsSafe(field)) ||
    !categoryTextIsSafe(money, moneyForbiddenPatterns) ||
    !categoryTextIsSafe(wellness, wellnessForbiddenPatterns)
  ) {
    throw new Error('Weekly prediction response did not pass validation.');
  }

  return {
    advice,
    color_hex: colorHex.toUpperCase(),
    color_name: colorName,
    favorable_day: favorableDay,
    general_energy: generalEnergy,
    generation_source: 'openai',
    love,
    money,
    week_start: weekStart,
    wellness,
    word_of_week: wordOfWeek,
    work,
  };
}

function weeklyPredictionSchema() {
  return {
    type: 'object',
    additionalProperties: false,
    required: [
      'general_energy',
      'love',
      'work',
      'money',
      'wellness',
      'favorable_day',
      'word_of_week',
      'color_name',
      'color_hex',
      'advice',
      'generation_source',
    ],
    properties: {
      general_energy: { type: 'string' },
      love: { type: 'string' },
      work: { type: 'string' },
      money: { type: 'string' },
      wellness: { type: 'string' },
      favorable_day: { type: 'string' },
      word_of_week: { type: 'string' },
      color_name: { type: 'string' },
      color_hex: { type: 'string' },
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

async function generateWeeklyPrediction(
  weekStart: string,
  profile: ProfileRow,
  birthProfile: BirthProfileRow,
) {
  const apiKey = Deno.env.get('OPENAI_API_KEY');

  if (!apiKey) {
    throw new Error('Weekly prediction generation is not configured yet.');
  }

  const model = Deno.env.get('OPENAI_WEEKLY_PREDICTION_MODEL') ?? 'gpt-5.5';
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
            'You create Nova weekly predictions for symbolic reflection and entertainment. Return only safe JSON. Begin general_energy with a positive, gentle opening. Use positive, grounded, non-deterministic language with words such as may, could, suggests, reflects, invites reflection, a helpful way to see this is, or a gentle next step could be. Never mention or imply death, illness, accidents, violence, pregnancy predictions, curses, dark spiritual threats, evil eye certainty, betrayal certainty, infidelity certainty, diagnosis, legal certainty, financial certainty, dangerous predictions, fear-based warnings, catastrophic predictions, guaranteed outcomes, or certainty about another person. Money must be mindful reflection only, never investment or financial advice. Wellness must be grounding reflection only, never medical advice, treatment, or diagnosis.',
        },
        {
          role: 'user',
          content: JSON.stringify({
            week_start: weekStart,
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
              general_energy:
                'one positive opening plus weekly symbolic reflection',
              love: 'safe relationship reflection without certainty about another person',
              work: 'supportive career or focus reflection',
              money:
                'mindful money reflection only, no financial certainty or investment advice',
              wellness:
                'gentle pacing or grounding reflection only, no medical claims',
              favorable_day: 'weekday name only',
              word_of_week: '1 to 3 uplifting words',
              color_hex: 'valid #RRGGBB',
            },
          }),
        },
      ],
      max_output_tokens: 1100,
      text: {
        format: {
          type: 'json_schema',
          name: 'nova_weekly_prediction',
          strict: true,
          schema: weeklyPredictionSchema(),
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error('Weekly prediction generation could not complete.');
  }

  const data = (await response.json()) as Record<string, unknown>;
  const outputText = outputTextFromResponse(data);

  if (!outputText) {
    throw new Error(
      'Weekly prediction generation did not return displayable content.',
    );
  }

  return validateGeneratedPrediction(JSON.parse(outputText), weekStart);
}

const weeklyPredictionFields =
  'id, user_id, week_start, general_energy, love, work, money, wellness, favorable_day, word_of_week, color_name, color_hex, advice, generation_source, created_at, updated_at';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return jsonResponse(
      { error: 'Use POST to request a weekly prediction.' },
      405,
    );
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const publishableKey = getPublishableKey();
  const authorization = req.headers.get('Authorization');

  if (!supabaseUrl || !publishableKey) {
    return jsonResponse(
      { error: 'Weekly Prediction service is not configured.' },
      503,
    );
  }

  if (!authorization) {
    return jsonResponse(
      { error: 'Sign in to view your Weekly Prediction.' },
      401,
    );
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
    return jsonResponse(
      { error: 'Sign in to view your Weekly Prediction.' },
      401,
    );
  }

  let body: { week_start?: unknown };
  try {
    body = (await req.json()) as { week_start?: unknown };
  } catch {
    return jsonResponse(
      { error: 'Weekly Prediction request was invalid.' },
      400,
    );
  }

  if (!isValidDate(body.week_start)) {
    return jsonResponse(
      { error: 'Weekly Prediction week start must use YYYY-MM-DD.' },
      400,
    );
  }

  const weekStart = body.week_start;

  if (!isMondayDate(weekStart)) {
    return jsonResponse(
      { error: 'Weekly Prediction week start must be a Monday.' },
      400,
    );
  }

  const { data: cachedPrediction, error: cachedError } = await supabase
    .from('weekly_predictions')
    .select(weeklyPredictionFields)
    .eq('user_id', user.id)
    .eq('week_start', weekStart)
    .maybeSingle();

  if (cachedError) {
    return jsonResponse(
      { error: 'Weekly Prediction could not be loaded.' },
      500,
    );
  }

  if (cachedPrediction) {
    return jsonResponse({ cached: true, prediction: cachedPrediction });
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, name, main_interest, cosmic_summary')
    .eq('user_id', user.id)
    .maybeSingle<ProfileRow>();

  if (profileError || !profile) {
    return jsonResponse(
      { error: 'Complete your profile before opening Weekly Prediction.' },
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
      {
        error:
          'Complete your birth profile before opening Weekly Prediction.',
      },
      409,
    );
  }

  let generatedPrediction: WeeklyPrediction;
  try {
    generatedPrediction = await generateWeeklyPrediction(
      weekStart,
      profile,
      birthProfile,
    );
  } catch {
    return jsonResponse(
      {
        error:
          'Weekly Prediction is not ready yet. Please try again after generation is configured.',
      },
      503,
    );
  }

  const { data: insertedPrediction, error: insertError } = await supabase
    .from('weekly_predictions')
    .insert({ ...generatedPrediction, user_id: user.id })
    .select(weeklyPredictionFields)
    .single();

  if (insertError) {
    const { data: existingPrediction } = await supabase
      .from('weekly_predictions')
      .select(weeklyPredictionFields)
      .eq('user_id', user.id)
      .eq('week_start', weekStart)
      .maybeSingle();

    if (existingPrediction) {
      return jsonResponse({ cached: true, prediction: existingPrediction });
    }

    return jsonResponse(
      { error: 'Weekly Prediction could not be saved.' },
      500,
    );
  }

  return jsonResponse({ cached: false, prediction: insertedPrediction });
});
