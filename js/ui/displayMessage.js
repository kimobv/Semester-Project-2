export function displayMessage(messageType, message, target) {
	const element = document.querySelector(target);

	element.innerHTML = `<div class="alert alert-danger message ${messageType}" role="alert">
                ${message}!
            </div>`;
}
