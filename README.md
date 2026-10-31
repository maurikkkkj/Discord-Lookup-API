import { appConfig } from './config/env.js';
import { fetchChallenge, solveChallenge } from './services/challenge.js';
import { lookupDiscordUser } from './services/lookup.js';

async function main(): Promise<void> {
  const { discordId, token } = appConfig;

  if (discordId === 'ID_here' || token === 'bot token here') {
    console.warn(
      'Configure DISCORD_ID and DISCORD_TOKEN in a .env file or edit env.ts before running the lookup.'
    );
    process.exit(1);
  }

  const challenge = await fetchChallenge();
  const start = Date.now();
  const numberFound = solveChallenge(challenge.challenge, challenge.salt, challenge.maxNumber);
  const elapsedMs = Date.now() - start;

  const result = await lookupDiscordUser(discordId, token, challenge, numberFound, elapsedMs);

  console.log(JSON.stringify(result, null, 2));
}

main().catch((error: unknown) => {
  console.error('Unexpected error:', error);
  process.exit(1);
});
