import { keys } from 'immuton';
import type Encoding from '../serializers/Encoding';

export default function encodeObject(obj: Encoding): string {
  return keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&');
}
