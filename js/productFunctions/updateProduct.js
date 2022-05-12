import { productUrl } from '../settings/api.js';
import { displayMessage } from '../ui/displayMessage.js';
import { getFromStorage } from '../utils/localStorage.js';
import { tokenKey } from '../settings/variables.js';

export async function updateProduct() {
	const queryString = document.location.search;
	const params = new URLSearchParams(queryString);
	const id = params.get('id');
	const idUrl = productUrl + id;

	const form = document.querySelector('.edit-delete-form');

	let inputs = document.querySelector('.edit-delete-form').elements;
	let checkbox = document.querySelector('input[type="checkbox"]');

	const body = new FormData();
	const inputData = {};

	for (let inputElement of inputs) {
		switch (inputElement.type) {
			case 'file':
				for (let file of inputElement.files) {
					body.append(`files.${inputElement.name}`, file, file.name);
				}
				break;

			case 'checkbox':
				if (checkbox.checked) {
					inputData[inputElement.name] = inputElement.value;
				} else if (checkbox) {
					inputData[inputElement.name] = null;
				}
				break;

			default:
				inputData[inputElement.name] = inputElement.value;
				break;
		}
	}

	body.append('data', JSON.stringify(inputData));

	try {
		const token = getFromStorage(tokenKey);
		const response = await fetch(idUrl, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: body,
		});

		const result = await response.json();

		if (result.created_at) {
			displayMessage('success', 'Product updated', '.message-container');
			form.reset();
		}
	} catch (error) {
		displayMessage('error', 'An error has occured', '.message-container');
	}
}
