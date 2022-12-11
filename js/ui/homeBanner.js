import { heroBannerUrl } from '../settings/api.js';
import { displayMessage } from './displayMessage.js';

//displayMessage('error', 'An error has occoured', '#hero');

export async function homeBanner() {
	const heroBannerContainer = document.querySelector('#hero');

	try {
		const response = await fetch(heroBannerUrl);
		
		heroBannerContainer.innerHTML = `<img src="https://res.cloudinary.com/kimobv/image/upload/v1670793068/hero.jpg" class="banner flex-grow-1" alt="...">`;
	} catch () {
		
		heroBannerContainer.innerHTML = `<img src="https://res.cloudinary.com/kimobv/image/upload/v1670793068/hero.jpg" class="banner flex-grow-1" alt="...">`;
	}
}
