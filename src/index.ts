import dotenv from "dotenv";
dotenv.config();
import TelegramBot from "node-telegram-bot-api";
import { SecurePath, LiveTrackerItem } from "securepath-api";
import {
	password,
	username,
	baseUrl,
	borderGeofence,
	Coordinate,
	Geofence
} from "./config/SecurePath";
import { token, channelId } from "./config/Telegram";

const bot = new TelegramBot(token);
const trackersInsideGeofence: LiveTrackerItem[] = [];

const checkTrackerInsideGeofence = (
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

const checkTrackerAlreadyNotified = (trackerToCheck: LiveTrackerItem) => {
	return trackersInsideGeofence.some(
		tracker => tracker.trackerId === trackerToCheck.trackerId
	);
};

const markTrackerAsNotified = (trackerToMark: LiveTrackerItem) => {
	const isTrackerAlreadyNotified = checkTrackerAlreadyNotified(trackerToMark);
	if (!isTrackerAlreadyNotified) {
		trackersInsideGeofence.push(trackerToMark);
	}
};

const unmarkTrackerAsNotified = (trackerToUnmark: LiveTrackerItem) => {
	const notifiedTrackerIndex = trackersInsideGeofence.findIndex(
		tracker => tracker.trackerId === trackerToUnmark.trackerId
	);
	if (notifiedTrackerIndex >= 0) {
		trackersInsideGeofence.splice(notifiedTrackerIndex, 1);
	}
};

const notifyViaTelegram = (tracker: LiveTrackerItem, geofence: Geofence) => {
	bot.sendMessage(
		channelId,
		`SecurePath vehicle ${tracker.iconText} is crossing to ${geofence.name}`
	);
};

const checkForBorderCrossing = (tracker: LiveTrackerItem) => {
	borderGeofence.forEach(geofence => {
		const isTrackerInsideGeofence = checkTrackerInsideGeofence(
			tracker,
			geofence.coordinates
		);
		if (isTrackerInsideGeofence) {
			const isTrackerAlreadyNotified = checkTrackerAlreadyNotified(tracker);
			if (!isTrackerAlreadyNotified) {
				notifyViaTelegram(tracker, geofence);
				markTrackerAsNotified(tracker);
			} else {
				unmarkTrackerAsNotified(tracker);
			}
		}
	});
};

const main = async () => {
	const session = await SecurePath.login(username, password, { baseUrl });

	setInterval(async () => {
		const liveTrackerData = await session.Live.getTrackers();
		for (const tracker of liveTrackerData) {
			checkForBorderCrossing(tracker);
		}
	}, 5000);
};

main();
