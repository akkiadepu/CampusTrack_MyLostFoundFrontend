
import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom';
import { getStudentsByUserName, deleteUser, updateStudent } from "../../Services/LoginService";

const StudentProfile = () => {

    let navigate = useNavigate();
    const [studentList, setStudentList] = useState([]);

    const [editUsername, setEditUsername] = useState(null);
    const [editData, setEditData] = useState({
        personalName: "",
        email: "",
        password: ""
    });

    const getStudentsByUser = () => {
        const username = sessionStorage.getItem("username");

        if (!username) {
            console.error("Username not found in session");
            return;
        }

        getStudentsByUserName(username)
            .then((response) => {
                setStudentList(response.data);
            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        getStudentsByUser();
    }, []);

    const startEdit = (student) => {
        setEditUsername(student.username);
        setEditData({
            personalName: student.personalName,
            email: student.email,
            password: ""
        });
    };

    const handleChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const saveUpdate = (username) => {
        updateStudent(username, editData).then(() => {
            alert("Updated Successfully");

            setStudentList(studentList.map(st =>
                st.username === username ? { ...st, ...editData } : st
            ));

            setEditUsername(null);
        });
    };

    // const removeStudent = (id) => {
    //     deleteUser(id).then(response => {
    //         let remainStudents = studentList.filter((student) => (student.username !== id));
    //         setStudentList(remainStudents);
    //         // navigate('/student-list');
    //     });
    // }

    const returnBack = () => {
        navigate('/StudentMenu')
    }

    return (
        <div className="text-center">
            <h2>Student Profile</h2>

            <table className="table table-bordered">
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
                                    </>
                                ) : (
                                    <button
                                        className="btn btn-warning btn-sm"
                                        onClick={() => startEdit(student)}
                                    >
                                        Update
                                    </button>
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

export default StudentProfile