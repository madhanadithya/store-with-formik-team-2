import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Route } from 'react-router-dom';
import EditUsers from './EditUser';

const UserDetails = () => {
    const [user, setUser] = useState(null); // Initialize as null or an empty object
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userId } = useParams(); // Extract userId from URL parameters
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/users/${userId}`)
            .then((response) => {
                setUser(response.data.user); // Directly set the single user object
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [userId]);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/v1/users/${userId}`);
            alert("User Deleted");
            // Optionally navigate away or show a success message here
        } catch (err) {
            setError(err.message || 'An error occurred while deleting the user.');
        }
    };

    function handleUpdate() {
        navigate(`/users/update/${userId}`);
        }

    if (loading) return <p className="loading-message">Loading...</p>;
    if (error) return <p className="error-message">Error: {error}</p>;

    return (
        <div className="admin-page">
            {user ? (
                <div className="user-item">
                    <h2 className="user-name">{user.displayName}</h2>
                    <p className="user-email">{user.email}</p>
                    <p className="user-username">{user.username}</p>
                    <p className="user-role">{user.role?.name}</p>
                    <p className="user-status">{user.status ? "Approved" : "Blocked"}</p>
                    <button 
                        className="delete-button" 
                        onClick={handleDelete}>
                        Delete
                    </button>
                    <button 
                        className="delete-button" 
                        onClick={handleUpdate}>
                        Update
                    </button>
                </div>
            ) : (
                <p>No user found.</p>
            )}
        </div>
    );
};

export default UserDetails;