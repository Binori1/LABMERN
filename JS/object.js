//basic object crration

let person = {
   name : "Subasish", //here name is the key or properties
   age : 30,
   city : "bangalore"
}
console.log(person.age); //Access propertis
console.log(person);

//adding or updating propertis
let person = {
   name : "Subasish", //here name is the key or properties
   age : 30,
   city : "bangalore"
}

person.job = "Software devloper";
console.log(person.job); //Access propertis
console.log(person);

/*object method 
when this key word is used in object method, it refers to the object its currently executing
when this keywork is used in function based on postion 

*/

const car = {
  brand: "Tesla",
  model: "Model 3",
  start: function() {
    return `${this.brand} ${car.model} is starting...`; //this keyword refers to the object that is currently exceuting
  }
};

console.log(car.start()); // "Tesla Model 3 is starting..."
