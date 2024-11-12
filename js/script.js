// List of products with ID, title, price, and image URL
const products = [{
    id: 1,
    title: "Leather Coat",
    price: 149.99,
    Image: "https://static.zara.net/assets/public/fded/e3b5/8afa45f9b357/533e37622b3c/04341728814-015-p/04341728814-015-p.jpg?ts=1726156162824&w=750"
},
{
    id: 2,
    title: "Padded overshirt",
    price: 124.99,
    Image: "https://static.zara.net/assets/public/64b0/07fd/6f244d6b8f29/438cd7167418/01063383500-p/01063383500-p.jpg?ts=1730634458999&w=750"
},
{
    id: 3,
    title: "Comfort Jogger",
    price: 89.99,
    Image: "https://static.zara.net/assets/public/d48e/cd3e/372544548671/898197250763/1688716939295/1688716939295.jpg?ts=1693927295199&w=750"
},
{
    id: 4,
    title: "Sequinner Dress",
    price: 164.99,
    Image: "https://static.zara.net/assets/public/de5a/f2e5/99734230b944/6b5ec2e1a543/05536131401-a1/05536131401-a1.jpg?ts=1730633679450&w=750"
},
{
    id: 5,
    title: "Mini Dress",
    price: 124.99,
    Image: "https://static.zara.net/assets/public/b9ba/58fc/d8974ce49e82/f9770616f86f/09598230401-p/09598230401-p.jpg?ts=1730643515042&w=750"
},
{
    id: 6,
    title: "Slim Fit Comfort Trousers",
    price: 154.99,
    Image: "https://static.zara.net/assets/public/9dbc/e391/909347298808/b8c340b32708/06861441800-p/06861441800-p.jpg?ts=1730623728236&w=750"
},
{
    id: 7,
    title: "Valvet Overshirt",
    price: 114.99,
    Image: "https://static.zara.net/assets/public/68a7/b6bd/7237419daf1e/feeb10739e26/05320422800-p/05320422800-p.jpg?ts=1730642380735&w=750"
},
{
    id: 8,
    title: "Trousers With Double Pleat",
    price: 129.99,
    Image: "https://static.zara.net/assets/public/ce5e/60a7/b36e442a9211/4b3b7f3f8804/01255556753-015-p/01255556753-015-p.jpg?ts=1730387012662&w=750"
}
];

// Elements in HTML where products, cart items, and cart total are displayed
const productList = document.getElementById('productList');
const cartItemsElement = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');
const cartIcon = document.getElementById('cart-icon');


// Retrieve saved cart items from localStorage or initialize as an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to render products on the page
function renderProducts() {
// Display each product with title, price, image, and "Add to cart" button
productList.innerHTML = products.map(product => `
    <div class="product">
        <img src="${product.Image}" alt="${product.title}" class="product-img">
        <div class="product-info">
            <h2 class="product-title">${product.title}</h2>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <a href="#" class="add-to-cart" data-id="${product.id}">Add to cart</a>
        </div>
    </div>
`).join('');
// Add event listeners for "Add to cart" buttons
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener('click', addToCart);
});
}




//Add product to cart
function addToCart(event) {
event.preventDefault();
const productID = parseInt(event.target.dataset.id);
const product = products.find(p => p.id === productID);

if (product) {
    const existingItem = cart.find(item => item.id === productID);
    // Increase quantity if item is already in cart, add it again
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    // Re-render cart, update quantity badge, and save to localStorage
    renderCartItems();
    updateCartQuantity();
    saveToLocalStorage();
}
}




// Function to save cart to localStorage
function saveToLocalStorage() {
localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to render cart items in the cart section
function renderCartItems() {
if (cartItemsElement && cartTotalElement) {
    // Display each cart item with title, quantity, and remove button
    cartItemsElement.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.Image}" alt="${item.title}">
            <div class="cart-item-info">
                <h2 class="cart-item-title">${item.title}</h2>
                <input class="cart-item-quantity" type="number" min="1" value="${item.quantity}" data-id="${item.id}">
            </div>
            <h2 class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</h2>
            <button class="remove-from-cart" data-id="${item.id}">Remove</button>
        </div>
    `).join("");
    // Calculate and display total price for cart items
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    cartTotalElement.innerHTML = `Total: $${total.toFixed(2)}`;
    // Event listeners for quantity change and remove buttons
    document.querySelectorAll('.cart-item-quantity').forEach(input => {
        input.addEventListener('change', updateQuantity);
    });
    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}
}

// Function to update quantity of an item in cart
function updateQuantity(event) {
const itemID = parseInt(event.target.dataset.id);
const newQuantity = parseInt(event.target.value);


// Update item quantity if it's valid, otherwise remove item if quantity is <= 0
const item = cart.find(item => item.id === itemID);
if (item && newQuantity > 0) {
    item.quantity = newQuantity;
} else if (item && newQuantity <= 0) {
    removeFromCart(event);
}

// Re-render cart, update quantity badge, and save to localStorage
renderCartItems();
updateCartQuantity();
saveToLocalStorage();
}

// Function to remove item from cart
function removeFromCart(event) {
const itemID = parseInt(event.target.dataset.id);
cart = cart.filter(item => item.id !== itemID); // Remove item by filtering cart
renderCartItems(); // Re-render cart
updateCartQuantity(); // Update cart icon quantity badge
saveToLocalStorage(); // Save changes to localStorage
}

// Function to update cart icon badge with total quantity of items in cart
function updateCartQuantity() {
const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
if (cartIcon) cartIcon.setAttribute('data-quantity', totalQuantity);
}

// Render cart items if on cart page, otherwise render products list
if (window.location.pathname.includes('cart.html')) {
renderCartItems();
} else {
renderProducts();
}


// Navbar and menu icon toggle functionality
const menuIcon = document.getElementById("menu-icon");
const navbar = document.querySelector(".navbar");

// Toggle navbar and icon style on menu icon click
menuIcon.addEventListener("click", () => {
navbar.classList.toggle("navbar-active");
menuIcon.classList.toggle("bx-x"); //Change icon to X
});



// slider 
const initSlider = () => {
const imageList = document.querySelector(".slider-wrapper .image-list");
const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

// Handle scrollbar thumb drag
scrollbarThumb.addEventListener("mousedown", (e) => {
    const startX = e.clientX;
    const thumbPosition = scrollbarThumb.offsetLeft;
    const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

    // Update thumb position on mouse move
    const handleMouseMove = (e) => {
        const deltaX = e.clientX - startX;
        const newThumbPosition = thumbPosition + deltaX;

        // Ensure the scrollbar thumb stays within bounds
        const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
        const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

        scrollbarThumb.style.left = `${boundedPosition}px`;
        imageList.scrollLeft = scrollPosition;
    }

    // Remove event listeners on mouse up
    const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    }

    // Add event listeners for drag interaction
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
});

// Slide images according to the slide button clicks
slideButtons.forEach(button => {
    button.addEventListener("click", () => {
        const direction = button.id === "prev-slide" ? -1 : 1;
        const scrollAmount = imageList.clientWidth * direction;
        imageList.scrollBy({
            left: scrollAmount,
            behavior: "smooth"
        });
    });
});

// Show or hide slide buttons based on scroll position
const handleSlideButtons = () => {
    slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
    slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
}

// Update scrollbar thumb position based on image scroll
const updateScrollThumbPosition = () => {
    const scrollPosition = imageList.scrollLeft;
    const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
    scrollbarThumb.style.left = `${thumbPosition}px`;
}

// Call these two functions when image list scrolls
imageList.addEventListener("scroll", () => {
    updateScrollThumbPosition();
    handleSlideButtons();
});
}

window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);