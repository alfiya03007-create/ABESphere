/* =========================
   ABESPHERE - MAIN SCRIPT
========================= */


/* STUDENT LOGIN & PROFILE */

function studentLogin() {
    const input = document.getElementById("studentId");
    const studentId = input.value.trim();

    if (studentId === "") {
        alert("Please enter your Student ID.");
        return;
    }

    localStorage.setItem("abesStudentId", studentId);

    updateProfile();

    alert("Welcome to ABESphere!");

    input.value = "";
}


function updateProfile() {
    const studentId = localStorage.getItem("abesStudentId");
    const studentName = localStorage.getItem("abesStudentName");

    document.getElementById("profileStudentId").textContent =
        studentId || "Not entered";

    document.getElementById("profileName").textContent =
        studentName || "ABES Student";
}


function editProfile() {
    const name = prompt("Enter your name:");

    if (name === null || name.trim() === "") {
        return;
    }

    localStorage.setItem("abesStudentName", name.trim());

    updateProfile();

    alert("Profile updated successfully!");
}


/* =========================
   EXAM COUNTDOWN
========================= */

const examDate =
    new Date("November 20, 2026 09:00:00").getTime();


function updateCountdown() {
    const countdown = document.getElementById("countdown");

    const now = new Date().getTime();
    const difference = examDate - now;

    if (difference <= 0) {
        countdown.innerHTML = "MT-1 HAS STARTED!";
        return;
    }

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (difference % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const seconds = Math.floor(
        (difference % (1000 * 60))
        / 1000
    );

    countdown.innerHTML = `
        <span>${days} DAYS</span>
        <span>${hours} HRS</span>
        <span>${minutes} MIN</span>
        <span>${seconds} SEC</span>
    `;
}

updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================
   PYQ LIBRARY
========================= */

function showPYQ(subject) {
    const results = document.getElementById("pyq-results");

    results.innerHTML = `
        <h2>${subject} PYQs</h2>

        <div class="pyq-card">
            <h3>MT-1 — Previous Year Questions</h3>
            <p>Study material and previous-year questions for ${subject}.</p>
            <button onclick="viewPYQ('${subject}', 'MT-1')">
                VIEW QUESTIONS
            </button>
        </div>

        <div class="pyq-card">
            <h3>MT-2 — Previous Year Questions</h3>
            <p>Study material and previous-year questions for ${subject}.</p>
            <button onclick="viewPYQ('${subject}', 'MT-2')">
                VIEW QUESTIONS
            </button>
        </div>
    `;
}


function viewPYQ(subject, test) {
    alert(test + " material for " + subject +
        " will be added to the library soon!");
}


/* PYQ SEARCH */

document.getElementById("pyqSearch").addEventListener("input", function() {
    const search = this.value.toLowerCase();

    const buttons = document.querySelectorAll(".pyq-subjects button");

    buttons.forEach(button => {
        button.style.display =
            button.textContent.toLowerCase().includes(search)
            ? ""
            : "none";
    });
});


/* =========================
   DOUBT HUB
========================= */

let selectedSubject = "";

let doubts = [];

try {
    doubts = JSON.parse(
        localStorage.getItem("abesDoubts") || "[]"
    );

    if (!Array.isArray(doubts)) {
        doubts = [];
    }
} catch {
    doubts = [];
}


function selectSubject(subject) {
    selectedSubject = subject;

    alert("Selected subject: " + subject);
}


function postDoubt() {
    const title = document.getElementById("doubtTitle").value.trim();

    const description =
        document.getElementById("doubtDescription").value.trim();

    if (selectedSubject === "") {
        alert("Please select a subject first.");
        return;
    }

    if (title === "" || description === "") {
        alert("Please enter your doubt.");
        return;
    }

    const doubt = {
        subject: selectedSubject,
        title: title,
        description: description
    };

    doubts.unshift(doubt);

    localStorage.setItem("abesDoubts", JSON.stringify(doubts));

    renderDoubts();

    document.getElementById("doubtTitle").value = "";
    document.getElementById("doubtDescription").value = "";

    alert("Your doubt has been posted!");
}


function renderDoubts() {
    const results = document.getElementById("doubt-results");

    results.innerHTML = "<h3>Recent Doubts</h3>";

    doubts.forEach(doubt => {
        const card = document.createElement("div");
        card.className = "doubt-card";

        const tag = document.createElement("span");
        tag.className = "subject-tag";
        tag.textContent = doubt.subject;

        const heading = document.createElement("h3");
        heading.textContent = doubt.title;

        const paragraph = document.createElement("p");
        paragraph.textContent = doubt.description;

        const button = document.createElement("button");
        button.textContent = "VIEW SOLUTION";

        button.onclick = function() {
            alert("Solutions for this doubt will be available soon!");
        };

        card.appendChild(tag);
        card.appendChild(heading);
        card.appendChild(paragraph);
        card.appendChild(button);

        results.appendChild(card);
    });
}


/* =========================
   VIDEO SOLUTIONS
========================= */

function showVideos(subject) {
    const results = document.getElementById("video-results");

    results.innerHTML = `
        <h2>${subject} Video Solutions</h2>

        <div class="video-card">
            <h3>${subject} — Important Concepts</h3>
            <p>Step-by-step explanations of important topics.</p>
            <button onclick="watchVideo('${subject}', 'Important Concepts')">
                ▶ WATCH VIDEO
            </button>
        </div>

        <div class="video-card">
            <h3>${subject} — PYQ Solutions</h3>
            <p>Detailed solutions to previous-year questions.</p>
            <button onclick="watchVideo('${subject}', 'PYQ Solutions')">
                ▶ WATCH VIDEO
            </button>
        </div>
    `;
}


function watchVideo(subject, topic) {
    alert(subject + " — " + topic +
        " videos will be available soon!");
}


/* =========================
   EXAM MODE
========================= */

function startExamMode() {
    const message = document.getElementById("exam-message");

    document.body.classList.add("exam-active");

    message.innerHTML = `
        <p>🎯 EXAM MODE ACTIVATED</p>
        <p>Stay focused. You've got this!</p>

        <button onclick="exitExamMode()">
            EXIT EXAM MODE
        </button>
    `;

    window.scrollTo(0, 0);
}


function exitExamMode() {
    document.body.classList.remove("exam-active");

    document.getElementById("exam-message").innerHTML = "";

    window.scrollTo(0, 0);
}


/* =========================
   DASHBOARD NAVIGATION
========================= */

document.querySelectorAll(".dashboard-card").forEach(card => {
    card.style.cursor = "pointer";

    card.addEventListener("click", function() {
        const target = this.dataset.target;

        const section = document.querySelector(target);

        if (section) {
            section.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});


/* =========================
   INITIALIZE WEBSITE
========================= */

updateProfile();

renderDoubts();