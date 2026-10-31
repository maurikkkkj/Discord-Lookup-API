import { lookupHeaders, lookupUrl, type ChallengeResponse, type LookupResult } from '../types/discord.js';
import { toBase64 } from '../utils/crypto.js';

export async function lookupDiscordUser(
  discordId: string,
  token: string,
  challenge: ChallengeResponse,
  numberFound: number,
  elapsedMs: number
): Promise<Record<string, unknown>> {
  const proofResult: LookupResult = {
    algorithm: 'SHA-256',
    challenge: challenge.challenge,
    number: numberFound,
    salt: challenge.salt,
    signature: challenge.signature,
    took: elapsedMs
  };

  const proof = toBase64(JSON.stringify(proofResult).replace(/\s+/g, ''));

  const payload = {
    discord_id: discordId,
    proof,
    token
  };

  const response = await fetch(lookupUrl, {
    method: 'POST',
    headers: lookupHeaders,
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Lookup request failed: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as Record<string, unknown>;
}
