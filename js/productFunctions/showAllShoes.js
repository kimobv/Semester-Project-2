import { getUsername } from '../utils/localStorage.js';

export function showAllShoes(products) {
	const productContainer = document.querySelector('#products');
	const username = getUsername();
	productContainer.innerHTML = '';

	if (!username) {
		products.forEach(function (product) {
			console.log(product);
			productContainer.innerHTML += `
				<div class="card m-2" style="width: 18rem;">
  					<img src="${product.image.formats.medium.url}" class="card-img-top pt-3" alt="${product.title}">
  					<div class="card-body">
    					<h5 class="card-title">${product.title}</h5>
    					<a href="products-details.html?id=${product.id}" class="btn btn-primary">kr. ${product.price}</a>
  					</div>
				</div>`;
		});
	}
	if (username) {
		products.forEach(function (product) {
			productContainer.innerHTML += `
				<div class="card m-2" style="width: 18rem;">
					<a href="edit-delete-product.html?id=${product.id}" aria-label="${product.title}">
  						<img src="${product.image.formats.medium.url}" class="card-img-top pt-3" alt="${product.title}">
  						<div class="card-body">
    						<h5 class="card-title">${product.title}</h5>
    						<p>kr. ${product.price}</p>
  						</div>
					</a>
				</div>`;
		});
	}
}
