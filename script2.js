// Carousel script 
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

//Product Display
let content = document.getElementsByClassName("content");
let mainContainer = document.getElementById("mainContainer");
let name = document.getElementsByClassName("name");
let price = document.getElementsByClassName("price");
let image = document.getElementsByClassName("image");
let bows = [
    { name: "Sky Patterned Bow",price:1280, image: "Final1.jpg", inCart: 0 },
    { name: "Wolfie Bow", price:2150, image: "Final2.jpg", inCart: 1 },
    { name: "Crow Bow",price:1000, image: "Final3.jpg", inCart: 2 },
    { name: "Party Bow",price:1150, image: "Final4.jpg", inCart: 3 },
    { name: "Rawr Bow",price:1060, image: "Final5.jpg", inCart: 0 },
    { name: "Ice Bow", price:3060, image: "Final6.jpg", inCart: 0 },
];

// logic for loading product details
function appendDivs() {
    for (let index = 0; index < bows.length; index++) {
        mainContainer.innerHTML += ` <div class="content">
        <img class="image" src="${bows[index].image}" alt="This is a picture.">
        <h3 class="name">${bows[index].name}</h3>
        <p class="price">$${bows[index].price}</p>
        <a href="#" class="add-cart cart1">Add to cart<i class="fa fa-cart-plus"></i></a>
     
        </div>`;
        console.log("The number of cart is", document.querySelectorAll(".add-cart"));
    }

    let carts = document.querySelectorAll(".add-cart");

    for (let index = 0; index < carts.length; index++) {
        carts[index].addEventListener("click", () => {
            cartNumbers(bows[index]);
            totalCost(bows[index]);
            alert("Added to Cart");
            location.reload();
        })

    }
}

let carts = document.querySelectorAll(".add-cart");

for (let index = 0; index < carts.length; index++) {
    carts[index].addEventListener("click", () => {
        cartNumbers(bows[index]);
        totalCost(bows[index]);
        location.reload();
    })

}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem("cartNumbers");
    if (productNumbers) {
        document.querySelector(".cart span").textContent = productNumbers;
    }
}

function cartNumbers(bows) {
    let productNumbers = localStorage.getItem("cartNumbers");
    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector(".cart span").textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector(".cart span").textContent = 1;
    }
    setItems(bows);
}

function setItems(bows) {
    let cartItems = localStorage.getItem("bowsInCart");
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[bows.name] == undefined) {
            cartItems = {
                ...cartItems,
                [bows.name]: bows
            }
        }
        cartItems[bows.name].inCart += 1;
    } else {
        bows.inCart = 1;
        cartItems = {
            [bows.name]: bows
        }
    }
    localStorage.setItem("bowsInCart", JSON.stringify(cartItems));
}

function totalCost(bows) {
    // console.log("The product price is", bows.price);
    let cartCost = localStorage.getItem("totalCost");
    // console.log("My cartCost is", cartCost);
    // console.log(typeof cartCost);

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + bows.price);
    } else {
        localStorage.setItem("totalCost", bows.price);
    }

}

function displayCart() {
    let cartItems = localStorage.getItem("bowsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem("totalCost");
    if (cartItems && modal) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            // var cart1=parseInt(item.inCart);
            // let cart2="item.price";
            // let num1=parseInt(cart2);
            // let finalcart2=cart1*num1;
            productContainer.innerHTML += `
            <div class ="product">
                <i class="fa fa-times"></i>  
                <img src="${item.image}">
                <span>Name: ${item.name}</span>
            </div>
            <div class="product-price">Price: ${item.price}.00</div>
            <div class="product-quantity">Quantity:
            <i class="fa fa-minus"></i>
            <span>${item.inCart}</span>
            <i class="fa fa-plus"></i>
            `;

        });
        // productContainer.innerHTML += `
        //     <div class="basketTotalContainer">
        //         <h4 class ="basketTotalTitle">
        //             Basket Total
        //         </h4>
        //         <h4 class = "basketTotal">
        //             $${cartCost}.00`
    }
}

// modal script 
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

appendDivs();
onLoadCartNumbers();
displayCart();

