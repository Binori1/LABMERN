let readline = require("readline");
let r1 = readline.createInterface({input : process.stdin, output : process.stdout});

r1.question('Whats your name', name => {console.log(`Hello ${name} `) 
r1.question('Whats your Age', age => {console.log(`In 1 year you will be ${parseInt(age) + 1 }`)

r1.close();
});

});
r1.on('close',() => {comsole.log('Good bye')
process.exit(0);
});


