const token = localStorage.getItem("token");

if (!token) {
    console.log("No token found, user not logged in");
}

/* =========================
   LOAD COURSES
========================= */

async function loadCourses() {

    try {

        const res = await fetch("https://learnhub-lms-tzzw.onrender.com/api/courses");

        const courses = await res.json();

        const container = document.getElementById("courseList");

        if (!container) return;

        let html = "";

        courses.forEach(course => {

            html += `
                <div class="card">
                    <h2>${course.title}</h2>
                    <p>${course.description}</p>
                    <button class="enroll-btn" data-id="${course._id}">
                        Enroll
                    </button>
                </div>
            `;
        });

        container.innerHTML = html;

        attachEnrollEvents();

    } catch (err) {
        console.log("Error loading courses:", err);
    }
}

/* =========================
   ENROLL FUNCTION (GLOBAL SAFE)
========================= */

async function enroll(courseId) {

    if (!token) {
        alert("Please login first");
        return;
    }

    try {

        const res = await fetch("http://localhost:5000/api/enroll", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ courseId })
        });

        const data = await res.json();

        if (res.ok) {
            alert("Enrolled Successfully 🚀");
        } else {
            alert(data.message || "Enrollment failed");
        }

    } catch (err) {
        console.log(err);
        alert("Server error");
    }
}

/* =========================
   EVENT BINDING (BEST PRACTICE)
========================= */

function attachEnrollEvents() {

    document.querySelectorAll(".enroll-btn").forEach(btn => {

        btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-id");
            enroll(id);
        });

    });
}

/* =========================
   GLOBAL EXPORT (SAFETY)
========================= */

window.enroll = enroll;

/* =========================
   INIT
========================= */

loadCourses();