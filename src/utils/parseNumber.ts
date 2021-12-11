function ensureNumber(value: unknown): number | null {
  return typeof value === 'number' && !Number.isNaN(value) && Number.isFinite(value) ? value : null;
}

export default function parseNumber(value: unknown): number | null {
  if (typeof value === 'string' && value !== '') {
    return ensureNumber(+value);
  }
  return ensureNumber(value);
}
