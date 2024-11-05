const products = [
    {
        id: 1,
        title: "Leather Coat",
        price: 149.99,
        Image:"https://static.zara.net/assets/public/fded/e3b5/8afa45f9b357/533e37622b3c/04341728814-015-p/04341728814-015-p.jpg?ts=1726156162824&w=750",
    },
    {
        id: 2,
        title: "Padded overshirt",
        price: 124.99,
        Image:"https://static.zara.net/assets/public/64b0/07fd/6f244d6b8f29/438cd7167418/01063383500-p/01063383500-p.jpg?ts=1730634458999&w=750",
    },
    {
        id: 3,
        title: "Comfort Jogger",
        price: 89.99,
        Image:"https://static.zara.net/assets/public/d48e/cd3e/372544548671/898197250763/1688716939295/1688716939295.jpg?ts=1693927295199&w=750",
    },
    {
        id: 4,
        title: "Sequinner Dress",
        price: 164.99,
        Image:"https://static.zara.net/assets/public/de5a/f2e5/99734230b944/6b5ec2e1a543/05536131401-a1/05536131401-a1.jpg?ts=1730633679450&w=750",
    },
    {
        id: 5,
        title: "Mini Dress",
        price: 124.99,
        Image:"https://static.zara.net/assets/public/b9ba/58fc/d8974ce49e82/f9770616f86f/09598230401-p/09598230401-p.jpg?ts=1730643515042&w=750",
    },
    {
        id: 6,
        title: "Slim Fit Comfort Trousers",
        price: 154.99,
        Image:"https://static.zara.net/assets/public/9dbc/e391/909347298808/b8c340b32708/06861441800-p/06861441800-p.jpg?ts=1730623728236&w=750",
    },
    {
        id: 7,
        title: "Valvet Overshirt",
        price: 114.99,
        Image:"https://static.zara.net/assets/public/68a7/b6bd/7237419daf1e/feeb10739e26/05320422800-p/05320422800-p.jpg?ts=1730642380735&w=750",
    },
    {
        id: 8,
        title: "Trousers With Double Pleat",
        price: 129.99,
        Image:"https://static.zara.net/assets/public/ce5e/60a7/b36e442a9211/4b3b7f3f8804/01255556753-015-p/01255556753-015-p.jpg?ts=1730387012662&w=750",
    },

]




// product list

const productList = document.getElementById('productList')
const cartItemsElement = document.getElementById('cartItems')
const cartTotalElement = document.getElementById('cartTotal')

// local storage

let cart=JSON.parse(localStorage.getItem('cart')) || [];


// render prodicts

function renderProducts() {
    productList.innerHTML = products
        .map(
            (product) => `
                <div class="product">
                    <img src="${product.Image}" alt="${product.title}" class="product-img">
                    <div class="product-info">
                        <h2 class="product-title">${product.title}</h2>
                        <p class="product-price">$${product.price.toFixed(2)}</p>
                        <a href="#" class="add-to-cart" data-id="${product.id}">Add to cart</a>
                    </div>
                </div>
            `
        )
        .join(''); 
}

//add to cart from button
const addToCartButton = document.getElementsByClassName("add-to-cart");
for (let i = 0; i<addToCartButton.length; i++){
    const addToCartButton = addToCartButton[i]
    addToCartButton.addEventListener('click', addToCart)
}
// add to cart 
function addToCart(event){
    const productID = parseInt(event.target.dataset.id);
    const product = products.find((product) => product.id === productID)

    if(product){
        const existingItem = cart.find((item) => item.id === productID);

    if(existingitem){
        existingItem.quantity++;
    }else{
        const cartItem={
            id: product.id,
            title: product.title,
            price: product.price,
            Image: product.Image,
            quantity:1,
        };
        cart.push(cartItem);
    }
    renderCartItems();
    }
}


// render but inside cart

function renderCartItems(){
    cartItemsElement.innerHTML = cart
    .map(
        (item)=>
        `
                    <div class="cart-item">
                    <img src="${item.Image}" alt="${item.title}">
                    <div class="cart-item-info">
                        <h2 class="cart-item-title">${item.title}</h2>
                        <input 
                        class="cart-item-quantity" 
                        type="number" 
                        name="" 
                        min="1" 
                        value="${item.quantity}" 
                        data-id="${item.id}">
                    </div>
                    <h2 class="cart-item-price">$${item.price}</h2>
                    <button><div class="remove-from-cart" data-id="${item.id}">Remove</div></button>
                </div>
        `
    )
    .join("")
}



if(window.location.pathname.includes('cart.html')){
    renderCartItems();
}else{
    renderProducts();
}



    renderProducts();
    renderCartItems();