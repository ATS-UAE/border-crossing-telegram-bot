import TelegramBot from "node-telegram-bot-api";
import { token, channelId } from "../config/Telegram";

export class Telegram {
	public bot: TelegramBot;
	constructor(public botToken: string) {
		this.bot = new TelegramBot(botToken);
	}

	public static create = () => {
		return new Telegram(token);
	};

	public sendMessage = (message: string) => {
		this.bot.sendMessage(channelId, message);
	};
}
