function runRandom() {
	let keyCopy = [...keys];
	let isValid = false;
	let ko = -1;
	while(!isValid) {
		ko++;
		keyCopy = shuffle(keyCopy);
		isValid = checkValid(keyCopy);
	}
	return [keyCopy, ko];
}

function shuffle(array) {
	let currentIndex = array.length;
	let randomIndex = 0;

	while (currentIndex > 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		let tempValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = tempValue;
	}
	return array;
}

function getPossibleLocations(usedRooms, bannedRooms) {
	return roomsStr.filter( x => !usedRooms.includes(x) && !bannedRooms.includes(x) );
}

function runOffRandom() {
	let mapOfKeys = {};
	let isValid = false;
	let ko = -1;
	let resultArr = [];
	while(!isValid) {
		ko++;
		resultArr = [];
		mapOfKeys = {};
		let keysCopy = [...keys];
		while (keysCopy.length > 0) {
			const randomKeyIndex = Math.floor(Math.random() * keysCopy.length);
			const randomKey = keysCopy[randomKeyIndex];
			keysCopy.splice(randomKeyIndex, 1);

			const bannedRooms = Object.keys(requirements).filter(room => requirements[room] === randomKey);
			const possibleRooms = getPossibleLocations(Object.keys(mapOfKeys), bannedRooms);
			if(possibleRooms.length < 1) {
				keysCopy = [...keys];
				mapOfKeys = {};
				ko++
				continue;
			}
			const randomRoom = possibleRooms[Math.floor(Math.random() * possibleRooms.length)];
			mapOfKeys[randomRoom] = randomKey;
		}
		Object.keys(mapOfKeys).sort().forEach(function(v, i) {
			resultArr.push(mapOfKeys[v]);
		});
		isValid = checkValid(resultArr);
	}
	return [resultArr, ko];
}