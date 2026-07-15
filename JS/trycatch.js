let x = 5;
let y = 6;

try {
    let z = null;
  z = x + y;
  console.log(z)
} catch(err) {
  let text = err.name;
  console.log(text)
}

