import { productUrl  } from "./settings/api.js";
import createMenu from "./ui/createMenu.js";
import { getFromStorage } from "./utils/localStorage.js";
import { cartList } from "./settings/variables.js";
import { displayMessage } from "./ui/displayMessage.js";
import { addProductToCart } from "./productFunctions/addProductToCart.js";

createMenu(); 

const queryString = document.location.search; 
const params = new URLSearchParams(queryString); 
const id = params.get("id"); 
const url = productUrl + id; 

const detailsContainer = document.querySelector(".product-details-container");
const whereAmI = document.querySelector("#where-am-i-products-details"); 

async function detailsProduct() {
    try {
        const response = await fetch(url); 
        const details = await response.json(); 

        const image = details.image.formats.large.url;
        whereAmI.innerHTML = `<a href="products-details.html?id=${details.id}" aria-label="${details.title}">${details.title}</a>`;
        document.title += ` ${details.title}`;

        let cssClass = "add-to-cart"; 
        let btnText = "Add to cart"; 

        const shoesInCart = getFromStorage(cartList);
        const doesObjectExist = shoesInCart.find(function(fav) { 
            return parseInt(fav.id) === details.id;
        })

        if(doesObjectExist) {
            cssClass = "delete";
            btnText = "Remove from cart";
        } 

        detailsContainer.innerHTML =    `<div class="detail-container">
                                            <div class="detail-img-container">                                    
                                                <img class="detail-img" src="${image}" alt="${details.title}"> 
                                            </div>    
                                            <div class="details-information">
                                                <h1>${details.title}<h1>
                                                <p>kr. ${details.price}<p>                                      
                                                <p>${details.description}<p>
                                                <button class="cta ${cssClass}" data-id="${details.id}" data-title="${details.title}" data-price="${details.price}" data-description="${details.description}" data-image="${image}">${btnText}</button>
                                            </div>                                                                                                             
                                        </div>`;
     
        const btnAddToCart = document.querySelectorAll(".detail-container button"); 
        
        btnAddToCart.forEach(function(button) {
            button.addEventListener("click", addProductToCart); 
        });       
    }
    catch(error) {
        displayMessage("error", "An error has occoured", ".product-details-container"); 
    }
}

detailsProduct();