export default function serializeDate(value: Date): string {
  return value.toISOString().slice(0, 'YYYY-MM-DD'.length);
}
