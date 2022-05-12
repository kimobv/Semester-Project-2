import { productUrl } from './settings/api.js';
import createMenu from './ui/createMenu.js';
import { searchBar } from './ui/searchBar.js';
import { displayMessage } from './ui/displayMessage.js';
import { showAllShoes } from './productFunctions/showAllShoes.js';

createMenu();

async function getProducts() {
	try {
		const response = await fetch(productUrl);
		const products = await response.json();

		showAllShoes(products);
		searchBar(products);
	} catch (error) {
		displayMessage('error', 'An error has occoured', '.product-container');
	}
}

getProducts();
