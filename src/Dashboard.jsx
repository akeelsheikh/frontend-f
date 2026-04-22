import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");

  const token = localStorage.getItem("token");

  // Fetch students
  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/students",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setStudents(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Add student
  const addStudent = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/students",
        {
          name,
          course
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Student Added");

      setName("");
      setCourse("");

      fetchStudents();

    } catch (err) {
      console.log(err.response?.data);
  console.log(err.message);
  alert("Error adding student");
    }
  };

  // Delete student
  const deleteStudent = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/students/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Student Deleted");

      fetchStudents();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Student Dashboard</h1>

      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Enter course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      />

      <br /><br />

      <button onClick={addStudent}>
        Add Student
      </button>

      <hr />

      <h2>Student List</h2>

      {
        students.length > 0 ? (
          students.map((student) => (
            <div key={student._id}>
              <h3>{student.name}</h3>
              <p>{student.course}</p>

              <button
                onClick={() => deleteStudent(student._id)}
              >
                Delete
              </button>

              <hr />
            </div>
          ))
        ) : (
          <p>No students found</p>
        )
      }
    </div>
  );
}

export default Dashboard;