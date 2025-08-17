const studentList = document.getElementById("studentList");
const form = document.getElementById("studentForm");
const singleStudentDiv = document.getElementById("singleStudent");

async function fetchStudents() {
  const res = await fetch("/api/students");
  const students = await res.json();
  renderStudents(students);
}

function renderStudents(students) {
  studentList.innerHTML = "";
  students.forEach(student => {
    const div = document.createElement("div");
    div.className = "student";
    div.innerHTML = `
      <strong>${student.name}</strong> (Age: ${student.age})
      <button onclick="deleteStudent(${student.id})">Delete</button>
      <button onclick="updateStudent(${student.id})">Update</button>
    `;
    studentList.appendChild(div);
  });
}

form.addEventListener("submit", async e => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;

  await fetch("/api/students", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, age })
  });

  form.reset();
  fetchStudents();
});

async function deleteStudent(id) {
  await fetch(`/api/students/${id}`, { method: "DELETE" });
  fetchStudents();
}

async function updateStudent(id) {
  const newName = prompt("Enter new name:");
  const newAge = prompt("Enter new age:");
  if (!newName || !newAge) return;

  await fetch(`/api/students/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: newName, age: newAge })
  });

  fetchStudents();
}

async function findStudent() {
  const id = document.getElementById("searchId").value;
  if (!id) return;
  const res = await fetch(`/api/students/${id}`);
  if (res.status === 404) {
    singleStudentDiv.innerHTML = "❌ Student not found";
    return;
  }
  const student = await res.json();
  singleStudentDiv.innerHTML = `<strong>${student.name}</strong> (Age: ${student.age})`;
}

// Load students on page load
fetchStudents();