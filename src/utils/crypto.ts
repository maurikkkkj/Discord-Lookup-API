import { createHash } from 'node:crypto';

export function sha256Hex(value: string): string {
  return createHash('sha256').update(value, 'utf8').digest('hex');
}

export function toBase64(value: string): string {
  return Buffer.from(value, 'utf8').toString('base64');
}
