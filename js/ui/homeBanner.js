import { heroBannerUrl } from '../settings/api.js';
import { displayMessage } from './displayMessage.js';

export async function homeBanner() {
	const heroBannerContainer = document.querySelector('#hero');

	try {
		const response = await fetch(heroBannerUrl);
		const products = await response.json();
		//heroBannerContainer.innerHTML = `<img src="${products.hero_banner.url}" class="flex-grow-1" alt="...">`;
		heroBannerContainer.innerHTML = `<img src="https://res.cloudinary.com/kimobv/image/upload/v1670793068/hero.jpg" class="flex-grow-1" alt="...">`;
	} catch (error) {
		//displayMessage('error', 'An error has occoured', '#hero');
		heroBannerContainer.innerHTML = `<img src="https://res.cloudinary.com/kimobv/image/upload/v1670793068/hero.jpg" class="flex-grow-1" alt="...">`;
	}
}
