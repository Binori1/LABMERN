document.getElementById("loginForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
      alert("Login successful!");
      console.log("Token:", data.token);
    } else {
      alert("Login failed: " + data.message);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong.");
  }
});
