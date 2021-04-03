export class TimeOutPromise<T> {
	public static useTimeout = async <T>(
		promise: () => Promise<T>,
		timeout: number
	) => {
		const timer = setTimeout(() => {
			throw new Error("Promise timeout!");
		}, timeout * 1000);

		const resolved = await promise();
		clearTimeout(timer);

		return resolved;
	};
}
