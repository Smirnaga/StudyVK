'use strict';
let hamburgerElement = document.getElementById('hamburger');
let toppingElement = document.getElementById('Topping');
let priceElement = document.getElementById('price');
let caloriesElement = document.getElementById('calories');
let selectedSize;
let selectedTopping;



const sizes = {
    'big': { price: 100, calories: 50 },
    'average': { price: 75, calories: 30 },
    'small': { price: 50, calories: 20 },
};

const toppings = {
    'cheese' : { price: 10, calories: 20 },
    'potato' : { price: 15, calories: 10 },
    'flavoring' : { price: 15, calories: 0 },
    'mayonnaise' : { price: 20, calories: 5 },
    'salat' : { price: 20, calories: 5 },
};


hamburgerElement.addEventListener('click', onDivclick) ;


function onDivclick(e){
    selectedSize = e.target.dataset.id;
    console.log(selectedSize);
    renderPricehamburger();
} 

toppingElement.addEventListener('click', onSelectChange) ;

function onSelectChange(e){
    selectedTopping = e.target.value;
    console.log(selectedTopping);
    renderPricehamburgerWith();
}

function renderPricehamburger(){
    priceElement.innerHTML = `Price : ${sizes[selectedSize].price }` ;
    caloriesElement.innerHTML =`Calories :  ${sizes[selectedSize].calories}` ;
}

function renderPricehamburgerWith(){
    priceElement.innerHTML = `Price : ${sizes[selectedSize].price + toppings[selectedTopping].price}` ;
    caloriesElement.innerHTML =`Calories :  ${sizes[selectedSize].calories + toppings[selectedTopping].calories}` ;
}