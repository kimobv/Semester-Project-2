import { deleteItemFromStorage } from "../utils/localStorage.js"; 
import { userKey } from "../settings/variables.js";

export function logoutButton() {
    const button = document.querySelector("#logoutButton"); 

    if(button) {
        button.onclick = function() {
            deleteItemFromStorage(userKey); 
            location.href = "/";
        }
    }; 
}