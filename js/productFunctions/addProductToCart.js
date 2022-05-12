import { saveToStorage, getFromStorage } from "../utils/localStorage.js";
import { cartList, cartCounter } from "../settings/variables.js";

export function addProductToCart(event) {
    const cartCount = document.querySelector(".cart-count");

    this.classList.toggle("delete");
    this.classList.toggle("add-to-cart");

    const id = this.dataset.id; 
    const title = this.dataset.title; 
    const price = this.dataset.price; 
    const description = this.dataset.description; 
    const image = this.dataset.image;

    const currentShoes = getFromStorage(cartList); 
    let numberInCart = parseInt(getFromStorage(cartCounter)); 

    const productExist = currentShoes.find(function(shoe) {
        return shoe.id === id; 
    });

    if(productExist === undefined) {
        const product = { id: id, title: title, price: price, description: description, image: image };
        currentShoes.push(product);
        saveToStorage(cartList, currentShoes);                
                  
        if(numberInCart) {
            saveToStorage(cartCounter, numberInCart + 1);
            cartCount.innerHTML = numberInCart + 1;
        } else {
            saveToStorage(cartCounter, 1);
            cartCount.innerHTML = numberInCart = 1;
        }
        
        event.target.innerHTML = "Remove from cart";
    }
    else {
        const newFavs = currentShoes.filter((shoe) => shoe.id !== id );
        saveToStorage(cartList, newFavs); 

        saveToStorage(cartCounter, numberInCart - 1);
        cartCount.innerHTML = numberInCart - 1;   

        event.target.innerHTML = "Add to cart";
    }
};