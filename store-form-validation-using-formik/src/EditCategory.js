import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditCategory.css';

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/categories/${id}`)
      .then(response => {
        setName(response.data.category.name);
        setDescription(response.data.category.description);
      })
      .catch(error => console.error('Error fetching category:', error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/api/v1/categories/${id}`, { name, description })
      .then(() => {
        navigate('/'); 
      })
      .catch(error => console.error('Error updating category:', error));
  };

  return (
    <div className="edit-category-container">
      <h2>Edit Category</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label><br/><br/>
        <label>
          Description:   
          <textarea value={description} rows={4} cols={36} onChange={(e) => setDescription(e.target.value)} required />
        </label><br/>
        <button type="submit">Update</button><br/>
        <button type="button" onClick={() => navigate('/Category')}>Cancel</button>
      </form>
    </div>
  );
};

export default EditCategory;