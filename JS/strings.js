<<<<<<< HEAD
//find length of a string

let s = 'JavaScript';
let len = s.length;
console.log("String Length: " + len);
=======
//find length of a string

let s = 'JavaScript';
let len = s.length;

console.log("String Length: " + len);

//iterating a string using "for let off " "

let s = "Thakur Abhiram paramhansa dev"
for (let char of s){
console.log(char)
}

//Reverse a string

function reverseString(s) {
  let reversed = "";
  for (let i = s.length - 1; i >= 0; i--) {
    reversed += s[i];
  }
  return reversed;
}

console.log(reverseString("world")); // "dlrow"

//using ... sprad operator

//Split and Join
let str = "Subasish";
let convertToArray = str.split("") //split opeartor is used
let reverseArray = convertToArray.reverse();
let joinArray = reverseArray.join("");
console.log(joinArray);


>>>>>>> fdb61bd19fe58b94407b4aa3afd97a2b322316b5
