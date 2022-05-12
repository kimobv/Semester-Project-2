import { productUrl } from './settings/api.js';
import createMenu from './ui/createMenu.js';
import { displayMessage } from './ui/displayMessage.js';
import { checkLength } from './ui/checkLength.js';
import { getFromStorage } from './utils/localStorage.js';
import { tokenKey } from './settings/variables.js';

createMenu();

const form = document.querySelector('.add-edit-delete-form');
const title = document.querySelector('#title');
const titleError = document.querySelector('#titleError');
const price = document.querySelector('#price');
const priceError = document.querySelector('#priceError');
const description = document.querySelector('#description');
const descriptionError = document.querySelector('#descriptionError');
const messageContainer = document.querySelector('.message-container');

form.addEventListener('submit', validateForm);

function validateForm(event) {
	event.preventDefault();
	messageContainer.innerHTML = '';

	if (checkLength(title.value, 2)) {
		titleError.style.display = 'none';
	} else {
		titleError.style.display = 'block';
	}

	if (checkLength(price.value, 2)) {
		priceError.style.display = 'none';
	} else {
		priceError.style.display = 'block';
	}

	if (checkLength(description.value, 30)) {
		descriptionError.style.display = 'none';
	} else {
		descriptionError.style.display = 'block';
	}

	if (checkLength(title.value, 2) && checkLength(price.value, 2) && checkLength(description.value, 30)) {
		addProduct();
	}
}

async function addProduct() {
	const inputs = document.querySelector('.add-edit-delete-form').elements;
	let checkbox = document.querySelector('input[type="checkbox"]:checked');
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
				if (checkbox) {
					inputData[inputElement.name] = inputElement.value;
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
		console.log(inputData);
		const response = await fetch(productUrl, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: body,
		});

		const result = await response.json();

		if (result.created_at) {
			displayMessage('success', 'Product created', '.message-container');
			form.reset();
		}
	} catch (error) {
		console.log(error);
		displayMessage('error', 'An error has occured', '.message-container');
	}
}
