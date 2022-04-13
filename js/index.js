//? Declarations:
const addProduct = document.querySelector('.addProduct')
const sellerSection = document.querySelector('.seller')
const closeSeller = document.querySelector('.closeSeller')
const submit = document.querySelector('.submit')
// Object elements
let sellerName = document.querySelector('#sellerName')
let productName = document.querySelector('#productName')
let category = document.querySelector('#category')
let price = document.querySelector('#price')
let imgLink = document.querySelector('#imgLink')
let productsArray = []
let id = 0;

addProduct.addEventListener('click', function(){
    sellerSection.style.display = 'block';
    addProduct.style.display = 'none';
})
closeSeller.addEventListener('click',function(){
    sellerSection.style.display = 'none';
    addProduct.style.display = 'block';
})

submit.addEventListener('click', fillObject)
function fillObject(e){
    e.preventDefault()
let productObject = {}
productObject.id = id+= 1
productObject.sellerName = sellerName.value
productObject.productName = productName.value
productObject.category = category.value
productObject.price = price.value
productObject.imgLink = imgLink.value
productObject.pieces = 0
productsArray.push(productObject)
localStorage.setItem('key', JSON.stringify(productsArray))
}



