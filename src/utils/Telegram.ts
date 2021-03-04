import TelegramBot from "node-telegram-bot-api";
import { token, channelId } from "../config/Telegram";

export class Telegram {
	private bot: TelegramBot;
	private messagesPendingForSend: string[] = [];
	private throttlingIntervalSeconds = 1;
	private timerId: NodeJS.Timeout | null = null;

	constructor(public botToken: string) {
		this.bot = new TelegramBot(botToken);
		this.startSendingMessageByInterval();
	}

	public static create = () => {
		const telegram = new Telegram(token);
		return telegram;
	};

	private startSendingMessageByInterval = () => {
		this.resetTimer();
		this.timerId = setInterval(() => {
			this.publishOneMessage();
		}, this.throttlingIntervalSeconds * 1000);
	};

	private resetTimer = () => {
		if (this.timerId) {
			clearInterval(this.timerId);
		}
	};

	public sendMessage = (message: string) => {
		this.messagesPendingForSend.push(message);
	};

	private publishOneMessage = () => {
		const oldestMessage = this.getOldestMessage();
		if (oldestMessage) {
			this.bot.sendMessage(channelId, oldestMessage);
		}
	};

	private getOldestMessage = () => {
		return this.messagesPendingForSend.shift();
	};
}
