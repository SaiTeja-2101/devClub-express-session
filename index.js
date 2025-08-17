const express=require('express');
const dotenv=require('dotenv');
const path=require('path');
dotenv.config();
const PORT=process.env.PORT || 3000;

const app=express();

// console.log(app);


app.use(express.static(path.join(__dirname,"public")));
app.get('/',(req,res)=>{
  console.log("I am a get req");
  // res.send('Welcome to the session');
    res.sendFile(path.join(__dirname,"public","index1.html"));
});
app.get('/about',(req,res)=>{
    console.log("I am a about req");
  // res.send('Welcome to the session');
    res.sendFile(path.join(__dirname,"public","about.html"));
});
// app.get("/api/posts/:id", (req, res) => {
//   console.log(req.params.id);
// });

// // app.get('/about',(req,res)=>{
// //     res.sendFile(path.join(__dirname,"public","about.html"));
// // })


app.use(express.json());//Parses incoming JSON data in the request body and makes it available in req.body.
app.use(express.urlencoded({ extended: true }));//{ user: { name: "Kim", age: "19" } }
// app.use(express.static(path.join(__dirname, "public")));
// // Dummy data (like a database)
let students = [
  { id: 1, name: "Alice", age: 20 },
  { id: 2, name: "Bob", age: 22 }
];

// ---------------------- CRUD Operations ----------------------

//CREATE a student (POST /api/students)
app.post("/api/students", (req, res) => {
  const newStudent = {
    id: students.length + 1,
    name: req.body.name,
    age: req.body.age,
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// //READ all students (GET /api/students)
app.get("/api/students", (req, res) => {
  res.json(students);
});

// //READ single student by id (GET /api/students/:id)
app.get("/api/students/:id", (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ message: "Student not found" });
  res.json(student);
});

// //UPDATE a student (PUT /api/students/:id)
app.put("/api/students/:id", (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ message: "Student not found" });

  student.name = req.body.name || student.name;
  student.age = req.body.age || student.age;

  res.json(student);
});


// //DELETE a student (DELETE /api/students/:id)
app.delete("/api/students/:id", (req, res) => {
  const studentIndex = students.findIndex(s => s.id === parseInt(req.params.id));
  if (studentIndex === -1) return res.status(404).json({ message: "Student not found" });

  const deleted = students.splice(studentIndex, 1);
  res.json({ message: "Student deleted", deleted });
});

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// // ---------------------- Start Server ----------------------
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
