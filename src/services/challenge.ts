import { challengeUrl, type ChallengeResponse } from '../types/discord.js';
import { sha256Hex } from '../utils/crypto.js';

export async function fetchChallenge(): Promise<ChallengeResponse> {
  const response = await fetch(challengeUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Linux; Android 10)',
      Origin: 'https://discord.id',
      Referer: 'https://discord.id/'
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch challenge: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as ChallengeResponse;
  return data;
}

export function solveChallenge(challenge: string, salt: string, maxNumber: number): number {
  const start = Date.now();
  let numberFound: number | null = null;

  for (let i = 0; i < maxNumber; i += 1) {
    const variants = [
      `${salt}${i}`,
      `${salt}:${i}`,
      `${i}${salt}`,
      `${challenge}${i}${salt}`,
      `${salt}${challenge}${i}`,
      `${i}:${salt}`
    ];

    for (const value of variants) {
      if (sha256Hex(value) === challenge) {
        numberFound = i;
        break;
      }
    }

    if (numberFound !== null) {
      break;
    }
  }

  if (numberFound === null) {
    throw new Error('Number not found');
  }

  const took = Date.now() - start;
  return numberFound;
}
