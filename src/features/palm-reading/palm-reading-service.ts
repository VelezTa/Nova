import { palmReadingIsSafe } from './safety';
import type {
  PalmReading,
  PalmReadingHandSide,
  PalmReadingImage,
  PalmReadingResponse,
  SelectedPalmImage,
} from './types';

import { supabase } from '@/lib/supabase';

const palmReadingFields =
  'id, user_id, status, summary, image_quality_note, heart_line, head_line, life_line, fate_line, mounts, hand_shape, personality_reflection, emotional_style, decision_making_style, strengths, growth_areas, safety_status, generation_source, model, input_tokens, output_tokens, error_message, created_at, updated_at';

const palmReadingImageFields =
  'id, user_id, palm_reading_id, hand_side, storage_path, mime_type, file_size, width, height, created_at, updated_at';

const mimeExtension: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

function assertSupabaseConfigured() {
  if (!supabase) {
    throw new Error('Supabase is not configured.');
  }

  return supabase;
}

function assertSafeReading(reading: PalmReading) {
  if (!palmReadingIsSafe(reading)) {
    throw new Error('Palm Reading content did not pass safety validation.');
  }
}

async function getFunctionErrorMessage(error: unknown) {
  if (error && typeof error === 'object' && 'context' in error) {
    const context = error.context as { json?: () => Promise<unknown> };

    if (typeof context?.json === 'function') {
      try {
        const body = (await context.json()) as { error?: unknown };

        if (typeof body.error === 'string') {
          return body.error;
        }
      } catch {
        return null;
      }
    }
  }

  return error instanceof Error ? error.message : null;
}

async function blobFromImage(image: SelectedPalmImage) {
  const response = await fetch(image.uri);

  if (!response.ok) {
    throw new Error('Palm image could not be prepared for upload.');
  }

  return response.blob();
}

function getStoragePath({
  handSide,
  image,
  readingId,
  userId,
}: {
  handSide: PalmReadingHandSide;
  image: SelectedPalmImage;
  readingId: string;
  userId: string;
}) {
  const extension = mimeExtension[image.mimeType] ?? 'jpg';

  return `${userId}/${readingId}/${handSide}.${extension}`;
}

export async function createPalmReading(userId: string) {
  const client = assertSupabaseConfigured();
  const { data, error } = await client
    .from('palm_readings')
    .insert({ status: 'pending', user_id: userId })
    .select(palmReadingFields)
    .single<PalmReading>();

  if (error || !data) {
    throw new Error('Palm Reading could not be started.');
  }

  assertSafeReading(data);

  return data;
}

export async function uploadPalmReadingImage({
  handSide,
  image,
  readingId,
  userId,
}: {
  handSide: PalmReadingHandSide;
  image: SelectedPalmImage;
  readingId: string;
  userId: string;
}) {
  const client = assertSupabaseConfigured();
  const storagePath = getStoragePath({ handSide, image, readingId, userId });
  const blob = await blobFromImage(image);
  const fileSize = image.fileSize ?? blob.size;

  if (!mimeExtension[image.mimeType]) {
    throw new Error('Palm images must be JPEG, PNG, or WebP.');
  }

  const { error: uploadError } = await client.storage
    .from('palm-images')
    .upload(storagePath, blob, {
      contentType: image.mimeType,
      upsert: true,
    });

  if (uploadError) {
    throw new Error('Palm image could not be uploaded privately.');
  }

  const { data, error } = await client
    .from('palm_reading_images')
    .upsert(
      {
        file_size: fileSize,
        hand_side: handSide,
        height: image.height,
        mime_type: image.mimeType,
        palm_reading_id: readingId,
        storage_path: storagePath,
        user_id: userId,
        width: image.width,
      },
      { onConflict: 'palm_reading_id,hand_side' },
    )
    .select(palmReadingImageFields)
    .single<PalmReadingImage>();

  if (error || !data) {
    throw new Error('Palm image metadata could not be saved.');
  }

  return data;
}

export async function generatePalmReading(readingId: string) {
  const client = assertSupabaseConfigured();
  const { data, error } = await client.functions.invoke<PalmReadingResponse>(
    'palm-reading',
    {
      body: { palm_reading_id: readingId },
    },
  );

  if (error) {
    throw new Error(
      (await getFunctionErrorMessage(error)) ??
        'Palm Reading is not ready yet. Please try again.',
    );
  }

  if (!data?.reading) {
    throw new Error('Palm Reading is not ready yet. Please try again.');
  }

  assertSafeReading(data.reading);

  return data;
}

export async function submitPalmReading({
  leftImage,
  rightImage,
  userId,
}: {
  leftImage: SelectedPalmImage;
  rightImage: SelectedPalmImage;
  userId: string;
}) {
  const reading = await createPalmReading(userId);

  await uploadPalmReadingImage({
    handSide: 'left',
    image: leftImage,
    readingId: reading.id,
    userId,
  });
  await uploadPalmReadingImage({
    handSide: 'right',
    image: rightImage,
    readingId: reading.id,
    userId,
  });

  return generatePalmReading(reading.id);
}

export async function getPalmReading(readingId: string, userId: string) {
  const client = assertSupabaseConfigured();
  const { data, error } = await client
    .from('palm_readings')
    .select(palmReadingFields)
    .eq('user_id', userId)
    .eq('id', readingId)
    .maybeSingle<PalmReading>();

  if (error) {
    throw error;
  }

  if (data) {
    assertSafeReading(data);
  }

  return data;
}

export async function getLatestPalmReading(userId: string) {
  const client = assertSupabaseConfigured();
  const { data, error } = await client
    .from('palm_readings')
    .select(palmReadingFields)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle<PalmReading>();

  if (error) {
    throw error;
  }

  if (data) {
    assertSafeReading(data);
  }

  return data;
}

export async function getPalmReadingHistory(userId: string) {
  const client = assertSupabaseConfigured();
  const { data, error } = await client
    .from('palm_readings')
    .select(palmReadingFields)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(6)
    .returns<PalmReading[]>();

  if (error) {
    throw error;
  }

  const readings = data ?? [];
  readings.forEach(assertSafeReading);

  return readings;
}
