
let calculator = {
    num1: 10,
    num2: 20,
    add : function(){
        return this.num1 + this.num2
    },

    substract : function(){

        return this.num1 - this.num2
    },

    multi : function(){
        return this.num1 * this.num2
    }

    }

console.log("Addition", calculator.add());
console.log("Substarct", calculator.substract());
console.log("Multipication", calculator.multi());



function Employee(name, salary) {
  this.name = name;
  this.salary = salary;

  this.display = function() {
    return `Employee: ${this.name}, Salary: ${this.salary}`;
  };
}

const emp1 = new Employee("Subasish", 50000);
console.log(emp1.display());


