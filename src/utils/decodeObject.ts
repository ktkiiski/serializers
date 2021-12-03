import type Encoding from '../serializers/Encoding';

export default function decodeObject(encoding: string): Encoding {
  const result: Encoding = {};
  encoding.split('&').forEach((entry) => {
    const [encKey, encValue] = entry.split('=', 2);
    if (encKey != null && encValue != null) {
      result[decodeURIComponent(encKey)] = decodeURIComponent(encValue);
    }
  });
  return result;
}
