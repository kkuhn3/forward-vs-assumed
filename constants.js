const requirements = {
	1: null,
	2: null,
	3: "A",
	4: "B"
};

const keys = ["A", "B", "Y", "Z"];
const rooms = [1, 2, 3, 4];
const roomsStr = ["1", "2", "3", "4"];
const progressionKeys = ["A", "B"];
const junkKeys = ["Y", "Z"];

function checkValid(keyArray) {
	return validLocations(keyArray).length === rooms.length;
}

function validLocations(keyArray) {
	let haveKeys = [null];
	let keysChanged = true;
	let roomsReached = [];
	while (keysChanged) {
		keysChanged = false;
		for (const [room, key] of Object.entries(requirements)) {
			if (haveKeys.includes(key) && !roomsReached.includes(room)) {
				haveKeys.push(keyArray[room-1]);
				keysChanged = true;
				roomsReached.push(room);
			}
		}
	}
	return roomsReached;
}

function validLocationsFromMap(mapOfKeys) {
	let haveKeys = [null];
	let keysChanged = true;
	let roomsReached = [];
	while (keysChanged) {
		keysChanged = false;
		for (const [room, key] of Object.entries(requirements)) {
			if (haveKeys.includes(key) && !roomsReached.includes(room)) {
				haveKeys.push(mapOfKeys[room]);
				keysChanged = true;
				roomsReached.push(room);
			}
		}
	}
	return roomsReached;
}

function validLocationByKey(keyArray) {
	let keysCopy = [...keyArray];
	keysCopy.push(null);
	let rooms = [];
	for (const [room, key] of Object.entries(requirements)) {
		if(keysCopy.includes(key)) {
			rooms.push(room);
		}
	}
	return rooms;
}
