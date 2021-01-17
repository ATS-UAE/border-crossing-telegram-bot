import { shouldLog } from "../config/Global";

export class Logger {
	public static log = (...message: any) => {
		if (shouldLog) {
			console.log(...message);
		}
	};
}
