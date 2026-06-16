document.addEventListener("DOMContentLoaded", () => {
const API_URL = "https://learnhub-lms-tzzw.onrender.com";
    /* =========================
       NAVBAR SCROLL EFFECT
    ========================== */

    const navbar = document.querySelector(".navbar");

    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                navbar.style.background = "rgba(15,23,42,0.95)";
                navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
            } else {
                navbar.style.background = "rgba(15,23,42,0.85)";
                navbar.style.boxShadow = "none";
            }
        });
    }


    /* =========================
       SMOOTH SCROLL
    ========================== */

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", (e) => {

            const targetId = link.getAttribute("href");

            if (targetId && targetId.startsWith("#")) {
                e.preventDefault();

                const target = document.querySelector(targetId);

                if (target) {
                    target.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            }
        });
    });


    /* =========================
       BUTTON CLICK EFFECT
    ========================== */

    document.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", () => {

            btn.style.transform = "scale(0.95)";

            setTimeout(() => {
                btn.style.transform = "scale(1)";
            }, 150);

        });
    });


    /* =========================
       AI DOUBT SOLVER
    ========================== */

    const aiInput = document.querySelector(".ai-box input");
    const aiButton = document.querySelector(".ai-box button");

    window.askAI = async function () {

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first!");
            window.location.href = "login.html";
            return;
        }

        const question = aiInput ? aiInput.value.trim() : "";

        if (!question) {
            alert("Please enter your doubt!");
            return;
        }

        try {

            const res = await fetch("https://learnhub-lms-tzzw.onrender.com/api/doubts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ question })
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Something went wrong");
                return;
            }

            let responseBox = document.querySelector("#aiResponse");

            if (!responseBox) {
                responseBox = document.createElement("div");
                responseBox.id = "aiResponse";
                responseBox.style.marginTop = "20px";

                const aiSection = document.querySelector(".ai-section");
                if (aiSection) {
                    aiSection.appendChild(responseBox);
                }
            }

            responseBox.innerHTML = `
                <div style="
                    padding:15px;
                    background:#111827;
                    border-left:4px solid #8b5cf6;
                    border-radius:10px;
                    color:white;
                ">
                    <p><b>Question:</b> ${data.question}</p>
                    <p><b>Answer:</b> ${data.answer}</p>
                </div>
            `;

            aiInput.value = "";

        } catch (error) {
            console.log(error);
            alert("Server Error");
        }
    }

    if (aiButton) {
        aiButton.addEventListener("click", askAI);
    }


    /* =========================
       FACULTY HOVER EFFECT
    ========================== */

    document.querySelectorAll(".faculty-card").forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "translateY(-10px) scale(1.02)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "translateY(0) scale(1)";
        });
    });

});



