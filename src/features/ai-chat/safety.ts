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
  /\bmedical diagnosis\b/i,
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
  /\bemergency\b/i,
];

function textIsSafe(value: string) {
  return forbiddenPatterns.every((pattern) => !pattern.test(value));
}

function categoryTextIsSafe(value: string, patterns: RegExp[]) {
  return textIsSafe(value) && patterns.every((pattern) => !pattern.test(value));
}

export function aiAssistantTextIsSafe(value: string) {
  return (
    textIsSafe(value) &&
    categoryTextIsSafe(value, moneyForbiddenPatterns) &&
    categoryTextIsSafe(value, wellnessForbiddenPatterns)
  );
}
