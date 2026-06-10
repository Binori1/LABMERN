//function declaration in JS, 
function nameOfTheFunction(name){
console.log(`Hello ${name}`)
}
nameOfTheFunction("Subasish"); //calling  the function 

//call the function and assing its return to a variable
function greetMessage(name,city){
    return `Hello ${name} you are from ${city}`
}

let res = greetMessage(); //call the function and assing its return to a variable
console.log(greetMessage("Subasish","Pattamundai"));

//Anonymous function

let aFunction = function(name){
    return `Hello ${name}`
}
let res = aFunction();
console.log(aFunction("Subasish"));

//Arrow function, we dont need to use keyword function, no return required

const calculate2Number = (n1,n2) => {
    return n1 + n2
}
let res = calculate2Number();
console.log(calculate2Number(10,20));

// In arrow function after arrow single line code or expression does not required {} braces

const sumNumber = (n1,n2) => n1 + n2 ;
console.log(sumNumber(10,20));

// Addition of numbers from 1 to 20

function calculateSum(minNumber,maxNumber){
    let total = 0;
    for(i= minNumber;i <= maxNumber; i++){
        total = total + i ;
    }
    return total
}

let res = calculateSum();
console.log(calculateSum(1,20));