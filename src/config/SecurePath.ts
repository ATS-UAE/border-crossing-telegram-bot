const {
	SECUREPATH_BASE_URL,
	SECUREPATH_USERNAME,
	SECUREPATH_PASSWORD
} = process.env;

if (!SECUREPATH_BASE_URL) {
	throw new Error("SECUREPATH_BASE_URL is required as environment variable.");
}

if (!SECUREPATH_USERNAME) {
	throw new Error("SECUREPATH_USERNAME is required as environment variable.");
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
export const username = SECUREPATH_USERNAME;
export const password = SECUREPATH_PASSWORD;
export const borderGeofence: Geofence[] = [
	{
		name: "Hili Border",
		coordinates: [
			{ latitude: 24.269054591676646, longitude: 55.76728893565462 },
			{ latitude: 24.26336210873037, longitude: 55.767632258408526 },
			{ latitude: 24.263655541918613, longitude: 55.768898261063555 },
			{ latitude: 24.26872204813892, longitude: 55.77555013942049 },
			{ latitude: 24.270189145432656, longitude: 55.77758861827181 },
			{ latitude: 24.268291696386598, longitude: 55.77829672145174 },
			{ latitude: 24.261777557808934, longitude: 55.768898261063555 },
			{ latitude: 24.259077907045477, longitude: 55.77149463938997 },
			{ latitude: 24.25618256570808, longitude: 55.769885313981035 },
			{ latitude: 24.25637819895643, longitude: 55.76909138011263 },
			{ latitude: 24.257512865861194, longitude: 55.767868292801836 },
			{ latitude: 24.258080195516452, longitude: 55.76750351237581 },
			{ latitude: 24.262383993210754, longitude: 55.76619459437654 },
			{ latitude: 24.264242406262944, longitude: 55.75780464457796 },
			{ latitude: 24.2658660501637, longitude: 55.758190882676104 },
			{ latitude: 24.264007660850357, longitude: 55.76544357585237 },
			{ latitude: 24.271851835222687, longitude: 55.76555086421297 },
			{ latitude: 24.27187139614956, longitude: 55.76752497004793 }
		]
	},
	{
		name: "Sila Border",
		coordinates: [
			{
				latitude: 24.08372399388716,
				longitude: 51.725775302748616
			},
			{
				latitude: 24.066327084949837,
				longitude: 51.71719223390096
			},
			{
				latitude: 24.09140295943184,
				longitude: 51.69075638185018
			},
			{
				latitude: 24.116943961435958,
				longitude: 51.62363678346151
			},
			{
				latitude: 24.11036333156425,
				longitude: 51.59462601075643
			},
			{
				latitude: 24.129477558467624,
				longitude: 51.553255618910725
			},
			{
				latitude: 24.15172166851174,
				longitude: 51.57110840211385
			},
			{
				latitude: 24.13339405572258,
				longitude: 51.591707767348225
			},
			{
				latitude: 24.14326309682129,
				longitude: 51.61883026490682
			},
			{
				latitude: 24.13073085063762,
				longitude: 51.65573746095174
			}
		]
	},
	{
		name: "Al Ain South",
		coordinates: [
			{ latitude: 24.107354028771816, longitude: 55.82330292423296 },
			{ latitude: 24.04570767577037, longitude: 55.841043786155524 },
			{ latitude: 24.02091537369333, longitude: 55.846021966087164 },
			{ latitude: 24.01150733112956, longitude: 55.8440478602522 },
			{ latitude: 24.00986085291781, longitude: 55.847738579856696 },
			{ latitude: 24.021385757752167, longitude: 55.84945519362623 },
			{ latitude: 24.108293191497793, longitude: 55.827194189440206 }
		]
	},
	{
		name: "Al Ain North",
		coordinates: [
			{ latitude: 24.1341971420141, longitude: 55.902145279334604 },
			{ latitude: 24.18149865175025, longitude: 55.93922413675648 },
			{ latitude: 24.205612542656784, longitude: 55.95021046488148 },
			{ latitude: 24.195278576317097, longitude: 55.92892445413929 },
			{ latitude: 24.1915205627088, longitude: 55.909355057166636 },
			{ latitude: 24.195278576317097, longitude: 55.87158955423695 },
			{ latitude: 24.197157541591555, longitude: 55.826957596229136 },
			{ latitude: 24.202794271276815, longitude: 55.830734146522104 },
			{ latitude: 24.203107415618405, longitude: 55.86025990335804 },
			{ latitude: 24.199349632749644, longitude: 55.90420521585804 },
			{ latitude: 24.199975937586593, longitude: 55.91793812601429 },
			{ latitude: 24.210935774126057, longitude: 55.947807205604136 },
			{ latitude: 24.239249947186067, longitude: 55.95570362894398 },
			{ latitude: 24.248015188259888, longitude: 55.96634663431507 },
			{ latitude: 24.24864125379978, longitude: 55.98213948099476 },
			{ latitude: 24.238936891694138, longitude: 55.984542740272104 },
			{ latitude: 24.2339278990915, longitude: 55.9677199253307 },
			{ latitude: 24.21733420331103, longitude: 55.9622267612682 },
			{ latitude: 24.19760680947439, longitude: 55.95776356546742 },
			{ latitude: 24.17223853204313, longitude: 55.946090591834604 },
			{ latitude: 24.134020006105413, longitude: 55.91793812601429 },
			{ latitude: 24.11709996083834, longitude: 55.90283192484242 },
			{ latitude: 24.12650026226012, longitude: 55.892875564979136 }
		]
	},
	{
		name: "Hatta West",
		coordinates: [
			{ latitude: 24.860592123627402, longitude: 55.988061432489985 },
			{ latitude: 24.858723060319623, longitude: 55.99801779235327 },
			{ latitude: 24.858878816674256, longitude: 56.00608587707006 },
			{ latitude: 24.84867636109477, longitude: 56.04282141173803 },
			{ latitude: 24.835746850028332, longitude: 56.064193253168696 },
			{ latitude: 24.83185215430647, longitude: 56.06067419494116 },
			{ latitude: 24.843068546274367, longitude: 56.04136229003393 },
			{ latitude: 24.844937846119155, longitude: 56.028745178827876 },
			{ latitude: 24.85327146432492, longitude: 56.00574255431616 },
			{ latitude: 24.8535051090816, longitude: 55.998275284418696 },
			{ latitude: 24.855685772195386, longitude: 55.988061432489985 }
		]
	},
	{
		name: "Hatta East",
		coordinates: [
			{ latitude: 24.807103362958443, longitude: 56.20387070111883 },
			{ latitude: 24.811855824668125, longitude: 56.19460098676336 },
			{ latitude: 24.819256836545314, longitude: 56.16670601300848 },
			{ latitude: 24.819490545509403, longitude: 56.160354542061214 },
			{ latitude: 24.822295018689267, longitude: 56.15022652082098 },
			{ latitude: 24.818633610485662, longitude: 56.13589279584539 },
			{ latitude: 24.814816282464697, longitude: 56.136321949287776 },
			{ latitude: 24.81808828511175, longitude: 56.150312351509456 },
			{ latitude: 24.81528371670427, longitude: 56.16052620343817 },
			{ latitude: 24.81582905442184, longitude: 56.167049335762385 },
			{ latitude: 24.808116197946084, longitude: 56.193313526436214 },
			{ latitude: 24.80227280532404, longitude: 56.20455734662664 }
		]
	},
	{
		name: "Dibba",
		coordinates: [
			{ latitude: 25.6298023772266, longitude: 56.26862363251894 },
			{ latitude: 25.621947479959466, longitude: 56.27154187592714 },
			{ latitude: 25.61474992855061, longitude: 56.27677754792421 },
			{ latitude: 25.615330392316757, longitude: 56.27763585480898 },
			{ latitude: 25.622218347084416, longitude: 56.27300099763124 },
			{ latitude: 25.62995714833788, longitude: 56.27034024628847 }
		]
	},
	{
		name: "Khatm Malaha Border",
		coordinates: [
			{ latitude: 25.021362675353444, longitude: 56.321699579573306 },
			{ latitude: 24.970044542778165, longitude: 56.32152791819635 },
			{ latitude: 24.97253437279515, longitude: 56.37259717783991 },
			{ latitude: 25.021506338189724, longitude: 56.37008176687027 }
		]
	},
	{
		name: "Al Jeer",
		coordinates: [
			{ latitude: 26.050407032541795, longitude: 56.08637872037377 },
			{ latitude: 26.045240483022585, longitude: 56.08586373624291 },
			{ latitude: 26.035870711657648, longitude: 56.0932451754519 },
			{ latitude: 26.0354851083205, longitude: 56.09573426541772 },
			{ latitude: 26.03193749813894, longitude: 56.096034672827386 },
			{ latitude: 26.03209174429092, longitude: 56.09766545590844 },
			{ latitude: 26.036950394257268, longitude: 56.096807149023675 },
			{ latitude: 26.037220313354133, longitude: 56.094575551123285 },
			{ latitude: 26.045543594714662, longitude: 56.08753743466821 },
			{ latitude: 26.05032457633759, longitude: 56.08886781033959 },
			{ latitude: 26.05236800093326, longitude: 56.08938279447045 },
			{ latitude: 26.052483665411053, longitude: 56.08616414365258 }
		]
	}
];
