let nameInput = document.getElementById("name");
let rollInput = document.getElementById("roll");
let departmentInput = document.getElementById("department");
let yearInput = document.getElementById("year");
let addButton = document.getElementById("addStudent");
let tableBody = document.getElementById("tableBody");
let searchInput = document.getElementById("search");
let deleteAllButton = document.getElementById("deleteAll");

// Load students from Local Storage
let students = JSON.parse(localStorage.getItem("students")) || [];

// Display Students
function displayStudents() {

    tableBody.innerHTML = "";

    students.forEach((student, index) => {

        tableBody.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.roll}</td>
            <td>${student.department}</td>
            <td>${student.year}</td>
            <td>
                <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
            </td>
        </tr>
        `;

    });

}

// Show existing students
displayStudents();

// Add Student
addButton.addEventListener("click", function () {

    let student = {
        name: nameInput.value.trim(),
        roll: rollInput.value.trim(),
        department: departmentInput.value,
        year: yearInput.value
    };

    // Validation
    if (
        student.name === "" ||
        student.roll === "" ||
        student.department === "" ||
        student.year === ""
    ) {
        alert("Please fill all fields.");
        return;
    }

    // Duplicate Roll Number Check
    let duplicate = students.find(function(s) {
        return s.roll.toLowerCase() === student.roll.toLowerCase();
    });

    if (duplicate) {
        alert("❌ Roll Number already exists!");
        return;
    }

    students.push(student);

    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();

    alert("✅ Student Added Successfully!");

    // Clear form
    nameInput.value = "";
    rollInput.value = "";
    departmentInput.value = "";
    yearInput.value = "";
});

// Delete Student
function deleteStudent(index) {

    if (confirm("Delete this student?")) {

        students.splice(index, 1);

        localStorage.setItem("students", JSON.stringify(students));

        displayStudents();
    }

}

// Edit Student
function editStudent(index) {

    let student = students[index];

    nameInput.value = student.name;
    rollInput.value = student.roll;
    departmentInput.value = student.department;
    yearInput.value = student.year;

    students.splice(index, 1);

    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();

}

// Search by Name, Roll Number, Department and Year
searchInput.addEventListener("keyup", function () {

    let value = searchInput.value.toLowerCase();

    let rows = tableBody.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {

        let rowText = rows[i].innerText.toLowerCase();

        if (rowText.includes(value)) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }

    }

});
// Delete All Students
deleteAllButton.addEventListener("click", function () {

    if (students.length === 0) {
        alert("No students to delete!");
        return;
    }

    let confirmDelete = confirm("Are you sure you want to delete all students?");

    if (confirmDelete) {

        students = [];

        localStorage.removeItem("students");

        displayStudents();

        alert("✅ All students deleted successfully!");

    }

});