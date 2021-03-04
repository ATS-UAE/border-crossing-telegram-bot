const {
	SECUREPATH_BASE_URL,
	SECUREPATH_EMAIL,
	SECUREPATH_PASSWORD
} = process.env;

if (!SECUREPATH_BASE_URL) {
	throw new Error("SECUREPATH_BASE_URL is required as environment variable.");
}

if (!SECUREPATH_EMAIL) {
	throw new Error("SECUREPATH_EMAIL is required as environment variable.");
}

if (!SECUREPATH_PASSWORD) {
	throw new Error("SECUREPATH_PASSWORD is required as environment variable.");
}

export interface Geofence {
	name: string;
	coordinates: Coordinate[];
}

export interface Coordinate {
	latitude: number;
	longitude: number;
}

export const baseUrl = SECUREPATH_BASE_URL;
export const email = SECUREPATH_EMAIL;
export const password = SECUREPATH_PASSWORD;
export const borderGeofence: Geofence[] = [
	{
		name: "Hili Border",
		coordinates: [
			{ latitude: 24.263572637228155, longitude: 55.765546605746685 },
			{ latitude: 24.253321629724667, longitude: 55.75722102896446 },
			{ latitude: 24.25003487220991, longitude: 55.75593356863731 },
			{ latitude: 24.24231105648695, longitude: 55.75601939932579 },
			{ latitude: 24.24231105648695, longitude: 55.78108196036094 },
			{ latitude: 24.25971236723337, longitude: 55.78740606764571 },
			{ latitude: 24.263781363842156, longitude: 55.77341566542403 },
			{ latitude: 24.26425085506965, longitude: 55.768094162738485 }
		]
	},
	{
		name: "Sila Border",
		coordinates: [
			{ latitude: 24.11283053796728, longitude: 51.59643121797701 },
			{ latitude: 24.12191781029653, longitude: 51.625098667928185 },
			{ latitude: 24.127557861655387, longitude: 51.62921854097506 },
			{ latitude: 24.132257714508345, longitude: 51.62389703828951 },
			{ latitude: 24.130064471334308, longitude: 51.59746118623873 },
			{ latitude: 24.16768047397907, longitude: 51.56225849427461 },
			{ latitude: 24.189291578294934, longitude: 51.504923594372265 },
			{ latitude: 24.116926985840994, longitude: 51.50973011292695 }
		]
	},
	{
		name: "Al Ain South",
		coordinates: [
			{ latitude: 24.03118243584375, longitude: 55.84829438824902 },
			{ latitude: 24.029771386057014, longitude: 55.84262956280957 },
			{ latitude: 23.999420880480947, longitude: 55.838509689762695 },
			{ latitude: 23.973494874878444, longitude: 55.82849730602911 },
			{ latitude: 23.967220611986544, longitude: 55.8530448829334 },
			{ latitude: 23.989806528465117, longitude: 55.8966468726795 },
			{ latitude: 24.018082748371686, longitude: 55.86214293591192 }
		]
	},
	{
		name: "Al Ain North",
		coordinates: [
			{ latitude: 24.212544451584534, longitude: 55.9409897692305 },
			{ latitude: 24.200645306829944, longitude: 55.96364907098831 },
			{ latitude: 24.216301845414858, longitude: 55.98905495477737 },
			{ latitude: 24.248235217309002, longitude: 55.98356179071487 },
			{ latitude: 24.25574778740428, longitude: 55.954036033878936 },
			{ latitude: 24.241348304924806, longitude: 55.93892983270706 }
		]
	},
	{
		name: "Hatta West",
		coordinates: [
			{ latitude: 24.91987407030004, longitude: 55.801696882390246 },
			{ latitude: 24.896831375353024, longitude: 55.79792033209728 },
			{ latitude: 24.852290738248424, longitude: 55.91499339117931 },
			{ latitude: 24.84450226543868, longitude: 56.016960249089465 },
			{ latitude: 24.86973513782534, longitude: 56.01936350836681 }
		]
	},
	{
		name: "Hatta East",
		coordinates: [
			{ latitude: 24.82522971293924, longitude: 56.18974423616801 },
			{ latitude: 24.79219600489176, longitude: 56.18631100862895 },
			{ latitude: 24.764141609225145, longitude: 56.25360226839457 },
			{ latitude: 24.764141609225145, longitude: 56.32364011019145 },
			{ latitude: 24.795312768488852, longitude: 56.32981991976176 },
			{ latitude: 24.80840232023573, longitude: 56.26733517855082 }
		]
	},
	{
		name: "Dibba",
		coordinates: [
			{ latitude: 25.6257566180466, longitude: 56.27225109690849 },
			{ latitude: 25.642471305296745, longitude: 56.27019116038505 },
			{ latitude: 25.640459476080455, longitude: 56.242897001449506 },
			{ latitude: 25.62002975196503, longitude: 56.23800465220634 },
			{ latitude: 25.60806391398064, longitude: 56.24033899992762 },
			{ latitude: 25.60411646480975, longitude: 56.266259867847545 },
			{ latitude: 25.607289914612164, longitude: 56.26780482024012 },
			{ latitude: 25.61572623732272, longitude: 56.25664683073817 },
			{ latitude: 25.62253677898355, longitude: 56.26188250273524 }
		]
	},
	{
		name: "Khatm Malaha Border",
		coordinates: [
			{ latitude: 24.996406031894104, longitude: 56.37723894804774 },
			{ latitude: 24.99002698003788, longitude: 56.34033175200282 },
			{ latitude: 24.921717704694633, longitude: 56.3465456516186 },
			{ latitude: 24.893069807398337, longitude: 56.34723229712641 },
			{ latitude: 24.90614902039834, longitude: 56.4179567844311 }
		]
	},
	{
		name: "Al Jeer",
		coordinates: [
			{ latitude: 26.041948075264084, longitude: 56.08269688186843 },
			{ latitude: 26.042048386824828, longitude: 56.092052426912375 },
			{ latitude: 26.06811085864902, longitude: 56.0960006385823 },
			{ latitude: 26.068419255560663, longitude: 56.08295437393386 }
		]
	}
];
