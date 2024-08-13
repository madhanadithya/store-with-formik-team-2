import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CategoryList.css';
import './CreateCategory.css';
import './EditCategory.css';
import { Link, Outlet } from 'react-router-dom';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios.get('http://localhost:3000/api/v1/categories')
      .then(response => setCategories(response.data.categories))
      .catch(error => console.error('Error fetching categories:', error));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/api/v1/categories/${id}`)
      .then(() => {
        setCategories(categories.filter(category => category._id !== id));
      })
      .catch(error => console.error('Error deleting category:', error));
  };

  return (
    <div className='Categorylist'>
      <h1>Category List</h1>
      <Link to="create" className='new'>Create Category</Link>
      <div className="Outer">
        {categories.map(category => (
          <div key={category._id}>
            <h2>{category.name}</h2>
            <p>{category.description}</p><br/>
            <span><Link to={`edit/${category._id}`} className='editButton' style={{textDecoration:'none'}}>Edit</Link></span>
            <button onClick={() => handleDelete(category._id)}>Delete</button><br/><br/>
          </div>
        ))}
        </div>
      <Outlet /> 
    </div>
  );
};

export default CategoryList;
