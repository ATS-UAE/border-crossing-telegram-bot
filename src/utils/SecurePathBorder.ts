import SecurePath, { LiveTrackerItem } from "securepath-api";
import {
	borderGeofence,
	Coordinate,
	Geofence,
	baseUrl,
	username,
	password
} from "../config/SecurePath";
import { Logger } from "./Logger";
import { ScheduledJob } from "./ScheduledJob";
import { Telegram } from "./Telegram";

export class SecurePathBorder {
	private telegram: Telegram;
	private notifiedTrackers: LiveTrackerItem[] = [];

	private constructor(private session: SecurePath) {
		this.telegram = Telegram.create();
	}

	private checkTrackerInsideGeofence = (
		trackerData: LiveTrackerItem,
		coordinates: Coordinate[]
	) => {
		if (trackerData.latitude && trackerData.longitude) {
			let x = trackerData.latitude,
				y = trackerData.longitude;

			let inside = false;
			// Point in polygon via ray tracing algorithm
			for (
				let i = 0, j = coordinates.length - 1;
				i < coordinates.length;
				j = i++
			) {
				let xi = coordinates[i].latitude,
					yi = coordinates[i].longitude;
				let xj = coordinates[j].latitude,
					yj = coordinates[j].longitude;

				let intersect =
					yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
				if (intersect) inside = !inside;
			}
			return inside;
		}
		return false;
	};

	private checkTrackerAlreadyNotified = (trackerToCheck: LiveTrackerItem) => {
		return this.notifiedTrackers.some(
			tracker => tracker.trackerId === trackerToCheck.trackerId
		);
	};

	private markTrackerAsNotified = (trackerToMark: LiveTrackerItem) => {
		const isTrackerAlreadyNotified = this.checkTrackerAlreadyNotified(
			trackerToMark
		);
		if (!isTrackerAlreadyNotified) {
			this.notifiedTrackers.push(trackerToMark);
		}
	};

	private unmarkTrackerAsNotified = (trackerToUnmark: LiveTrackerItem) => {
		const notifiedTrackerIndex = this.notifiedTrackers.findIndex(
			tracker => tracker.trackerId === trackerToUnmark.trackerId
		);
		if (notifiedTrackerIndex >= 0) {
			this.notifiedTrackers.splice(notifiedTrackerIndex, 1);
		}
	};

	private notifyBorderCrossingViaTelegram = (
		tracker: LiveTrackerItem,
		geofence: Geofence
	) => {
		const message = `SecurePath vehicle ${tracker.iconText} is crossing ${geofence.name}`;
		Logger.log(message);
		this.telegram.sendMessage(message);
	};

	public checkForBorderCrossing = (tracker: LiveTrackerItem) => {
		let trackerInsideAnyGeofence = false;
		for (const geofence of borderGeofence) {
			const isTrackerInsideGeofence = this.checkTrackerInsideGeofence(
				tracker,
				geofence.coordinates
			);
			if (isTrackerInsideGeofence) {
				const isTrackerAlreadyNotified = this.checkTrackerAlreadyNotified(
					tracker
				);
				trackerInsideAnyGeofence = true;
				if (!isTrackerAlreadyNotified) {
					this.notifyBorderCrossingViaTelegram(tracker, geofence);
					this.markTrackerAsNotified(tracker);
				}
			}
		}
		if (!trackerInsideAnyGeofence) {
			this.unmarkTrackerAsNotified(tracker);
		}
		return trackerInsideAnyGeofence;
	};

	public getAllTrackers = () => {
		return this.session.Live.getTrackers();
	};

	public checkBorders = async () => {
		const allTrackers = await this.getAllTrackers();
		Logger.log(`Checking ${allTrackers.length} trackers.`);
		allTrackers.forEach(tracker => {
			this.checkForBorderCrossing(tracker);
		});
	};

	public static startScheduledBorderCheck = async (interval: number = 5) => {
		const session = await SecurePath.login(username, password, { baseUrl });
		const securePath = new SecurePathBorder(session);
		const jobScheduler = new ScheduledJob(
			async () => {
				Logger.log("Checking borders");
				await securePath.checkBorders();
			},
			{ interval }
		);
		Logger.log(`Starting schedule job every ${5} seconds.`);
		jobScheduler.start();
		return jobScheduler;
	};
}
