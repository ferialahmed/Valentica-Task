const products = [
  {
    "name": "iPhone 13 Pro",
    "price": "$999.00",
    "image": "https://images.pexels.com/photos/12582008/pexels-photo-12582008.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "added_to_cart": false
  },
  {
    "name":"Samsung Galaxy S21 Ultra",
    "price": "$1199.99",
    "image": "https://images.samsung.com/is/image/samsung/p6pim/levant/galaxy-s21/gallery/levant-galaxy-s21-ultra-5g-g988-371058-sm-g998bzkgmea-thumb-368334301?imwidth=720",
    "added_to_cart": false
  },
  {
    "name": "MacBook Pro M1",
    "price": "$1299.00",
    "image": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp-spacegray-select-202011_GEO_US?wid=892&hei=820&&qlt=80&.v=1603406905000",
    "added_to_cart": false
  },
  {
    "name": "Sony WH-1000XM4",
    "price": "$349.99",
    "image": "http://media.4rgos.it/s/Argos/8136983_R_SET?$Main768$&w=620&h=620",
    "added_to_cart": false
  },
  {
    "name": "Nintendo Switch OLED modal",
    "price": "$349.99",
    "image": "https://assets.nintendo.com/image/upload/f_auto/q_auto/c_fill,w_300/ncom/en_US/switch/site-design-update/hardware-hero-combo",
    "added_to_cart": false
  },
  {
    "name": "Canon EOS R5",
    "price": "$3899.00",
    "image": "https://amateurphotographer.com/wp-content/uploads/sites/7/2022/08/CanonEOSR5_online1.jpg",
    "added_to_cart": false
  }
];
if (!localStorage.getItem('products'))
    localStorage.setItem('products', JSON.stringify(products))
if (!localStorage.getItem('cart')) localStorage.setItem('cart', "[]")

let storeItems = JSON.parse(localStorage.getItem('products'));

let list = document.querySelector('.products-list');

//Creating products card with the quick view modal
storeItems.forEach( product => {
  list.innerHTML += `<li class="item">
    <div class = "card">
      <div>
        <img src = ${product.image} class = "img">
        <button class="quick-view">Quick View</button>
      </div>
      <div>
        <h3> ${product.name} </h3>
        <h4 class = "price" > ${product.price} </h4>
      </div>
      <div class="view-modal">
        
        <div class="modal-container">
            <div class='modal-img-container'> 
              <img src=${product.image} class="modal-img">
            </div>
            <div class = "modal-info">
              <h3>${product.name}</h3>
              <h3 class='modal-price'>${product.price}</h3>
              <button class = "modal-add"> ${product.added_to_cart === false? "Add To Cart": "Remove From Cart"} </button>
            </div>
        </div> 
        <img src = 'icons/close.png' class = 'close'>
      </div>
      <button class = "add"> ${product.added_to_cart === false ? "Add To Cart": "Remove From Cart"} </button>
    </div>
  </li>`
});

let viewmodal = document.querySelectorAll('.view-modal');

//Implementing adding to cart or removing buttons in the product card 
let addingButtons = document.querySelectorAll('.add');
for(let i = 0; i < addingButtons.length; i++)
{
  addingButtons[i].addEventListener('click', () => {
      btnText(i);
      displayCartContent();
  })
}

//Implementing adding to cart or removing buttons in the quick view modal 
let modalAddingButtons = document.querySelectorAll('.modal-add');
for(let i = 0; i < modalAddingButtons.length; i++)
{
  modalAddingButtons[i].addEventListener('click', () => {
      btnText(i);
      displayCartContent();
  })
}


let quickViewBtn = document.querySelectorAll('.quick-view');
for (let i = 0; i < quickViewBtn.length; i++){
  quickViewBtn[i].addEventListener('click', function(){
    quickView(i)
  }
  )  
}

//Close the quick view modal
let closeBtns = document.querySelectorAll('.close');
for (let i = 0; i < closeBtns.length; i++)
{

  closeBtns[i].addEventListener('click', function (){
    viewmodal[i].style.visibility = 'hidden';
    viewmodal[i].style.opacity = 0;
    document.querySelector('.bg').style.visibility = 'hidden';
  })

}

//Updating all places where the products are displayed on adding or removing to cart
function btnText(i){
  storeItems = JSON.parse(localStorage.getItem('products'))
    if (storeItems[i].added_to_cart === false) {

      cartItems(storeItems[i]);
      addingToCart(storeItems[i]);

      storeItems[i].added_to_cart = true; 

      addingButtons[i].textContent = 'Remove From Cart';
      modalAddingButtons[i].textContent = 'Remove From Cart';
    }
    else{

      cartItems(storeItems[i]); 
      addingToCart(storeItems[i]);

      storeItems[i].added_to_cart = false; 

      addingButtons[i].textContent = 'Add To Cart';
      modalAddingButtons[i].textContent = 'Add To Cart';
    }
    localStorage.setItem('products', JSON.stringify(storeItems));
}


//Changing indicator to the number of added_to_cart products
function cartItems (product){
  let quantity = parseInt(localStorage.getItem('quantity'));
  let indicator = document.querySelector('.indicator');
  if(quantity && product.added_to_cart === false) {
    localStorage.setItem('quantity', quantity + 1);
    indicator.textContent = quantity + 1;
  }
  else if (quantity && product.added_to_cart === true){
    localStorage.setItem('quantity', quantity - 1);
    indicator.textContent = quantity - 1;
  }
  else {
    localStorage.setItem('quantity', 1);
    indicator.textContent = 1;
  }
  
}

//Adding or removing product from cart
function addingToCart (product)
{
  let cart = JSON.parse(localStorage.getItem('cart'));
  includedItem = cart.find(item => item.name === product.name);
  
  //check the existence of product in cart to add or remove it
  if (cart && product.added_to_cart === true) cart = cart.filter (item => item.name !== product.name)
  
  else cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
}

//Adding products to cart dropdown menu
function displayCartContent(){
  let cart = JSON.parse(localStorage.getItem('cart'));
  let cartContent = document.querySelector('.cart-content')
  cartContent.innerHTML = '';
  cart.forEach(item => {
    cartContent.innerHTML += `<div class='cart-container'>
    <img src = ${item.image} id='cart-img'>
    <h3 id='item-name'>${item.name}</h3>
    </div>`
    
  })
}

//Displaying quick view modal
function quickView(i){
    viewmodal[i].style.visibility = 'visible';
    viewmodal[i].style.opacity = 1;
    document.querySelector('.bg').style.visibility = 'visible';
}


(function(){
    let quantity = localStorage.getItem('quantity');
    if (quantity) document.querySelector('.indicator').textContent = quantity
})()

displayCartContent();