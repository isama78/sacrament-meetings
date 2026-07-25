export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function safeJsonParse<T>(value: FormDataEntryValue | null, fallback: T): T {
  if (!value || typeof value !== "string") return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}
