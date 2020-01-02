'use strict';

let operator ;
let Operand ;
let result;
let quantityOperand ;
const numbers = [];


do {
    operator =  prompt (`Какое действие хотите совершить ? :
    +
    -
    *
    /   `);

 } while (operator != '+' && operator != '-' && operator != '*' && operator != '/');



do {
    quantityOperand = +prompt('Сколько хотите использовать чисел ? Введите число от 2 до 4');
 } while (isNaN(quantityOperand) || quantityOperand <= 1 || quantityOperand >= 5);

for (let i = 1; i <= quantityOperand; i++) {
		do {
	    	Operand = +prompt(`Введите число ${i}`);
		} while (isNaN(Operand) && Operand !== '' && Operand !== ' ');
		numbers.push(Operand);
};


switch(operator){
    case '+': 
    	result = numbers.reduce((summ, start) => summ + start);
		alert(`Сумма ваших чисел: ${numbers.join(' + ')} = ${result}`);
        break;
    case '-':
 		result = numbers.reduce((sub, start) => sub - start);
		alert(`Результат: ${numbers.join(' - ')} = ${result}`);
        break;
    case '*':
    	result = numbers.reduce((mult, start) => mult * start);
		alert(`Умножение ваших чисел: ${numbers.join(' * ')} = ${result}`);
        break;
    case '/':
    	result = numbers.reduce((div, start) => div / start);
		alert(`Деление ваших чисел: ${numbers.join(' / ')} = ${result}`);
        break;
};