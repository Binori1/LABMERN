// check even or odd 
//check the remainder when divided

function isEven(number) {
//finding remainder
let remainder = number % 2;
if(remainder === 0){
    return `Number ${number} is even`;
}else{
    return `Number ${number} is odd`;
}
}
console.log(isEven(3));

// Using bitwise operator & , last bit of all the even number is always 1 and 0 for even number. when performing bitwise AND(&) opertaor with 1, its always give 1 for odd and 0 for even

function isEven(Number){
    let bitwiseValue = Number & 1;
    if(bitwiseValue === 0){
             return `Number ${Number} is : even`;
        
    }else{
        return `Number ${Number} is : Odd`;
    }
    }
    console.log(isEven(7));


//Multipication table
function printTable(number){
    for(let i= 1;i <= 10;i++){
        let mult = number * i;
        console.log(`${number} * ${i} = ${mult}`);
    }
}
printTable(5);

//sum of n natuarl number
function findSum(n){
 let sum = 0;
 for(let i = 1; i <= n;i++){
    sum = sum + i;
 }
return sum;
}
console.log(findSum(8));

//Using recursion function in JS, In JS cript when a function call its self its called recursion
//pogram to find sum of n natuarl number

function findSum(n) {
    // base condition
    if (n == 1)
        return 1;
    return n + findSum(n - 1);
}
//Driver code 
let n = 3;
console.log(findSum(n));


//sum of squares of n natural number
function summation(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++){
         sum = sum + (i * i);
    }
       return sum; 
}


let n = 4;
console.log(summation(n));

// swap the number using temp variable

function swapNumber(n1,n2){
    let temp;
    temp = n1;
    n1 = n2;
    n2 = temp;
    return `Number enter is ${n2} and ${n1} : After swap number is ${n1} and ${n2} `
}
console.log(swapNumber(10,20));

//swap the number without using third variable

function swapNumber(n1,n2){
    n1 = n1 + n2;
    n2 = n1 - n2;
    n1 = n1 - n2;
    return ` ${n1}  ${n2}`
}
console.log(swapNumber(10,20));

// dice problem //sum of the bothside is always 7

function oppositeOfDice(number){
    let opposite = 7 - number;
    return opposite;
}
console.log(oppositeOfDice(5));

// Sum of didgit 

