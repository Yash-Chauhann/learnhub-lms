const API_URL = "https://learnhub-lms-tzzw.onrender.com";

async function enrollCourse(courseId) {

    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first");
        window.location.href = "login.html";
        return;
    }

    try {

        const response = await fetch(`${API_URL}/api/enroll`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                courseId
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Course enrolled successfully 🎉");
        } else {
            alert(data.message);
        }

    } catch (err) {
        console.error(err);
        alert("Server Error");
    }
}