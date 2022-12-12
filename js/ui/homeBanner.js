import { heroBannerUrl } from '../settings/api.js';
import { displayMessage } from './displayMessage.js';

export async function homeBanner() {
	const heroBannerContainer = document.querySelector('#hero');

	try {
		const response = await fetch(heroBannerUrl);
		const products = await response.json();

		heroBannerContainer.innerHTML = `<img src="${products.hero_banner.url}" class="banner flex-grow-1" alt="...">`;
	} catch (error) {
		displayMessage('error', 'An error has occoured', '#hero');
	}
}
