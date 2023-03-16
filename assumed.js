function getAssumedLocales(availableKeys, usedLocales) {
	let allLocales = validLocationByKey(availableKeys);
	return allLocales.filter( x => !usedLocales.includes(x) );
}

function runAssumedRandom() {
	let keysCopy = [...keys];
	let mapOfKeys = {};
	let kos = 0;
	let resultArr = [];
	while(keysCopy.length > 0) {
		const randomKeyIndex = Math.floor(Math.random() * keysCopy.length);
		const randomKey = keysCopy[randomKeyIndex];
		keysCopy.splice(randomKeyIndex, 1);

		let possibleLocales = getAssumedLocales(keysCopy, Object.keys(mapOfKeys));
		if(possibleLocales.length < 1) {
			possibleLocales = roomsStr.filter( x => !Object.keys(mapOfKeys).includes(x) );
		}
		const randomLocale = possibleLocales[Math.floor(Math.random() * possibleLocales.length)];
		mapOfKeys[randomLocale] = randomKey;
		
		if (keysCopy.length < 1) {
			Object.keys(mapOfKeys).sort().forEach(function(v, i) {
				resultArr.push(mapOfKeys[v]);
			});
			if(!checkValid(resultArr)) {
				keysCopy = [...keys]
				mapOfKeys = {};
				kos++;
				resultArr = [];
			}
		}
	}
	
	return [resultArr, kos];
}

function runAssumedSmart() {
	let keysCopy = [...progressionKeys];
	let mapOfKeys = {};
	while(keysCopy.length > 0) {
		const randomKeyIndex = Math.floor(Math.random() * keysCopy.length);
		const randomKey = keysCopy[randomKeyIndex];
		keysCopy.splice(randomKeyIndex, 1);

		const possibleLocales = getAssumedLocales(keysCopy, Object.keys(mapOfKeys));
		const randomLocale = possibleLocales[Math.floor(Math.random() * possibleLocales.length)];
		mapOfKeys[randomLocale] = randomKey;
	}
	keysCopy = [...junkKeys];
	while(keysCopy.length > 0) {
		const randomKeyIndex = Math.floor(Math.random() * keysCopy.length);
		const randomKey = keysCopy[randomKeyIndex];
		keysCopy.splice(randomKeyIndex, 1);

		const possibleLocales = getAssumedLocales(["A","B"], Object.keys(mapOfKeys));
		const randomLocale = possibleLocales[Math.floor(Math.random() * possibleLocales.length)];
		mapOfKeys[randomLocale] = randomKey;
	}
	let resultArr = [];
	Object.keys(mapOfKeys).sort().forEach(function(v, i) {
		resultArr.push(mapOfKeys[v]);
	});
	return [resultArr, 0];
}
