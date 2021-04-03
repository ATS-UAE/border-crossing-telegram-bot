export class TimeOutPromise {
	public static useTimeout = async <T>(
		promise: () => Promise<T>,
		timeout: number
	) => {
		return new Promise<T>(async (resolve, reject) => {
			const timer = setTimeout(() => {
				reject(new Error("Promise timeout!"));
			}, timeout * 1000);
			const resolved = await promise();
			clearTimeout(timer);
			resolve(resolved);
		});
	};
}
