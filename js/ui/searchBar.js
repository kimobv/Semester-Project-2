import { showAllShoes } from '../productFunctions/showAllShoes.js';

export function searchBar(products) {
	const containerShoes = document.querySelector('#products');
	const searchBar = document.querySelector('#search');
	const noProduct = document.querySelector('#no-products');

	searchBar.onkeyup = function () {
		const searchValue = this.value.trim().toLowerCase();

		const filteredSearch = products.filter((product) => {
			if (product.title.toLowerCase().includes(searchValue) || product.description.toLowerCase().includes(searchValue)) {
				return true;
			}
		});

		if (filteredSearch.length === 0) {
			noProduct.innerHTML = `No match for "${searchValue}"`;
		} else {
			noProduct.innerHTML = '';
		}

		containerShoes.innerHTML = '';
		showAllShoes(filteredSearch);
	};
}
