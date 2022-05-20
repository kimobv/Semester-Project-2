import { productUrl } from '../settings/api.js';
import { tokenKey } from '../settings/variables.js';
import { getFromStorage } from '../utils/localStorage.js';
import { displayMessage } from '../ui/displayMessage.js';

export function deleteProduct(id) {
	const deleteContainer = document.querySelector('.delete-container');
	deleteContainer.innerHTML = `<button type="button" class="btn btn-danger delete">Delete</button>`;
	const button = document.querySelector('.delete');

	button.onclick = async function () {
		const doDelete = confirm('Do you want to delete this product? \nIt is not reversible.');

		if (doDelete) {
			const idUrl = productUrl + id;
			const token = getFromStorage(tokenKey);
			const options = {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};

			try {
				const response = await fetch(idUrl, options);
				const json = await response.json();

				if (json.created_at) {
					location.href = '/products.html';
				}
			} catch (error) {
				displayMessage('error', 'An error has occured', '.message-container');
			}
		}
	};
}
