// Given an integer n, print a solid square pattern of size n × n using "* " (a star followed by exactly one space).

let n = 9;
for(let i = 0; i <n; i++ ){
let row = "";
for(let j = 0;j < n;j++){
    row += "* ";
}
console.log(row)
}

let n = 9;
for(let i = 0; i <n; i++ ){
let row = "*";
console.log(row)
}

// 
const symbol = "* "
for(let i=0; i <=5; i++){

    console.log(symbol.repeat(i))
}

//
const symbol = "* "
for(let i=5; i >=1; i--){

    console.log(symbol.repeat(i))
}


//
const symbol = "* "
for(let i=0; i <=5; i++){

    console.log(symbol.repeat(i))
}


for(let i=5; i >=1; i--){

    console.log(symbol.repeat(i))
}

