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