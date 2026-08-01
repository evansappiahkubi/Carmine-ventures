console.log("JavaScript is working!");
// Select the hero section
const hero = document.querySelector(".hero");

// Only run the slider if a hero exists
if (hero) {

    // List of hero images
    const images = [
        "images/hero1.jpg",
        "images/hero2.jpg",
        "images/hero3.jpg",
        "images/hero4.jpg"
    ];

    let currentImage = 0;

    function changeHero() {

        hero.style.opacity = "0";

        setTimeout(() => {

            currentImage++;

            if (currentImage >= images.length) {
                currentImage = 0;
            }

            hero.style.backgroundImage =
                `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)),
                url('${images[currentImage]}')`;

            hero.style.opacity = "1";

        }, 800);

    }

    setInterval(changeHero, 4000);

}

// Change every 4 seconds
setInterval(changeHero, 4000);
const searchBox = document.getElementById("searchBox");

if(searchBox){

    searchBox.addEventListener("keyup", function(){

        const search = searchBox.value.toLowerCase();

        const products =
        document.querySelectorAll(".searchable");

        products.forEach(product=>{

            const name =
            product.dataset.name.toLowerCase();

            if(name.includes(search)){
                product.style.display="block";
            }else{
                product.style.display="none";
            }

        });

    });

}
// Hamburger Menu

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}
// ==========================
// Shopping Cart
// ==========================

const cartButtons = document.querySelectorAll(".cart-btn");

cartButtons.forEach(button => {

    button.addEventListener("click", () => {

        const product = {
            name: button.dataset.name,
            price: Number(button.dataset.price),
            image:button.dataset.image
        };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart.push(product);

        localStorage.setItem("cart", JSON.stringify(cart));

        alert(product.name + " added to cart!");
    });

});
// ==========================
// Display Cart
// ==========================

const cartItems = document.getElementById("cart-items");

if(cartItems){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if(cart.length === 0){

        cartItems.innerHTML = "<p>Your cart is currently empty.</p>";

    }else{

        cartItems.innerHTML = "";

        let total = 0;

        const groupedCart = {};

cart.forEach(product =>  {

    if(groupedCart[product.name]){

        groupedCart[product.name].quantity++;

    }else{

        groupedCart[product.name] = {

            price: product.price,
            image: product.image,
            quantity: 1

        };

    }

}); 
for(const name in groupedCart){

    const item = groupedCart[name];

    const subtotal = item.price * item.quantity;

    total += subtotal;

   cartItems.innerHTML += `

<div class="cart-product">

    <img
        src="${item.image}"
        class="cart-image"
        alt="${name}">

    <div class="cart-details">

        <h3>${name}</h3>

        <p>Price: GH₵${item.price.toLocaleString()}</p>

        <p>Quantity: ${item.quantity}</p>

        <p>Subtotal: GH₵${subtotal.toLocaleString()}</p>

        <button class="minus-btn"
        data-name="${name}">
    ➖
</button>

<button class="plus-btn"
        data-name="${name}">
    ➕
</button>

        <button class="remove-btn"
                data-name="${name}">
            🗑 Remove
        </button>

    </div>

</diV>

`;

}


        document.querySelector(".cart-summary h2").textContent =
        "Total: GH₵" + total.toLocaleString(); }
}
// ==========================
// Remove Product
// ==========================

const removeButtons = document.querySelectorAll(".remove-btn");

removeButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        const productName = button.dataset.name;

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart = cart.filter(product => product.name !== productName);

        localStorage.setItem("cart", JSON.stringify(cart));

        location.reload();

    });

});
// ==========================
// Increase Quantity
// ==========================

const plusButtons = document.querySelectorAll(".plus-btn");

plusButtons.forEach(button => {

    button.addEventListener("click", () => {

        const productName = button.dataset.name;

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const product = cart.find(item => item.name === productName);

        if(product){

            cart.push({
                name: product.name,
                price: product.price,
                image: product.Image

            });

        }

        localStorage.setItem("cart", JSON.stringify(cart));

        location.reload();

    });

});
// ==========================
// Decrease Quantity
// ==========================

const minusButtons = document.querySelectorAll(".minus-btn");

minusButtons.forEach(button => {

    button.addEventListener("click", () => {

        const productName = button.dataset.name;

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Find the first matching product
        const index = cart.findIndex(item => item.name === productName);

        if(index !== -1){

            // Remove only ONE item
            cart.splice(index, 1);

        }

        localStorage.setItem("cart", JSON.stringify(cart));

        location.reload();

    });

});
// ==========================
// WhatsApp Checkout
// ==========================

const checkoutBtn = document.getElementById("checkout-btn");

if(checkoutBtn){

    checkoutBtn.addEventListener("click",()=> {

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        if(cart.length === 0){

            alert("Your cart is empty!");

            return;

        }

        const groupedCart = {};

        let total = 0;

        cart.forEach(product=>{

            if(groupedCart[product.name]){

                groupedCart[product.name].quantity++;

            }else{

                groupedCart[product.name]={

                    price:product.price,

                    quantity:1

                };

            }

        });

 let message = `Hello Carmine Ventures,

I would like to place the following order:

`;

for (const name in groupedCart) {

    const item = groupedCart[name];
    const subtotal = item.price * item.quantity;

    total += subtotal;

    message += `• ${name} x ${item.quantity} - GH₵${subtotal.toLocaleString()}
`;
}

message += `
-------------------------
Total: GH₵${total.toLocaleString()}

Please let me know if these items are available.

Thank you.`;

window.open(
    "https://wa.me/233504368692?text=" + encodeURIComponent(message),
  "_blank"
);
    });
}
// ==========================
// Cart Counter
// ==========================

const cartCount = document.getElementById("cart-count");

if (cartCount) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartCount.textContent = cart.length;

}
// ==========================
// Product Details
// ==========================

const viewButtons = document.querySelectorAll(".view-btn");

viewButtons.forEach(button => {

    button.addEventListener("click", () => {

        const product = {

    name: button.dataset.name,

    price: button.dataset.price,

    image: button.dataset.image,

    description: button.dataset.description,

    features: button.dataset.features

};
localStorage.setItem("selectedProduct", JSON.stringify(product));

        window.location.href = "product.html";
    });
});
// ==========================
// Load Selected Product
// ==========================

const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));

if(selectedProduct){

    const image = document.getElementById("product-image");
    const name = document.getElementById("product-name");
    const price = document.getElementById("product-price");
    const description = document.getElementById("product-description");

    if(image){
        image.src = selectedProduct.image;
        image.alt = selectedProduct.name;
    }

    if(name){
        name.textContent = selectedProduct.name;
    }

    if(price){
        price.textContent = "GH₵" + Number(selectedProduct.price).toLocaleString();
    }

    if(description){
        description.textContent = selectedProduct.description;
    }

}
const featureList = document.getElementById("product-features");

if(featureList){

    featureList.innerHTML = "";

    const features = selectedProduct.features.split("|");

    features.forEach(feature=>{

        featureList.innerHTML += `<li>✓ ${feature}</li>`;

    });

}