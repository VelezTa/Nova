import type { PalmReading } from './types';

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

function palmReadingTextIsSafe(value: string | null) {
  if (!value) {
    return true;
  }

  return forbiddenPatterns.every((pattern) => !pattern.test(value));
}

export function palmReadingIsSafe(reading: PalmReading) {
  return [
    reading.summary,
    reading.image_quality_note,
    reading.heart_line,
    reading.head_line,
    reading.life_line,
    reading.fate_line,
    reading.mounts,
    reading.hand_shape,
    reading.personality_reflection,
    reading.emotional_style,
    reading.decision_making_style,
    reading.strengths,
    reading.growth_areas,
    reading.error_message,
  ].every(palmReadingTextIsSafe);
}
