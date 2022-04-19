//! --------------------------------Declarations--------------------------------
// containers
const openSeller = document.querySelector(".openSeller");
const sellerSection = document.querySelector(".seller");
const closeSeller = document.querySelector(".closeSeller");
const submit = document.querySelector(".submit");
const buyer = document.querySelector(".buyer");
const cart = document.querySelector(".cart");
let totalPrice = document.querySelector(".totalPrice");
let productsCount = document.querySelector(".productsCount");
// object
let sellerName = document.querySelector("#sellerName");
let productName = document.querySelector("#productName");
let category = document.querySelector("#category");
let price = document.querySelector("#price");
let imgLink = document.querySelector("#imgLink");
// categories
const computer = document.querySelector(".computer");
const tablet = document.querySelector(".tablet");
const mobile = document.querySelector(".mobile");
const fablet = document.querySelector(".fablet");
const clearFilterBtn = document.querySelector(".clearFilterBtn");
// search
const searchInput = document.querySelector(".searchInput");
const searchBtn = document.querySelector(".searchBtn");
// array of static products objects
let staticArray = [
  {
    id: 1,
    sellerName: "Ahmed",
    productName: "iPhone",
    category: "Mobile",
    price: "1200$",
    imgLink: "",
    qty: 0,
  },
  {
    id: 2,
    sellerName: "Ali",
    productName: "MSI",
    category: "Computer",
    price: "1500$",
    imgLink: "",
    qty: 0,
  },
];
let productsKey;
let filterKey;
let cartArray = [];
let id = 10;
let pCount = 0

//! --------------------------------Build Standard Product Card--------------------------------
function createCard(section, product, price, quantity) {
  let card = document.createElement("div");
  card.classList.add("card");
  section.appendChild(card);

  let cardImage = document.createElement("img");
  cardImage.setAttribute("src", "");
  card.appendChild(cardImage);

  let cardTitle = document.createElement("h3");
  card.appendChild(cardTitle);
  cardTitle.classList.add("productName");
  cardTitle.textContent = product;

  const productPrice = document.createElement("p");
  card.appendChild(productPrice);
  card.classList.add("price");
  productPrice.textContent = price;

  let addToCartBtn = document.createElement("button");
  card.appendChild(addToCartBtn);
  addToCartBtn.classList.add('addToCart')
  addToCartBtn.textContent = "Add to Cart";
  
  let cardBtns = document.createElement("div");
  cardBtns.classList.add("cardBtns");
  card.appendChild(cardBtns);

  let qty = document.createElement("div");
  qty.classList.add("qty");
  cardBtns.appendChild(qty);

  let qtyMinus = document.createElement("button");
  qtyMinus.textContent = "-";
  qty.appendChild(qtyMinus);

  let qtyCount = document.createElement("span");
  qtyCount.textContent = quantity;
  qty.appendChild(qtyCount);

  let qtyPlus = document.createElement("button");
  qtyPlus.textContent = "+";
  qty.appendChild(qtyPlus);

  let sellerBtns = document.createElement("div");
  sellerBtns.classList.add("sellerBtns");
  cardBtns.appendChild(sellerBtns);

  let sellerRemove = document.createElement("button");
  sellerRemove.textContent = "Remove";
  sellerRemove.classList.add("remove");
  sellerBtns.appendChild(sellerRemove);

  let sellerEdit = document.createElement("button");
  sellerEdit.textContent = "Edit";
  sellerBtns.appendChild(sellerEdit);

  //! --------------------------------Distribute Buttons & Functions--------------------------------
  //? Remove Function
  sellerRemove.addEventListener("click", removeFunction);
  function removeFunction() {
    // 1 remove function of Cart Section
    if (section === cart) {
      function removeFromCart() {
        card.remove();
        productsCount.textContent--;
        localStorage.setItem("countKey", productsCount.textContent);
        cartArray = JSON.parse(localStorage.getItem("cartKey"));
        // removedTarget = e.target.parentElement.parentElement.previousElementSibling.previousElementSibling
        cartArray.forEach((e, i) => {
          if (cardTitle.textContent == e.productName) cartArray.splice(i, 1);
        });
        localStorage.setItem("cartKey", JSON.stringify(cartArray));
      }
      removeFromCart();
    }
    // 2 remove function of Seller Section
    //  else if (section === seller){
    //     function removeFromSeller (){
    //         // card.remove()
    //         // sellerArray = JSON.parse(localStorage.getItem('sellerKey'))
    //         // // removedTarget = e.target.parentElement.parentElement.previousElementSibling.previousElementSibling
    //         // sellerArray.forEach((e, i)=>{
    //         //     if(cardTitle.textContent == e.sellerName)
    //         //     sellerArray.splice(i, 1)
    //         // })
    //         // localStorage.setItem('sellerKey', JSON.stringify(sellerArray))
    //     }
    //     removeFromSeller()
    // }
  }

  // //? Edit Function
  // sellerEdit.addEventListener("click", editProduct);
  // function editProduct() {
  //   console.log("aaa");
  // }

  //? show, disable buttons accordingly
  if (section === buyer) {
    cardBtns.style.display = "none";
  } else if (section === cart) {
    addToCartBtn.style.display = "none";
    sellerEdit.style.display = "none";
  }
} // End DOM

//! --------------------------------Buyer Section--------------------------------
// show static products

staticArray.forEach((e) => {
  createCard(buyer, e.productName, e.price);
});
let addToCartBtn = document.querySelectorAll('.addToCart')
  for(let i = 0; i<addToCartBtn.length; i++){
    addToCartBtn[i].addEventListener("click", addToCart);
  }

// show seller form
openSeller.addEventListener("click", function () {
  sellerSection.style.display = "block";
  openSeller.style.display = "none";
});
// close seller form
closeSeller.addEventListener("click", function () {
  sellerSection.style.display = "none";
  openSeller.style.display = "block";
  // closeSeller.style.display = 'none';
});
//? Add New Products
submit.addEventListener("click", addProduct);
function addProduct(e) {
  e.preventDefault();
  // first remove old static products
  deleteCards();
  if (JSON.parse(localStorage.getItem("cartKey"))) {
        cartKey = JSON.parse(localStorage.getItem("cartKey"));
        cartKey.forEach((e) => createCard(cart, e.productName, e.price))
  }
  // fill the product objects by seller form info
  let productObject = {};
  productObject.id = id += 1;
  productObject.sellerName = sellerName.value;
  productObject.productName = productName.value;
  productObject.category = category.value;
  productObject.price = price.value;
  productObject.imgLink = imgLink.value;
  productObject.qty = 0;
  productObject.flag = "seller";
  // push new products to static (combined)
  staticArray.push(productObject);
  // show combined products
  staticArray.forEach((e) => {
    createCard(buyer, e.productName, e.price);
  });
  // set combined products into local storage

  let addToCartBtn = document.querySelectorAll('.addToCart')
  for(let i = 0; i<addToCartBtn.length; i++){
    addToCartBtn[i].addEventListener("click", addToCart);
  }
  saveToLocal();
}

//! --------------------------------Category Filtering Function--------------------------------
computer.addEventListener("click", () => filterCat(computer));
tablet.addEventListener("click", () => filterCat(tablet));
mobile.addEventListener("click", () => filterCat(mobile));
fablet.addEventListener("click", () => filterCat(fablet));
function filterCat(category) {
  // if static products is not storaged, save them first.
  if (!productsKey) {
    saveToLocal();
  }
  // filter products according to local not cards
  productsKey = JSON.parse(localStorage.getItem("productsKey"));
  let filterArray = productsKey.filter((e) => {
    return e.category === category.textContent;
  });
  deleteCards();
  // show only new filter
  filterArray.forEach((e) => createCard(buyer, e.productName, e.price));
  filterKey = localStorage.setItem("filterKey", JSON.stringify(filterArray));
  // if (JSON.parse(localStorage.getItem("cartKey"))) {
  //   cartKey = JSON.parse(localStorage.getItem("cartKey"));
  //   cartKey.forEach((e) => createCard(cart, e.productName, e.price))
  // }
}

// clear filters
clearFilterBtn.addEventListener("click", clearFilter);
function clearFilter() {
  deleteCards();
  // clear filterKey
  localStorage.removeItem("filterKey");
  // reCreate all products
  productsKey = JSON.parse(localStorage.getItem("productsKey"));
  productsKey.forEach((e) => {
    createCard(buyer, e.productName, e.price);
  });
}

//! --------------------------------SEARCH--------------------------------
searchBtn.addEventListener("click", searchProduct);
function searchProduct() {
  if (!productsKey) {
    saveToLocal();
  }
  productsKey = JSON.parse(localStorage.getItem("productsKey"));
  let searchArray = productsKey.filter((e) => {
    return e.productName === searchInput.value;
  });
  deleteCards();
  searchArray.forEach((e) => createCard(buyer, e.productName, e.price));
  filterKey = localStorage.setItem("filterKey", JSON.stringify(searchArray));
  searchInput.value = "";
}

//! --------------------------------Card Buttons Functions--------------------------------
function addToCart(e) {
  if (!productsKey) {
    saveToLocal();
  }
  pCount += 1
  productsCount.textContent = pCount;
  let targetCard =
    e.target.previousElementSibling.previousElementSibling.textContent;
  productsKey = JSON.parse(localStorage.getItem("productsKey"));
  productsKey
    .filter((e) => {
      if (targetCard === e.productName) {
        cartArray.push(e);
      }
      return targetCard === e.productName;
    })
    .forEach((e) => createCard(cart, e.productName, e.price));
  localStorage.setItem("cartKey", JSON.stringify(cartArray));
  localStorage.setItem("countKey", pCount);
} // end AddToCart Fun

//! --------------------------------Save to Local Storage--------------------------------
function saveToLocal() {
  productsKey = localStorage.setItem(
    "productsKey",
    JSON.stringify(staticArray)
  );
}

//! --------------------------------Delete Cards--------------------------------
function deleteCards() {
  let currentCards = document.querySelectorAll(".card");
  for (let i = 0; i < currentCards.length; i++) {
      currentCards[i].remove();
  }
}

//! --------------------------------onReload Function--------------------------------
document.addEventListener("DOMContentLoaded", onReload);
function onReload() {
  // if filterKey exists, show them only
  if (JSON.parse(localStorage.getItem("filterKey"))) {
    deleteCards();
    filterKey = JSON.parse(localStorage.getItem("filterKey"));
    filterKey.forEach((e) => createCard(buyer, e.productName, e.price));
  } else {
    // if localStorage not existed, do nothing (static dom will be already built)
    if (!JSON.parse(localStorage.getItem("productsKey"))) return;
    // else... remove static, rebuild combined products
    deleteCards();
    productsKey = JSON.parse(localStorage.getItem("productsKey"));
    productsKey.forEach((e) => {
      createCard(buyer, e.productName, e.price);
    });
  }
  // if cartKey exists, re-create it
  
  if (JSON.parse(localStorage.getItem("cartKey"))) {
    cartKey = JSON.parse(localStorage.getItem("cartKey"));
    cartKey.forEach((e) => createCard(cart, e.productName, e.price))
    countKey = JSON.parse(localStorage.getItem("countKey"));
    productsCount.textContent = countKey;
    let addToCartBtn = document.querySelectorAll('.addToCart')
    for(let i = 0; i<addToCartBtn.length; i++){
    addToCartBtn[i].addEventListener("click", cartIssue);
  }
  function cartIssue(e){
    let targetCard =
    e.target.previousElementSibling.previousElementSibling.textContent;
    productsKey = JSON.parse(localStorage.getItem("productsKey"));
    productsKey
    .filter((e) => {
      if (targetCard === e.productName) {
        cartKey.push(e);
      }
      return targetCard === e.productName;
    })
    .forEach((e) => createCard(cart, e.productName, e.price));
  localStorage.setItem("cartKey", JSON.stringify(cartKey));
  countKey += 1
  productsCount.textContent = countKey;
  localStorage.setItem('countKey', countKey)
  }
  } // end cartKey on reload
 
} // End of reload function
