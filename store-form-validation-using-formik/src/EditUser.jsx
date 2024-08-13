import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import logo from "./logo.svg"

function EditUsers() {
    const { userId } = useParams();
    let [data, setData] = useState([{ email: "@email.com", displayname: "displayname", username: "Username", password: "A12", status: true }]);
    let [displayname, setdisplayName] = useState("");
    let [email, setemail] = useState("");
    let [username, setusername] = useState("");
    let [password, setpassword] = useState("");
    let [status, setstatus] = useState(true);
    let [imageUrl,setImageurl] = useState(logo);

    const navigate = useNavigate();


    useEffect(function () {
        axios
            .get(`http://localhost:3000/api/v1/users/${userId}`)
            .then(function (response) {
                console.log(response);
                setData(response.data.user);
            })
    }, [])

    function displaynameChanged(e) {
        e.preventDefault();
        setdisplayName(e.target.value);
    }
    function emailChanged(e) {
        e.preventDefault();
        setemail(e.target.value);
    }
    function usernameChanged(e) {
        e.preventDefault();
        setusername(e.target.value);
    }
    function passwordChanged(e) {
        e.preventDefault();
        setpassword(e.target.value);
    }

    function statusChanged(e) {
        e.preventDefault();
        setstatus(e.target.value);
    }

    function urlChanged(e) {
        e.preventDefault();
        setImageurl(e.target.value);
    }

    function EditUser() {
        let newdata = { avatar : imageUrl, email: email, displayName: displayname, username: username, password: "", status: status };
        axios
            .put(`http://localhost:3000/api/v1/users/${userId}`, newdata)
            .then(function (response) {
                console.log(response)
                setData(newdata);
            })
            .catch(function (err) {
                console.log(err)
            })
            alert("Details Updated");
            navigate(`/`);
    }

    return (
        <div className="addproducts">
            <h3>Update User Details</h3>
            <img src={imageUrl} alt="User Icon" height="200px" width="200px"/>
            <input type="text" value={displayname} onChange={displaynameChanged} placeholder="Update displayName"></input>
            <input type="email" value={email} onChange={emailChanged} placeholder="Update email"></input>
            <input type="text" value={username} onChange={usernameChanged} placeholder="Update Description"></input>
            <input type="password" value={password} onChange={passwordChanged} placeholder="Update password"></input><br/>
            <input type="text" value={imageUrl} onChange={urlChanged} placeholder="add image url"></input><br/>
            <select onChange={statusChanged} defaultValue={status}>
                <option value="true">Active</option>
                <option value="false">InActive</option>
            </select>
            <button id="updateBtn" onClick={EditUser}>Update Details</button>
        </div>
    )
}

export default EditUsers;
