const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

let questions = [];

/* =========================
   LOAD TEST QUESTIONS
========================= */

async function loadTest() {
    try {
        const res = await fetch("https://learnhub-lms-tzzw.onrender.com/api/test", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!res.ok) {
            throw new Error("Failed to load test");
        }

        questions = await res.json();

        renderQuestions();

    } catch (error) {
        console.log(error);
        alert("Error loading test");
    }
}

/* =========================
   RENDER QUESTIONS
========================= */

function renderQuestions() {
    const container = document.getElementById("questions");

    let html = "";

    questions.forEach((q, index) => {
        html += `
            <div class="question">
                <h3>${index + 1}. ${q.question}</h3>

                ${q.options.map(opt => `
                    <label class="option">
                        <input type="radio" name="q${index}" value="${opt}">
                        ${opt}
                    </label>
                `).join("")}
            </div>
        `;
    });

    container.innerHTML = html;
}

/* =========================
   SUBMIT TEST
========================= */

async function submitTest() {

    try {

        const answers = questions.map((q, index) => {

            const selected = document.querySelector(
                `input[name="q${index}"]:checked`
            );

            return {
                questionId: q._id,
                selected: selected ? selected.value : ""
            };
        });

        const res = await fetch("http://localhost:5000/api/test/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ answers })
        });

        const data = await res.json();

        alert(`Your Score: ${data.score}`);

    } catch (error) {
        console.log(error);
        alert("Error submitting test");
    }
}

/* =========================
   INIT
========================= */

loadTest();