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

		const featuredContainer = document.querySelector('.featured-container');
		featuredContainer.innerHTML = '';

		const username = getUsername();

		if (!username) {
			for (var i = 0; i < products.length; i++) {
				if (products[i].featured === true) {
					featuredContainer.innerHTML += `<div class="featured-content">
                                                        <a href="products-details.html?id=${products[i].id}" aria-label="${products[i].title}">
                                                            <img src="${products[i].image.formats.medium.url}" alt="${products[i].title}">
                                                            <h2>${products[i].title}<h2>
                                                            <p>kr. ${products[i].price}<p> 
                                                        </a>
                                                    </div>`;
				}
			}
		}

		if (username) {
			for (var i = 0; i < products.length; i++) {
				if (products[i].featured === true) {
					featuredContainer.innerHTML += `<div class="featured-content">
                                                        <a href="edit-delete-product.html?id=${products[i].id}" aria-label="${products[i].title}">
                                                            <img src="${products[i].image.formats.medium.url}" alt="${products[i].title}">
                                                            <h2>${products[i].title}<h2>
                                                            <p>kr. ${products[i].price}<p> 
                                                        </a>
                                                    </div>`;
				}
			}
		}
	} catch (error) {
		displayMessage('error', 'An error has occoured', '.featured-container');
	}
}

featuredProducts();
