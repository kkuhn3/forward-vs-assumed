function forwardAvailableLocation(mapOfKeys) {
	const allLocales = validLocationsFromMap(mapOfKeys)
	return allLocales.filter( x => !Object.keys(mapOfKeys).includes(x) );
}

function runForwardRandom() {
	let keysCopy = [...keys];
	let mapOfKeys = {};
	let kos = 0;
	let resultArr = [];
	while(keysCopy.length > 0) {
		const randomKeyIndex = Math.floor(Math.random() * keysCopy.length);
		const randomKey = keysCopy[randomKeyIndex];
		keysCopy.splice(randomKeyIndex, 1);

		let possibleLocales = forwardAvailableLocation(mapOfKeys);
		if(possibleLocales.length < 1) {
			keysCopy = [...keys]
			mapOfKeys = {};
			kos++;
		}
		else {
			const randomLocale = possibleLocales[Math.floor(Math.random() * possibleLocales.length)];
			mapOfKeys[randomLocale] = randomKey;
		}
	}
	Object.keys(mapOfKeys).sort().forEach(function(v, i) {
		resultArr.push(mapOfKeys[v]);
	});
	return [resultArr, kos];
}

function runForwardSmart() {
	let keysCopy = [...progressionKeys];
	let mapOfKeys = {};
	while(keysCopy.length > 0) {
		const randomKeyIndex = Math.floor(Math.random() * keysCopy.length);
		const randomKey = keysCopy[randomKeyIndex];
		keysCopy.splice(randomKeyIndex, 1);

		const possibleLocales = forwardAvailableLocation(mapOfKeys);
		const randomLocale = possibleLocales[Math.floor(Math.random() * possibleLocales.length)];
		mapOfKeys[randomLocale] = randomKey;
	}
	keysCopy = [...junkKeys];
	while(keysCopy.length > 0) {
		const randomKeyIndex = Math.floor(Math.random() * keysCopy.length);
		const randomKey = keysCopy[randomKeyIndex];
		keysCopy.splice(randomKeyIndex, 1);

		const possibleLocales = forwardAvailableLocation(mapOfKeys);
		const randomLocale = possibleLocales[Math.floor(Math.random() * possibleLocales.length)];
		mapOfKeys[randomLocale] = randomKey;
	}
	let resultArr = [];
	Object.keys(mapOfKeys).sort().forEach(function(v, i) {
		resultArr.push(mapOfKeys[v]);
	});
	return [resultArr, 0];
}

function getRandomProgressionKey(keysAvailable) {
	while(keysAvailable.some(v => progressionKeys.includes(v))) {
		const randomKeyIndex = Math.floor(Math.random() * keysAvailable.length);
		const randomKey = keysAvailable[randomKeyIndex];
		if(progressionKeys.includes(randomKey)) {
			return randomKeyIndex;
		}
	}
	return false;
}

function runFowardBatch() {
	let keysCopy = [...keys];
	let mapOfKeys = {};
	while(keysCopy.some(v => progressionKeys.includes(v))) {
		let randomKeyIndex = getRandomProgressionKey(keysCopy);
		let randomKey = keysCopy[randomKeyIndex];
		keysCopy.splice(randomKeyIndex, 1);
		let pushkeys =[];
		pushkeys.push(randomKey);

		let possibleLocales = forwardAvailableLocation(mapOfKeys);
		if(possibleLocales.length > 1) {
			for(let i = 0; i < possibleLocales.length-1; i++) {
				randomKeyIndex = Math.floor(Math.random() * keysCopy.length);
				randomKey = keysCopy[randomKeyIndex];
				pushkeys.push(randomKey);
				keysCopy.splice(randomKeyIndex, 1);
			}
		}

		for(let i = 0; i < pushkeys.length; i++) {
			const randomLocaleIndex = Math.floor(Math.random() * possibleLocales.length);
			const randomLocale = possibleLocales[randomLocaleIndex];
			possibleLocales.splice(randomLocaleIndex, 1);
			mapOfKeys[randomLocale] = pushkeys[i];
		}
	}
	while(keysCopy.length > 0) {
		const randomKeyIndex = Math.floor(Math.random() * keysCopy.length);
		const randomKey = keysCopy[randomKeyIndex];
		keysCopy.splice(randomKeyIndex, 1);

		const possibleLocales = forwardAvailableLocation(mapOfKeys);
		const randomLocale = possibleLocales[Math.floor(Math.random() * possibleLocales.length)];
		mapOfKeys[randomLocale] = randomKey;
	}
	let resultArr = [];
	Object.keys(mapOfKeys).sort().forEach(function(v, i) {
		resultArr.push(mapOfKeys[v]);
	});
	return [resultArr, 0];
}