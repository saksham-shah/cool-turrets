var XBOUND, YBOUND, ENEMYLIMIT, TURRETLIMIT, ENEMYSPAWN, TURRETSPAWN;

XBOUND = 4000;
YBOUND = 4000;

ENEMYLIMIT = 25;
TURRETLIMIT = 25;

ENEMYSPAWN = [
0.7,	// Seeker
0.15,	// Shooter
0.1,	// Missile
0.05,	// Seeker Boss
]

TURRETSPAWN = [
0.5,	// Standard
0.2,	// Sniper
0.2,	// Bomber
0.1,	// Spike
]

// Takes in an array of weights (e.g. ENEMYSPAWN) and returns a random index
function randomFromWeights(arr) {
	var randomNum = random();
	var currentTotal = 0;
	for (var i = 0; i < arr.length; i++) {
		currentTotal += arr[i];
		if (currentTotal > randomNum) {
			return i;
		}
	}
}