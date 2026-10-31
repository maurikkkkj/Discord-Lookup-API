import { config as loadEnv } from 'dotenv';

loadEnv();

export interface AppConfig {
  discordId: string;
  token: string;
}

export const appConfig: AppConfig = {
  discordId: process.env.DISCORD_ID ?? 'ID_here',
  token: process.env.DISCORD_TOKEN ?? 'bot token here'
};
