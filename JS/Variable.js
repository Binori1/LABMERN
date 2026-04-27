```

// Old style
var a = 10    
console.log(a);
// Prferred for non-const
let b = 20;    
console.log(b);
// Preferred for const (cannot be changed)
const c = 30;  
console.log(c);

//Var is function scoped , In this example var is accessible outsdie of funcition, but not let 
if (true) {
    var x = 10;
    let y = 20;
}

console.log(x);  // 10 (var is function-scoped)
console.log(y);  // Error (let is block-scoped)

//let and const is blocked scope

if (true) {
  let y = 20;
  const z = 30;
}
console.log(y, z); // ReferenceError


//Object or array allows changing element of and object even if its declared as const

const ob = {a: 10};
ob.a = 20; //allowed
console.log(ob) //O/p = 20

const arr =[10,20,30,40];
arr[2] = 80; //allowed
console.log(arr); // Output is : 10,20,80,40

```