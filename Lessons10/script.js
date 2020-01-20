'use strict';
function createCalculator(counts) {

    return {
        add: (operandB) => counts + operandB,
        sub: (operandB) => (counts - operandB),
        divide: (operandB) => (counts / operandB),
        mult: (operandB) => (counts * operandB),
        set: (operandB) => counts = operandB
    };
}

const calculator = createCalculator(10);

alert(calculator.add(45));
alert(calculator.sub(45));
alert(calculator.divide(5));
alert(calculator.mult(5));
alert(calculator.set(100));
alert(calculator.mult(5));

