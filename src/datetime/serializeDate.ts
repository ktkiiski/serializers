export default function serializeDate(value: Date): string {
  // TODO: Special cases like new Date(-10, …) and new Date(99999, …)
  const year = value.getFullYear().toString().padStart(4, '0');
  const month = (value.getMonth() + 1).toString().padStart(2, '0');
  const day = value.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}
