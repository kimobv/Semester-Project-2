import { getUsername } from '../utils/localStorage.js';

export function showAllShoes(products) {
	const shoesContainer = document.querySelector('.product-container');
	const headingContainer = document.querySelector('.product-heading-container');
	const username = getUsername();
	shoesContainer.innerHTML = '';

	if (!username) {
		headingContainer.innerHTML = `<h1>Shoes</h1>`;

		products.forEach(function (product) {
			console.log(product);
			shoesContainer.innerHTML += `
			<div class="card" style="width: 18rem;">
  				<img src="${product.image.formats.medium.url}" class="card-img-top img-thumbnail" alt="${product.title}">
  				<div class="card-body">
    				<h5 class="card-title">${product.title}</h5>
    				<a href="products-details.html?id=${product.id}" class="btn btn-primary">kr. ${product.price}</a>
  				</div>
			</div>`;
		});
	}
	if (username) {
		headingContainer.innerHTML = `<h1>Edit or delete products</h1>`;

		products.forEach(function (product) {
			shoesContainer.innerHTML += `<div class="product-content">
                                            <a href="edit-delete-product.html?id=${product.id}" aria-label="${product.title}"> 
                                                <img src="${product.image.formats.medium.url}" alt="${product.title}"></img>                                         
                                                <h2>${product.title}<h2>
                                                <p>kr. ${product.price}<p> 
                                                <button class="btn add-to-cart">Edit</button>
                                            </a>
                                        </div>`;
		});
	}
}
