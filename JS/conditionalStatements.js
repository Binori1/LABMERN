//Find even or odd
let x=20;
if(x % 2 === 0){

    console.log("Even")
}

//Find even or odd using if..else 

let y=17;
if(y % 2 === 0){

    console.log("Even")
}
else{

console.log("Odd")

}

//find give number is positive or negative uisng if..else if statement

let a = 9;
 if(a > 0){
            console.log("Positive")
        }else if(a<0){
        console.log("Negative")
        }else{
            console.log("Zero")
        }

// switch case examle ..print one if it matched number 1, check the same condition till number 9
    let n = 0;
    let rs;
    switch(true){
case n === 1 :
    rs = "one"
    break;
case n === 2 :
    rs = "two"
    break;  
case n === 3 :
    rs = "three"
    break; 
case n === 4 :
    rs = "Four"
    break;  
 case n === 5 :
    rs = "Five"
    break;  
case n === 6 :
    rs = "Six"
    break;  
case n === 7 :
    rs = "Seven"
    break;  
case n === 8 :
    rs = "Eight"
    break;  
case n === 9 :
    rs = "Nine"
    break;  
default :
rs = "Unknow"

    }
console.log(rs)

// if number is divisble by 3 print Fizz, print Bizz if divisible by 3, print FizzBizz if disvisble by both
let n =5;
if(n % 3 === 0 && n % 5 === 0){
console.log("FizzBizz")
}else if (n % 3 === 0){
    console.log("Fizz")
}else if(n % 5 === 0){
    console.log("Bizz")
}

/* Given a number n, number of apples in a bag. You and your friend are picking one apple turnwise from the bag. It is given that the first attempt is always by you. The person picking the last apple will be the winner. 

If you will win: print "You" (without quotes)
If your friend will win: print "Friend" (without quotes) */
let n =9;
if(n / 2 === 0){
console.log("You")
}else{
console.log("Friend")
}


//Given a number n, find the first digit of the number.

let n = 100;
while(n >= 10){
n = parseInt(n / 10);

}
console.log(n)

