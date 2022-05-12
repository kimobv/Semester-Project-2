import { productUrl  } from "./settings/api.js";
import createMenu from "./ui/createMenu.js";
import { displayMessage } from "./ui/displayMessage.js";
import { checkLength } from "./ui/checkLength.js";
import { deleteProduct } from "./productFunctions/deleteProduct.js";
import { updateProduct } from "./productFunctions/updateProduct.js";

createMenu(); 

const queryString = document.location.search; 
const params = new URLSearchParams(queryString); 
const id = params.get("id"); 
const idUrl = productUrl + id; 

const form = document.querySelector(".edit-delete-form");
const title = document.querySelector("#title");
const titleError = document.querySelector("#titleError");
const price = document.querySelector("#price");
const priceError = document.querySelector("#priceError");
const description = document.querySelector("#description");
const descriptionError = document.querySelector("#descriptionError");
const images = document.querySelector('input[type="file"]');
const idInput = document.querySelector("#id"); 
const messageContainer = document.querySelector(".message-container");
const loader = document.querySelector(".loader");

(async function () {
    try {
        const response = await fetch(idUrl); 
        const details = await response.json(); 

        title.value = details.title; 
        price.value = details.price; 
        description.value = details.description; 
        idInput.value = details.id; 
        images.file = details.image.name; 

        let checkbox = document.querySelector('input[type="checkbox"]');

        if(details.featured === true) {
            checkbox.checked = true;
        }

        deleteProduct(details.id);
    }
    catch(error) {
        displayMessage("error", "An error has occured", ".message-container");
    }
    finally {
        loader.style.display = "none"; 
        form.style.display = "block"; 
    }
})();

form.addEventListener("submit", submitForm); 

function submitForm(event) {
    event.preventDefault(); 
    messageContainer.innerHTML = ""; 

    if(checkLength(title.value, 2)) {
        titleError.style.display = "none";
    } else {
        titleError.style.display = "block";
    }
    
    if(checkLength(price.value, 2)) {
        priceError.style.display = "none";
    } else {
        priceError.style.display = "block";
    }
    
    if(checkLength(description.value, 30)) {
        descriptionError.style.display = "none";
    } else {
        descriptionError.style.display = "block";
    }

    if(checkLength(title.value, 2) && checkLength(price.value, 2) && checkLength(description.value, 30)) {
        updateProduct()
    }
}