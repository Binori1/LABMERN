//map logic

const arr = [1,2,3,4,5];

function getSquares(number){
  return number % 2 === 0;
};

let output = arr.map(getSquares); // Map is a method in array, which will craete a temp array and loop all the elements to find desired result
console.log(output);


const arr = [1,2,3,4,5];

function getSquares(number){
  return number % 2 === 0;
};

let output = arr.filter(getSquares); // Map is a method in array, which will craete a temp array and loop all the elements to find desired result
console.log(output);



const users = [
  { name: "A", age: 22 },
  { name: "B", age: 30 },
  { name: "C", age: 28 }
];

const result = users.filter(user => user.age > 25).map(user => user.name);

console.log(result);

