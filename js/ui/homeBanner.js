import { heroBannerUrl } from '../settings/api.js';
import { displayMessage } from './displayMessage.js';

export async function homeBanner() {
	const heroBannerContainer = document.querySelector('#hero');
	

	try {
		const response = await fetch(heroBannerUrl);
		heroBannerContainer.innerHTML = `<img src="${response.gero_banner.formats.large.url}" class="banner flex-grow-1" alt="...">`;
	} catch (error) {
		displayMessage('error', 'An error has occoured', '#hero');
	}
}
