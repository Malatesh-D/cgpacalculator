// Fill semesters dropdown dynamically
function fillDropdown(id) {
    const dropdown = document.getElementById(id);
    for (let i = 1; i <= 9; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.text = i;
        dropdown.add(option);
    }
}
fillDropdown("semesters");

function showSGPA() {
    document.getElementById('sgpaSection').style.display = "block";
    document.getElementById('cgpaSection').style.display = "none";
    document.getElementById('result').innerHTML = "";
    document.getElementById('congrats').innerHTML = "";
}
function showCGPA() {
    document.getElementById('cgpaSection').style.display = "block";
    document.getElementById('sgpaSection').style.display = "none";
    document.getElementById('result').innerHTML = "";
    document.getElementById('congrats').innerHTML = "";
}

// SGPA
function generateSGPAInputs() {
    const num = document.getElementById('subjects').value;
    const container = document.getElementById('sgpaInputs');
    container.innerHTML = "";
    document.getElementById('sgpaCalcBtn').style.display = "none";

    if (!num || num <= 0) {
        alert("Please enter a valid number of subjects");
        return;
    }

    for (let i = 1; i <= num; i++) {
        container.innerHTML += `
            <div class="box">
                <label>Subject ${i} Credits:</label>
                <input type="number" step="0.1" id="credit${i}" placeholder="Enter Credits">
                <label>Subject ${i} Grade Points (0-10):</label>
                <input type="number" step="0.01" id="grade${i}" placeholder="Enter Grade Point">
            </div>
        `;
    }
    document.getElementById('sgpaCalcBtn').style.display = "inline-block";
}

function calculateSGPA() {
    const num = document.getElementById('subjects').value;
    let totalPoints = 0, totalCredits = 0;

    for (let i = 1; i <= num; i++) {
        const creditEl = document.getElementById('credit' + i);
        const gradeEl = document.getElementById('grade' + i);

        if (!creditEl.value || !gradeEl.value) {
            alert("Please fill all the fields");
            return;
        }

        const credit = parseFloat(creditEl.value);
        const grade = parseFloat(gradeEl.value);

        if (isNaN(credit) || isNaN(grade) || grade < 0 || grade > 10 || credit <= 0) {
            alert(`Please enter valid Credit and Grade Point for Subject ${i}`);
            return;
        }

        totalPoints += credit * grade;
        totalCredits += credit;
    }

    const sgpa = totalPoints / totalCredits;
    document.getElementById('result').innerHTML = "SGPA: " + sgpa.toFixed(2);
    showCongrats(`🎉 Congratulations! Your SGPA is ${sgpa.toFixed(2)} 🎉`);
    launchConfetti();
}

// CGPA
function generateCGPAInputs() {
    const num = document.getElementById('semesters').value;
    const container = document.getElementById('cgpaInputs');
    container.innerHTML = "";
    document.getElementById('cgpaCalcBtn').style.display = "none";

    if (!num) {
        alert("Please select number of semesters");
        return;
    }

    for (let i = 1; i <= num; i++) {
        container.innerHTML += `
            <div class="box">
                <label>Semester ${i} SGPA:</label>
                <input type="number" step="0.01" id="sgpa${i}" placeholder="Enter SGPA">
                <label>Semester ${i} Credits:</label>
                <input type="number" step="0.1" id="credits${i}" placeholder="Enter Credits">
            </div>
        `;
    }
    document.getElementById('cgpaCalcBtn').style.display = "inline-block";
}

function calculateCGPA() {
    const num = document.getElementById('semesters').value;
    let totalWeighted = 0, totalCredits = 0;

    for (let i = 1; i <= num; i++) {
        const sgpaEl = document.getElementById('sgpa' + i);
        const creditsEl = document.getElementById('credits' + i);

        if (!sgpaEl.value || !creditsEl.value) {
            alert("Please fill all the fields");
            return;
        }

        const sgpa = parseFloat(sgpaEl.value);
        const credits = parseFloat(creditsEl.value);

        if (isNaN(sgpa) || isNaN(credits) || sgpa < 0 || sgpa > 10 || credits <= 0) {
            alert(`Please enter valid SGPA (0-10) and Credits for Semester ${i}`);
            return;
        }

        totalWeighted += sgpa * credits;
        totalCredits += credits;
    }

    const cgpa = totalWeighted / totalCredits;
    document.getElementById('result').innerHTML = "CGPA: " + cgpa.toFixed(2);
    showCongrats(`🎉 Congratulations! Your CGPA is ${cgpa.toFixed(2)} 🎉`);
    launchConfetti();
}

// Congrats animation
function showCongrats(message) {
    const congrats = document.getElementById('congrats');
    congrats.innerHTML = message;
    congrats.style.opacity = "1";
    congrats.style.animation = "popIn 0.8s ease";
}

// Confetti
function launchConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}
