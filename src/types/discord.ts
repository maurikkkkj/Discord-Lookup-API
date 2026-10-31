export interface ChallengeResponse {
  challenge: string;
  salt: string;
  maxNumber: number;
  signature: string;
}

export interface LookupResult {
  algorithm: 'SHA-256';
  challenge: string;
  number: number;
  salt: string;
  signature: string;
  took: number;
}

export const challengeUrl = 'https://backend.discord.id/challenge';
export const lookupUrl = 'https://backend.discord.id/lookup';

export const defaultHeaders = {
  'User-Agent': 'Mozilla/5.0 (Linux; Android 10)',
  Origin: 'https://discord.id',
  Referer: 'https://discord.id/'
} as const;

export const lookupHeaders = {
  'User-Agent':
    'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36',
  'Accept-Encoding': 'gzip, deflate, br, zstd',
  'Content-Type': 'application/json',
  'sec-ch-ua-platform': '"Android"',
  'sec-ch-ua': '"Chromium";v="140", "Not=A?Brand";v="24", "Google Chrome";v="140"',
  'sec-ch-ua-mobile': '?1',
  origin: 'https://discord.id',
  'sec-fetch-site': 'same-site',
  'sec-fetch-mode': 'cors',
  'sec-fetch-dest': 'empty',
  referer: 'https://discord.id/',
  'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
  priority: 'u=1, i'
} as const;
