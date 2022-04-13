//? Declarations:
const addProduct = document.querySelector('.addProduct')
const sellerSection = document.querySelector('.seller')
const closeSeller = document.querySelector('.closeSeller')
const submit = document.querySelector('.submit')
let buyer = document.querySelector('.buyer');
// Object elements
let sellerName = document.querySelector('#sellerName')
let productName = document.querySelector('#productName')
let category = document.querySelector('#category')
let price = document.querySelector('#price')
let imgLink = document.querySelector('#imgLink')
let productsArray1 = [{
    "id": 1, "sellerName": "a", "productName": "a",
    "category": "volvo", "price": "a", "imgLink": "https://i.pinimg.com/originals/ec/5d/5d/ec5d5df9a5f7a37f3b1dd6e5ce993709.jpg", "qty": 0
}, {
    "id": 2, "sellerName": "b", "productName": "b",
    "category": "volvo", "price": "a", "imgLink": "https://i.pinimg.com/originals/ec/5d/5d/ec5d5df9a5f7a37f3b1dd6e5ce993709.jpg", "qty": 0
}]
let productsArray2 = []

let id = 0;
localStorage.setItem('productsKey', JSON.stringify(productsArray1))

addProduct.addEventListener('click', function () {
    sellerSection.style.display = 'block';
    addProduct.style.display = 'none';
})
closeSeller.addEventListener('click', function () {
    sellerSection.style.display = 'none';
    addProduct.style.display = 'block';
})

submit.addEventListener('click', fillObject)
function fillObject(e) {
    e.preventDefault()
    // let a = [];
    let productObject = {};
    productObject.id = id += 1;
    productObject.sellerName = sellerName.value;
    productObject.productName = productName.value;
    productObject.category = category.value;
    productObject.price = price.value;
    productObject.imgLink = imgLink.value;
    productObject.qty = 0;
    productsArray2.push(productObject);
    allProductsArray = productsArray1.concat(productsArray2);
    localStorage.setItem('allKey', JSON.stringify(allProductsArray));
    creatCard(buyer, productsArray2);
}


function creatCard(section, array) {
    array.forEach(element => {

        let card = document.createElement('div');
        card.classList.add('card');
        section.appendChild(card);

        let cardImage = document.createElement('img');
        cardImage.setAttribute('src', element.imgLink)
        card.appendChild(cardImage);

        let cardTitle = document.createElement('h3');
        card.appendChild(cardTitle);
        cardTitle.textContent = element.productName;

        let addToCartBtn = document.createElement('button');
        card.appendChild(addToCartBtn);
        addToCartBtn.textContent = 'Add';

        let cardBtns = document.createElement('div');
        cardBtns.classList.add('cardBtns');
        card.appendChild(cardBtns);

        let qty = document.createElement('div');
        qty.classList.add('qty');
        cardBtns.appendChild(qty);

        let qtyMinus = document.createElement('button');
        qtyMinus.textContent = '-';
        qty.appendChild(qtyMinus);

        let qtyCount = document.createElement('span');
        qtyCount.textContent = element.qty;
        qty.appendChild(qtyCount);

        let qtyPlus = document.createElement('button');
        qtyPlus.textContent = '+';
        qty.appendChild(qtyPlus);


        let sellerBtns = document.createElement('div');
        sellerBtns.classList.add('sellerBtns');
        cardBtns.appendChild(sellerBtns);

        let sellerRemove = document.createElement('button');
        sellerRemove.textContent = 'Remove';
        sellerBtns.appendChild(sellerRemove);

        let sellerEdit = document.createElement('button');
        sellerEdit.textContent = 'Edit';
        sellerBtns.appendChild(sellerEdit);
    });
}

creatCard(buyer, productsArray1);