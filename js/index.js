import createMenu from './ui/createMenu.js';
import { homeBanner } from './ui/homeBanner.js';
import { productUrl } from './settings/api.js';
import { displayMessage } from './ui/displayMessage.js';
import { getUsername } from './utils/localStorage.js';

createMenu();
homeBanner();

async function featuredProducts() {
	try {
		const response = await fetch(productUrl);
		const products = await response.json();

		const featuredContainer = document.querySelector('#featured');
		featuredContainer.innerHTML = '';

		const username = getUsername();

		if (!username) {
			for (var i = 0; i < products.length; i++) {
				if (products[i].featured === true) {
					featuredContainer.innerHTML += `<div class="col">
														<div class="card border-dark mb-3" style="width: 18rem;">
															<a href="products-details.html?id=${products[i].id}" aria-label="${products[i].title}">
																<img src="${products[i].image.formats.medium.url}" class="ratio ratio-1x1" alt="${products[i].title}">
																<div class="card-body text-center">
																	<h5 class="card-title" style="text-decoration: none;">${products[i].title}</h5>
																	<h4 class="card-text text-danger">kr. ${products[i].price}</h4>
																</div>
															</a>
														</div>
													</div>`;
				}
			}
		}

		if (username) {
			for (var i = 0; i < products.length; i++) {
				if (products[i].featured === true) {
					featuredContainer.innerHTML += `<div class="col">
														<div class="card border-dark mb-3" style="width: 18rem;">
															<a href="edit-delete-product.html?id=${products[i].id}" aria-label="${products[i].title}">
																<img src="${products[i].image.formats.medium.url}" class="ratio ratio-1x1" alt="${products[i].title}">
																<div class="card-body text-center">
																	<h5 class="card-title" style="text-decoration: none;">${products[i].title}</h5>
																	<h4 class="card-text text-danger">kr. ${products[i].price}</h4>
																	<button type="button" class="btn btn-outline-primary">Edit</button>
																</div>
															</a>
														</div>
													</div>`;
				}
			}
		}
	} catch (error) {
		displayMessage('error', 'An error has occoured', '.featured-container');
	}
}

featuredProducts();
