import { getUsername } from '../utils/localStorage.js';
import { logoutButton } from './logoutButton.js';
import { displayCartNumber } from './displayCartNumber.js';

export default function createMenu() {
	const menuContainer = document.querySelector('#navbar-container');
	const { pathname } = document.location;
	const username = getUsername();

	if (username) {
		menuContainer.innerHTML = `<div class="container-fluid">
					<a class="navbar-brand m-2 pe-2" href="index.html"><h2 style="text-decoration: none; border-bottom:5px solid orange;">ShirTshoP</h2></a>
					<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse" id="navbarSupportedContent">
						<ul class="navbar-nav me-auto mb-2 mb-lg-0">
							<li class="nav-item">
								<a class="nav-link" href="products.html">Shirts</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="about.html">About</a>
							</li>
						</ul>
                        <p class="nav-item m-3" style="color: white;">Logged in as: ${username}</p>
						<div class="btn-group">
							<button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">Control Panel</button>
							<ul class="dropdown-menu dropdown-menu-lg-end">
								<li><a class="dropdown-item" href="add-product.html">Add</a></li>
								<li><a class="dropdown-item" href="products.html">Edit</a></li>
								<li><hr class="dropdown-divider" /></li>
								<li><button id="logoutButton" class="dropdown-item">Log out</button></li>
							</ul>
						</div>
					</div>
				</div>`;
	}

	if (!username) {
		menuContainer.innerHTML = `<div class="container-fluid">
					<a class="navbar-brand m-2 pe-2" href="index.html"><h2 style="text-decoration: none; border-bottom:5px solid orange;">ShirTshoP</h2></a>
					<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse" id="navbarSupportedContent">
						<ul class="navbar-nav me-auto mb-2 mb-lg-0">
							<li class="nav-item">
								<a class="nav-link ${pathname === '/products.html' ? 'active' : ''}" href="products.html">Shirts</a>
							</li>
							<li class="nav-item">
								<a class="nav-link ${pathname === '/about.html' ? 'active' : ''}" href="about.html">About</a>
							</li>
						</ul>
						<div class="d-grid gap-2 d-md-flex justify-content-md-end">
							<a href="cart.html" class="btn btn-primary me-md-2 ${pathname === '/cart.html' ? 'active' : ''}" type="button"><i class="fas fa-shopping-bag"><span class="cart-count ms-2"></span></i></a>
								<a href="login.html" class="btn btn-primary ${pathname === '/cart.html' ? 'active' : ''}" type="button"><i class="fas fa-user"></i></a>
						</div>
					</div>
				</div>`;
	}

	logoutButton();
	displayCartNumber();
}
