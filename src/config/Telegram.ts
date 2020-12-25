const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHANNEL_ID } = process.env;

if (!TELEGRAM_BOT_TOKEN) {
	throw new Error("TELEGRAM_BOT_TOKEN is required as environment variable.");
}
if (!TELEGRAM_CHANNEL_ID) {
	throw new Error("TELEGRAM_CHANNEL_ID is required as environment variable.");
}

export const token = TELEGRAM_BOT_TOKEN;
export const channelId = TELEGRAM_CHANNEL_ID;
