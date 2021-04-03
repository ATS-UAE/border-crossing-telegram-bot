import { Logger } from "./Logger";

export interface JobFunction {
	(): Promise<void>;
	(): void;
}

export interface ScheduledJobOptions {
	/** In seconds */
	interval: number;
	waitFinish?: boolean;
}

export class ScheduledJob {
	private isLastExecutionDone = true;
	private secondsSinceStart = 0;
	private timeSinceLastJobExecution = 0;

	constructor(public job: JobFunction, private options: ScheduledJobOptions) {}

	private shouldExecuteJob = () => {
		return (
			this.secondsSinceStart >
			this.timeSinceLastJobExecution + this.options.interval
		);
	};

	private checkPreviousJobStillExecuting = () => {
		if (this.options.waitFinish) {
			return !this.isLastExecutionDone;
		}
		return false;
	};

	private executeJob = async () => {
		this.isLastExecutionDone = false;
		await this.job().catch(Logger.error);
		this.timeSinceLastJobExecution = this.secondsSinceStart;
		this.isLastExecutionDone = true;
	};

	public start = () => {
		setInterval(() => {
			if (!this.checkPreviousJobStillExecuting()) {
				if (this.shouldExecuteJob()) {
					this.executeJob();
				}
			}
			this.secondsSinceStart++;
		}, 1000);
	};
}
