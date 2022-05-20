import { cartCounter } from '../settings/variables.js';
import { getFromStorage } from '../utils/localStorage.js';

export function displayCartNumber() {
	const cartCount = document.querySelector('.cart-count');
	let prodCount = getFromStorage(cartCounter);
	if (prodCount) {
		cartCount.innerHTML = prodCount;
	}
}
