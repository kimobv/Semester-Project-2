import createMenu from './ui/createMenu.js';
import { getFromStorage, saveToStorage } from './utils/localStorage.js';
import { cartList, cartCounter } from './settings/variables.js';

createMenu();

const productsInCart = getFromStorage(cartList);
const cartContainer = document.querySelector('#cartTarget');
const totalContainer = document.querySelector('#totalPrice');
const cartCount = document.querySelector('#summary');
let total = 0;

productsInCart.forEach((cartElement) => {
	cartContainer.innerHTML += `
		<hr class="my-4" />
		<div class="row mb-4 d-flex justify-content-between align-items-center">
			<div class="col-md-2 col-lg-2 col-xl-2">
				<img src="${cartElement.image}" class="img-fluid rounded-3" alt="${cartElement.title}" />
			</div>
			<div class="col-md-3 col-lg-3 col-xl-3">
    	    <a href="products-details.html?id=${cartElement.id}">
				<h6 class="text-black mb-0">${cartElement.title}</h6>
    	        </a>
			</div>
			<div class="col-md-3 col-lg-3 col-xl-2 d-flex">
				<select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
				  <option selected>Size</option>
				  <option value="1">Small</option>
				  <option value="2">Medium</option>
				  <option value="3">Large</option>
				</select>
			</div>
			<div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
				<h6 class="mb-0">${cartElement.price},-</h6>
			</div>
			<div class="col-md-1 col-lg-1 col-xl-1 text-end">
				<i class="btn fas fa-times" data-id="${cartElement.id}"></i>
			</div>
		</div>
		<hr class="my-4" />`;

	total += parseInt(cartElement.price);
	totalContainer.innerHTML = `<h5>Total </h5><h5>${total + 129} KR</h5>`;
	cartCount.innerHTML = `<h5 class="text-uppercase itemQty">items</h5><h5>${productsInCart.length}</h5>`;
	const deleteItem = document.querySelectorAll('.fa-times');
	deleteItem.forEach(function (can) {
		can.addEventListener('click', removeFromList);
	});
});
if (productsInCart.length === 0) {
	totalContainer.remove();
	cartContainer.innerHTML = `
		<hr class="my-4" />
		<div class="row mb-4 d-flex justify-content-center align-items-center">
			<h4 class="display-6 my-5 text-center">Oh no! - There's no shirts in the cart!</h4>
    	    <a href="products.html" class="btn mx-2 text-muted text-center">Click here to look at some cool tee's.</a>
		</div>`;
}
console.log(productsInCart.length);
function removeFromList(event) {
	for (let i = 0; i < productsInCart.length; i++) {
		if (productsInCart[i].id === event.target.dataset.id) {
			productsInCart.splice(i, 1);
			saveToStorage(cartList, productsInCart);
			location.reload();
			let numberInCart = parseInt(getFromStorage(cartCounter));
			if (numberInCart) {
				saveToStorage(cartCounter, numberInCart - 1);
				cartCount.innerHTML = numberInCart - 1;
			}
			break;
		}
	}
}
