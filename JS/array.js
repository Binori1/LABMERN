// find largest number in array

function largestElement(arr) {
    let largestNum = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > largestNum) {
            largestNum = arr[i];
        }
    }
    return largestNum;
}

const num1 = [10, 15, 18, 20, 23];
const result = largestElement(num1);

console.log("The largest element in the array is:" + result);

//Split and Join - Pogram to reverse a string
let str = "Subasish";
let convertToArray = str.split("") //split opeartor is used
let reverseArray = convertToArray.reverse();
let joinArray = reverseArray.join("");
console.log(joinArray);

//uisng ... spread operator

let str = "Subasish";
let reverseString = [...str].reverse().join("");
console.log(reverseString);


