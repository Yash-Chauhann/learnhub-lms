const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const user = JSON.parse(
    localStorage.getItem("user")
);

if (user) {

    document.getElementById("username")
        .textContent = user.name;

    document.getElementById("useremail")
        .textContent = user.email;

    document.querySelector(".topbar h1")
        .textContent =
        `Welcome Back, ${user.name} 🚀`;
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "login.html";
}