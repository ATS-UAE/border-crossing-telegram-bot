"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
var securepath_api_1 = require("securepath-api");
var SecurePath_1 = require("./config/SecurePath");
var Telegram_1 = require("./config/Telegram");
var bot = new node_telegram_bot_api_1.default(Telegram_1.token);
var trackersInsideGeofence = [];
var checkTrackerInsideGeofence = function (trackerData, coordinates) {
    if (trackerData.latitude && trackerData.longitude) {
        var x = trackerData.latitude, y = trackerData.longitude;
        var inside = false;
        // Point in polygon via ray tracing algorithm
        for (var i = 0, j = coordinates.length - 1; i < coordinates.length; j = i++) {
            var xi = coordinates[i].latitude, yi = coordinates[i].longitude;
            var xj = coordinates[j].latitude, yj = coordinates[j].longitude;
            var intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
            if (intersect)
                inside = !inside;
        }
        return inside;
    }
    return false;
};
var checkTrackerAlreadyNotified = function (trackerToCheck) {
    return trackersInsideGeofence.some(function (tracker) { return tracker.trackerId === trackerToCheck.trackerId; });
};
var markTrackerAsNotified = function (trackerToMark) {
    var isTrackerAlreadyNotified = checkTrackerAlreadyNotified(trackerToMark);
    if (!isTrackerAlreadyNotified) {
        trackersInsideGeofence.push(trackerToMark);
    }
};
var unmarkTrackerAsNotified = function (trackerToUnmark) {
    var notifiedTrackerIndex = trackersInsideGeofence.findIndex(function (tracker) { return tracker.trackerId === trackerToUnmark.trackerId; });
    if (notifiedTrackerIndex >= 0) {
        trackersInsideGeofence.splice(notifiedTrackerIndex, 1);
    }
};
var notifyViaTelegram = function (tracker, geofence) {
    bot.sendMessage(Telegram_1.channelId, "SecurePath vehicle " + tracker.iconText + " is crossing to " + geofence.name);
};
var checkForBorderCrossing = function (tracker) {
    SecurePath_1.borderGeofence.forEach(function (geofence) {
        var isTrackerInsideGeofence = checkTrackerInsideGeofence(tracker, geofence.coordinates);
        if (isTrackerInsideGeofence) {
            var isTrackerAlreadyNotified = checkTrackerAlreadyNotified(tracker);
            if (!isTrackerAlreadyNotified) {
                notifyViaTelegram(tracker, geofence);
                markTrackerAsNotified(tracker);
            }
            else {
                unmarkTrackerAsNotified(tracker);
            }
        }
    });
};
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var session;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, securepath_api_1.SecurePath.login(SecurePath_1.username, SecurePath_1.password, { baseUrl: SecurePath_1.baseUrl })];
            case 1:
                session = _a.sent();
                setInterval(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var liveTrackerData, _i, liveTrackerData_1, tracker;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, session.Live.getTrackers()];
                            case 1:
                                liveTrackerData = _a.sent();
                                for (_i = 0, liveTrackerData_1 = liveTrackerData; _i < liveTrackerData_1.length; _i++) {
                                    tracker = liveTrackerData_1[_i];
                                    checkForBorderCrossing(tracker);
                                }
                                return [2 /*return*/];
                        }
                    });
                }); }, 5000);
                return [2 /*return*/];
        }
    });
}); };
main();
