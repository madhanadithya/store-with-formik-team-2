// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";


// function AddUsers() {
//     const [displayName, setDisplayName] = useState("");
//     const [email, setEmail] = useState("");
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [status, setStatus] = useState("");
//     const navigate = useNavigate();

//     function handleSubmit(e) {
//         e.preventDefault();
//         const newUser = { displayName, email, username, password, status };
//         axios.post("http://localhost:3000/api/v1/users", newUser)
//             .then((response) => {
//                 console.log(response);
//                 navigate('/show'); // Navigate to the ShowUsers page
//             })
//             .catch((err) => {
//                 console.error(err);
//             });
//     }

//     return (
//         <div className="form-container">
//             <h2>Add User</h2>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     value={displayName}
//                     onChange={(e) => setDisplayName(e.target.value)}
//                     placeholder="Enter Display Name"
//                     required
//                 />
//                 <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Enter Email"
//                     required
//                 />
//                 <input
//                     type="text"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     placeholder="Enter Username"
//                     required
//                 />
//                 <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Enter Password"
//                     required
//                 />
//                 <select
//                     value={status}
//                     defaultValue={status}
//                     onChange={(e) => setStatus(e.target.value)}
//                     required
//                 >
//                     <option value="true">Active</option>
//                     <option value="false">Inactive</option>
//                 </select>
//                 <button type="submit">Submit</button>
//             </form>
//         </div>
//     );
// }

// export default AddUsers;

import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

function AddUsers() {
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        displayName: Yup.string().required('Display Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
        status: Yup.string().required('Status is required'),
    });

    const formik = useFormik({
        initialValues: {
            displayName: '',
            email: '',
            username: '',
            password: '',
            status: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            axios.post("http://localhost:3000/api/v1/users", values)
                .then((response) => {
                    console.log(response);
                    navigate('/ShowUsers'); 
                })
                .catch((err) => {
                    console.error(err);
                });
        },
    });

    return (
        <div className="form-container">
            <h2>Add User</h2>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="displayName"
                        onChange={formik.handleChange}
                        value={formik.values.displayName}
                        placeholder="Enter Display Name"
                    />
                    {formik.errors.displayName && formik.touched.displayName && (
                        <div className="error">{formik.errors.displayName}</div>
                    )}
                </div>
                
                <div>
                    <input
                        type="email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        placeholder="Enter Email"
                    />
                    {formik.errors.email && formik.touched.email && (
                        <div className="error">{formik.errors.email}</div>
                    )}
                </div>
                
                <div>
                    <input
                        type="text"
                        name="username"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        placeholder="Enter Username"
                    />
                    {formik.errors.username && formik.touched.username && (
                        <div className="error">{formik.errors.username}</div>
                    )}
                </div>
                
                <div>
                    <input
                        type="password"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        placeholder="Enter Password"
                    />
                    {formik.errors.password && formik.touched.password && (
                        <div className="error">{formik.errors.password}</div>
                    )}
                </div>

                <div>
                    <select
                        name="status"
                        onChange={formik.handleChange}
                        value={formik.values.status}
                    >
                        <option value="">Select Status</option>
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                    {formik.errors.status && formik.touched.status && (
                        <div className="error">{formik.errors.status}</div>
                    )}
                </div>
                
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddUsers;
