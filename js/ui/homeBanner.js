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
		heroBannerContainer.innerHTML = `<img src="https://res.cloudinary.com/kimobv/image/upload/c_fill,g_auto,h_250,w_970/b_rgb:000000,e_gradient_fade,y_-0.50/c_scale,co_rgb:ffffff,fl_relative,w_0.5,y_0.18/v1670793068/hero.jpg" class="flex-grow-1" alt="...">`;
	}
}
