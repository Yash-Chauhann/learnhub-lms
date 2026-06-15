const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

// LOAD PROFILE

async function loadProfile() {

    try {

        const res = await fetch(
            "https://learnhub-lms-tzzw.onrender.com/api/profile",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await res.json();

        console.log(data);

        document.getElementById("name").value =
            data.name || "";

        document.getElementById("email").value =
            data.email || "";

        document.getElementById("progress").value =
            (data.progress || 0) + "%";

    } catch (error) {

        console.log(error);
        alert("Profile Load Failed");

    }
}

loadProfile();


// UPDATE PROFILE

async function updateProfile() {

    try {

        const name =
            document.getElementById("name").value;

        const res = await fetch(
            "http://localhost:5000/api/profile",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    name
                })
            }
        );

        const data = await res.json();

        alert(data.message);

    } catch (error) {

        console.log(error);
        alert("Update Failed");

    }
}