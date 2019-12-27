'use strict';

  

    let numbers = prompt ('Введите числа через запятую');

    let value = numbers.split (',');


    let positiveArr = value.filter(function(number) {
      if (!isNaN(parseFloat(number)) && isFinite(number))
        return number;
    });
  
    alert( positiveArr );

    
    let max = Math.max.apply(null, positiveArr);

    alert(max);
    


    let total = positiveArr.reduce(function(a, b) {
      return +a + +b;
    });
 
    alert( total );



    let even = positiveArr.filter(function(number) {
      if (number % 2 == 0)
        return number;
    });
  

    alert (even);




