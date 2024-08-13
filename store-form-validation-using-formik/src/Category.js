import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryPage = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/categories');
        setCategories(response.data.categories);
      } catch (err) {
        setError('Error fetching categories.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);


  // const handleAddCategory = async (e) => {
  //   e.preventDefault();
  //   if (categoryName.trim() === '') {
  //     alert('Category name is required');
  //     return;
  //   }

  //   try {
  //     const response = await axios.post('http://localhost:3000/api/v1/categories', {
  //       name: categoryName,
  //       description: categoryDescription
  //     });
  //     setCategories([...categories, response.data.category]);
  //     setCategoryName('');
  //     setCategoryDescription('');
  //   } catch (err) {
  //     console.error('Error adding category:', err);
  //   }
  // };

  
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (categoryName.trim() === '') {
      alert('Category name is required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/v1/categories', {
        name: categoryName,
        description: categoryDescription
      });
      setCategories([...categories, response.data.category]);
      setCategoryName('');
      setCategoryDescription('');
      alert('Category added successfully!');
    } catch (err) {
      console.error('Error adding category:', err);
    }
  };


  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/categories/${id}`);
      setCategories(categories.filter(category => category._id !== id));
    } catch (err) {
      console.error('Error deleting category:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Add Categories</h1>
      <form onSubmit={handleAddCategory}>
        <div>
          <label htmlFor="name">Category Name and Description</label>
          <input
            type="text"
            id="name"
            placeholder='Enter the name of a Category..'
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </div>
        <div>
          {/* <label htmlFor="description">Description</label> */}
          <textarea
            id="description"
            placeholder='Enter the Description of a Category..'
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Add Category</button>
      </form>

      <h2>Category List</h2>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            <h3>{category.name}</h3>
            <p>{category.description}</p>
            <button onClick={() => handleDeleteCategory(category._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPage;

