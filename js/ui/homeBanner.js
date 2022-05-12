import { heroBannerUrl  } from "../settings/api.js";
import { displayMessage } from "./displayMessage.js";

export async function homeBanner() {
    const heroBannerContainer = document.querySelector(".hero-banner-container");
    
    try {
        const response = await fetch(heroBannerUrl); 
        const products = await response.json(); 

        heroBannerContainer.innerHTML = `<div>
                                            <div style="background-image: url(${products.hero_banner.formats.medium.url})" class="hero-banner"></div> 
                                        </div>` 
    }

    catch(error) {
        displayMessage("error", "An error has occoured", ".hero-banner-container"); 
    }
} 