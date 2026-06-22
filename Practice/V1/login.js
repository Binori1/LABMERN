if (typeof msal === "undefined") {
        console.log("MSAL failed to load.");
    } else {
        console.log("MSAL loaded successfully.");
    }

const msalConfig = {
auth: {
clientId: "02957124-6e73-42d1-89a3-c33cd92cd507",
authority: "https://login.microsoftonline.com/c92da9ce-2036-43c6-8c72-662045ddce8e",
redirectUri: window.location.origin
},
cache: {
cacheLocation: "sessionStorage",
storeAuthStateInCookie: false
}
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

const loginRequest = {
scopes: ["User.Read"]
};

document.getElementById("loginForm").addEventListener("submit", async (e) => {
e.preventDefault();

try {
    const loginResponse = await msalInstance.loginPopup(loginRequest);

    console.log("User authenticated:", loginResponse.account);

    sessionStorage.setItem(
        "username",
        loginResponse.account.username
    );

    window.location.href = "console.html";

} catch (error) {
    console.error(error);
    alert("Authentication failed.");
}

});
