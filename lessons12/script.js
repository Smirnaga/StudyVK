'use strict';
let smallHamburgerElement = document.getElementById('small');
let averageHamburgerElement = document.getElementById('average');
let bigHamburgerElement = document.getElementById('big');
let toppingElement = document.getElementById('Topping');
let priceElement = document.getElementById('price');
let caloriesElement = document.getElementById('calories');
let cheeseElement = document.getElementById('cheese');


class Hamburger {
    constructor (price,calories){
        this.price = price;
        this.calories = calories;
        this.toppings = []; 
    }

    static cheese = { price: 10, calories: 20 };
    static salat = { price: 20, calories: 5 };
    static potato = { price: 15, calories: 10 };
    static flavoring = { price: 15, calories: 0 };
    static mayonnaise = { price: 20, calories: 5 };

    add(topping) {
        this.toppings.push(topping);
    } 

}

const smallHamburger = new Hamburger('50 ','20 ');
const averageHamburger = new Hamburger('75 ','30 ');
const bigHamburger = new Hamburger('100 ','40 '); 

class Topping {
    constructor(price,calories){
        this.price = price;
        this.calories = calories;
    }
}

const cheese = new Topping('10','20');
const salat = new Topping('20','5');
const potato = new Topping('15','10');
const flavoring = new Topping('15','0');
const mayonnaise = new Topping('20','5');


smallHamburgerElement.addEventListener('click', onClick) ;


function onClick() {
    console.log(smallHamburger);
    priceElement.innerHTML = `Price :  ${smallHamburger.price}`;
    caloriesElement.innerHTML = `Calories :  ${smallHamburger.calories}`;
}

averageHamburgerElement.addEventListener('click', onClick1) ;


function onClick1() {
    console.log(averageHamburger);
    priceElement.innerHTML = `Price :  ${averageHamburger.price}`;
    caloriesElement.innerHTML = `Calories :  ${averageHamburger.calories}`;
}

bigHamburgerElement.addEventListener('click', onClick2) ;


function onClick2() {
    console.log(bigHamburger);
    priceElement.innerHTML = `Price :  ${bigHamburger.price}`;
    caloriesElement.innerHTML = `Calories :  ${bigHamburger.calories}`;
}

toppingElement.addEventListener('click', onClick3) ;

function onClick3(e) {
    console.log(Hamburger);
    priceElement.innerHTML = `Price :  ${e.target.price} + ${e.target.price} `;
    caloriesElement.innerHTML = `Calories :  ${bigHamburger.calories} + ${cheese.calories}`;
}

/* 
cheeseElement.addEventListener('click', onClick3) ;

function onClick3() {
    console.log(Hamburger);
    priceElement.innerHTML = `Price :  ${bigHamburger.price} + ${cheese.price} `;
    caloriesElement.innerHTML = `Calories :  ${bigHamburger.calories} + ${cheese.calories}`;
}

salatElement.addEventListener('click', onClick3) ;

function onClick3() {
    console.log(Hamburger);
    priceElement.innerHTML = `Price :  ${bigHamburger.price} + ${cheese.price} `;
    caloriesElement.innerHTML = `Calories :  ${bigHamburger.calories} + ${cheese.calories}`;
}

potatoElement.addEventListener('click', onClick3) ;

function onClick3() {
    console.log(Hamburger);
    priceElement.innerHTML = `Price :  ${bigHamburger.price} + ${cheese.price} `;
    caloriesElement.innerHTML = `Calories :  ${bigHamburger.calories} + ${cheese.calories}`;
}

flavoringElement.addEventListener('click', onClick3) ;

function onClick3() {
    console.log(Hamburger);
    priceElement.innerHTML = `Price :  ${bigHamburger.price} + ${flavoring.price} `;
    caloriesElement.innerHTML = `Calories :  ${bigHamburger.calories} + ${flavoring.calories}`;
}

cheeseElement.addEventListener('click', onClick3) ;

function onClick3() {
    console.log(Hamburger);
    priceElement.innerHTML = `Price :  ${bigHamburger.price} + ${cheese.price} `;
    caloriesElement.innerHTML = `Calories :  ${bigHamburger.calories} + ${cheese.calories}`;
} */
