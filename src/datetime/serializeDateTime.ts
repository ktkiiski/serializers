export default function serializeDateTime(value: Date): string {
  return value.toISOString();
}
