"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a = process.env, TELEGRAM_BOT_TOKEN = _a.TELEGRAM_BOT_TOKEN, TELEGRAM_CHANNEL_ID = _a.TELEGRAM_CHANNEL_ID;
if (!TELEGRAM_BOT_TOKEN) {
    throw new Error("TELEGRAM_BOT_TOKEN is required as environment variable.");
}
if (!TELEGRAM_CHANNEL_ID) {
    throw new Error("TELEGRAM_CHANNEL_ID is required as environment variable.");
}
exports.token = TELEGRAM_BOT_TOKEN;
exports.channelId = TELEGRAM_CHANNEL_ID;
