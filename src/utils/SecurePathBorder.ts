import SecurePath, { Vehicle } from "securepath-api-2";
import {
	borderGeofence,
	Coordinate,
	Geofence,
	baseUrl,
	email,
	password
} from "../config/SecurePath";
import { Logger } from "./Logger";
import { ScheduledJob } from "./ScheduledJob";
import { Telegram } from "./Telegram";

export interface SecurePathTracker {
	trackerId: string;
	latitude: number | null;
	longitude: number | null;
	plateNumber: string | null;
	chassisNumber: string;
}

export class SecurePathBorder {
	private telegram: Telegram;
	private notifiedTrackers: SecurePathTracker[] = [];

	private constructor(private session: SecurePath) {
		this.telegram = Telegram.create();
	}

	private checkTrackerInsideGeofence = (
		trackerData: SecurePathTracker,
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

	private checkTrackerAlreadyNotified = (trackerToCheck: SecurePathTracker) => {
		return this.notifiedTrackers.some(
			tracker => tracker.trackerId === trackerToCheck.trackerId
		);
	};

	private markTrackerAsNotified = (trackerToMark: SecurePathTracker) => {
		const isTrackerAlreadyNotified = this.checkTrackerAlreadyNotified(
			trackerToMark
		);
		if (!isTrackerAlreadyNotified) {
			this.notifiedTrackers.push(trackerToMark);
		}
	};

	private unmarkTrackerAsNotified = (trackerToUnmark: SecurePathTracker) => {
		const notifiedTrackerIndex = this.notifiedTrackers.findIndex(
			tracker => tracker.trackerId === trackerToUnmark.trackerId
		);
		if (notifiedTrackerIndex >= 0) {
			this.notifiedTrackers.splice(notifiedTrackerIndex, 1);
		}
	};

	private notifyBorderCrossingViaTelegram = (
		tracker: SecurePathTracker,
		geofence: Geofence
	) => {
		const message = `SecurePath vehicle ${
			tracker.plateNumber || tracker.chassisNumber
		} is crossing ${geofence.name}`;
		Logger.log(message);
		this.telegram.sendMessage(message);
	};

	public checkForBorderCrossing = (tracker: SecurePathTracker) => {
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

	public getAllTrackers = async (): Promise<SecurePathTracker[]> => {
		const organizations = await this.session.getOrganizations();
		const allVehicles: Vehicle[] = [];
		for (let orgIndex = 0; orgIndex < organizations.length; orgIndex++) {
			const organization = organizations[orgIndex];
			const vehicles = await organization.getVehicles(true);
			allVehicles.push(...vehicles);
		}
		return allVehicles.map(vehicle => ({
			chassisNumber: vehicle.chassisNumber,
			latitude: vehicle.latitude,
			longitude: vehicle.longitude,
			plateNumber: vehicle.plateNumber,
			trackerId: vehicle.trackerId
		}));
	};

	public checkBorders = async () => {
		const allTrackers = await this.getAllTrackers();
		Logger.log(`Checking ${allTrackers.length} trackers.`);
		allTrackers.forEach(tracker => {
			this.checkForBorderCrossing(tracker);
		});
	};

	public static startScheduledBorderCheck = async (interval: number = 5) => {
		const session = await SecurePath.login(
			{
				email,
				password
			},
			{
				baseUrl
			}
		);
		const securePath = new SecurePathBorder(session);
		const jobScheduler = new ScheduledJob(
			async () => {
				Logger.log("Checking borders");
				await securePath.checkBorders().catch(e => {
					Logger.error(e);
				});
			},
			{ interval }
		);
		Logger.log(`Starting schedule job every ${5} seconds.`);
		jobScheduler.start();
		return jobScheduler;
	};
}
