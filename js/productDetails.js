import { productUrl } from './settings/api.js';
import createMenu from './ui/createMenu.js';
import { getFromStorage } from './utils/localStorage.js';
import { cartList } from './settings/variables.js';
import { displayMessage } from './ui/displayMessage.js';
import { addProductToCart } from './productFunctions/addProductToCart.js';
import { featuredProducts } from './index.js';

createMenu();
featuredProducts();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');
const url = productUrl + id;

const detailsContainer = document.querySelector('.product-details-container');
const whereAmI = document.querySelector('#where-am-i-products-details');

async function detailsProduct() {
	try {
		const response = await fetch(url);
		const details = await response.json();
		console.log(details);
		const image = details.image.formats.medium.url;
		whereAmI.innerHTML = `<a href="products-details.html?id=${details.id}" aria-label="${details.title}" class="text-muted text-decoration-none">${details.title}</a>`;
		document.title += ` ${details.title}`;

		let cssClass = 'add-to-cart';
		let btnText = 'Add to cart';

		const shoesInCart = getFromStorage(cartList);
		const doesObjectExist = shoesInCart.find(function (fav) {
			return parseInt(fav.id) === details.id;
		});

		if (doesObjectExist) {
			cssClass = 'delete';
			btnText = 'Remove from cart';
		}

		detailsContainer.innerHTML = `<div class="card detail-container mx-5 mb-3">
                                          <div class="row g-0">
                                            <div class="col-md-4">
                                              <img src="${image}" class="img-fluid rounded-start" alt="${details.title}">
                                            </div>
                                            <div class="col-md-8">
                                              <div class="card-body details-information">
                                                <h1 class="card-title">${details.title}</h1>
                                                <p class="card-text">${details.description}</p>
                                                <h4>kr. ${details.price}<h4>
                                                <button class="cta ${cssClass} btn btn-primary btn-lg" data-id="${details.id}" data-title="${details.title}" data-price="${details.price}" data-description="${details.description}" data-image="${image}">${btnText}</button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>`;

		const btnAddToCart = document.querySelectorAll('.detail-container button');

		btnAddToCart.forEach(function (button) {
			button.addEventListener('click', addProductToCart);
		});
	} catch (error) {
		displayMessage('error', 'A big error has occoured', '.product-details-container');
	}
}

detailsProduct();
