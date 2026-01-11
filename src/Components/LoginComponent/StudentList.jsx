
import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom';
import { getAllStudents, deleteUser, updateStudent } from "../../Services/LoginService";
import AdminHeader from '../HeaderComponents/AdminHeader';

const StudentList = () => {

    let navigate = useNavigate();
  const [studentList, setStudentList] = useState([]);

  const [editUsername, setEditUsername] = useState(null);
  const [editData, setEditData] = useState({
    personalName: "",
    email: "",
    password: ""
  });

  const setAllStudents = () => {
    getAllStudents().then((response) => {
      setStudentList(response.data);
    })
  }

   useEffect(() => {
    setAllStudents();
  }, []);

  const returnBack = () => {
    navigate('/AdminMenu')
  }

  const startEdit = (student) => {
    setEditUsername(student.username);
    setEditData({
      personalName: student.personalName,
      email: student.email,
      password: ""
    });
  };

  // 🔹 HANDLE INPUT
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // 🔹 SAVE UPDATE
  const saveUpdate = (username) => {
    updateStudent(username, editData).then(() => {
      alert("Updated Successfully");

      setStudentList(studentList.map(st =>
        st.username === username ? { ...st, ...editData } : st
      ));

      setEditUsername(null);
    });
  };


  const removeStudent = (id) => {
    deleteUser(id).then(response => {
      let remainStudents = studentList.filter((student) => (student.username !== id));
      setStudentList(remainStudents);
    });
  }

  return (
    
    <div className="text-center"
    style={{
            background: "linear-gradient(to right, #fde7e7, #e9ffd9)",
            minWidth: "99vw",
            minHeight: "100vh",

        }}

    >
      <AdminHeader/>
      <h2 className="mt-3">Student Profile</h2>

         <hr
                style={{
                    height: "3px",
                    borderWidth: 0,
                    backgroundColor: "red",
                }}
            />

      <table className="table table-bordered bg-transparent">
        <thead>
          <tr>
            <th>Username</th>
            <th>Personal Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {studentList.map(student => (
            <tr key={student.username}>

              <td>{student.username}</td>

              <td>
                {editUsername === student.username ? (
                  <input
                    name="personalName"
                    value={editData.personalName}
                    onChange={handleChange}
                    className="form-control"
                  />
                ) : student.personalName}
              </td>

              <td>
                {editUsername === student.username ? (
                  <input
                    name="email"
                    value={editData.email}
                    onChange={handleChange}
                    className="form-control"
                  />
                ) : student.email}
              </td>

              <td>
                {editUsername === student.username ? (
                  <>
                    <input
                      type="password"
                      name="password"
                      placeholder="New Password"
                      onChange={handleChange}
                      className="form-control mb-2"
                    />
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => saveUpdate(student.username)}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setEditUsername(null)}
                    >
                      Cancel
                    </button>

                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => startEdit(student)}
                    >
                      Update
                    </button>

                    <button style={{ marginLeft: "10px" }} onClick={() => removeStudent(student.username)} className="btn btn-danger">Delete</button>
                  </>
                )}
              </td>

            </tr>
          ))}
        </tbody>
      </table>

      <button style={{ marginLeft: "10px" }} onClick={() => returnBack()} className="btn btn-success">Return</button>
    </div>


  )
}

export default StudentList