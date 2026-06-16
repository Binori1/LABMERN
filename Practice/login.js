let submitButton = document.querySelector("#loginForm");
submitButton.addEventListener("submit",(event) => {
    let email = document.querySelector("#email");
    let emailvalue = email.value.trim();
    let password = document.querySelector("#password");
    let passwordValue = password.value.trim();
        if(emailvalue === "" && passwordValue ===""){
             event.preventDefault();
             alert("Email and password can't be empty")
        }else if (emailvalue === ""){

            event.preventDefault();
             alert("Enter Email id")
        }else if(passwordValue === ""){
             event.preventDefault();
             alert("Enter Password")
        }
    }
 
)