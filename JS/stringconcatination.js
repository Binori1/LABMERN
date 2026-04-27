//string concatination using + opeartor

let fName = "Ipsita"
let lName = "Biswal"
let fullName = fName + " "+ lName
console.log(fullName);

//uisng string literal 

let fName = "Ipsita"
let lName = "Biswal"
let fullName = `\${fName} \${lName}`;
console.log(fullName);

//uisng concat method 

let m1 = "Hello"
let m2 = "Good morning"
let message = m1.concat(" ", m2);
console.log(message);

//Using join() for arrays 

let sarray = ["KIds name", "Suna", "Kuna","Hira","Kuni"]
let array = sarray.join("-");
console.log(array)