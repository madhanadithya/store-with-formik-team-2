/* import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateCategory.css'; // Ensure this file is updated accordingly

const CreateCategory = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/v1/categories', { name, description })
      .then(() => {
        alert("Category Created Successfully!! :)")
        navigate('/'); 
      })
      .catch(error => console.error('Error creating category:', error));
  };

  return (
    <div className="create-category-container">
      <h2>Create Category</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label><br/><br/>
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label><br/>
        <button type="submit">Create</button><br/>
        <button type="button" onClick={() => navigate('/Category')}>Cancel</button>
      </form>
    </div>
  );
};

export default CreateCategory; */

// import React from 'react';
// import axios from 'axios';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useNavigate } from 'react-router-dom';
// import './CreateCategory.css'; // Ensure this file is updated accordingly

// // Validation schema with Yup
// const validationSchema = Yup.object({
//   name: Yup.string().required('Name is required'),
//   description: Yup.string().required('Description is required')
// });

// const CreateCategory = () => {
//   const navigate = useNavigate();

//   // Formik hook
//   const formik = useFormik({
//     initialValues: {
//       name: '',
//       description: ''
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values) => {
//       axios.post('http://localhost:3000/api/v1/categories', values)
//         .then(() => {
//           alert('Category Created Successfully!! :)');
//           navigate('/'); 
//         })
//         .catch(error => console.error('Error creating category:', error));
//     }
//   });

//   return (
//     <div className="create-category-container">
//       <h2>Create Category</h2>
//       <form onSubmit={formik.handleSubmit}>
//         <div>
//           <label htmlFor="name">Name:</label>
//           <input
//             id="name"
//             type="text"
//             {...formik.getFieldProps('name')}
//           />
//           {formik.touched.name && formik.errors.name ? (
//             <div className="error">{formik.errors.name}</div>
//           ) : null}
//         </div>
//         <br />
//         <div>
//           <label htmlFor="description">Description:</label>
//           <textarea
//             id="description"
//             rows={4}
//             cols={36}
//             {...formik.getFieldProps('description')}
//           />
//           {formik.touched.description && formik.errors.description ? (
//             <div className="error">{formik.errors.description}</div>
//           ) : null}
//         </div>
//         <br />
//         <button type="submit">Create</button>
//         <br />
//         <button type="button" onClick={() => navigate('/Category')}>Cancel</button>
//       </form>
//     </div>
//   );
// };

// export default CreateCategory;




import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './CreateCategory.css'; // Ensure this file is updated accordingly

// Validation schema with Yup
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required')
});

const CreateCategory = () => {
  const navigate = useNavigate();

  // Formik hook
  const formik = useFormik({
    initialValues: {
      name: '',
      description: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Form values:', values); // Debugging: Check form values
      axios.post('http://localhost:3000/api/v1/categories', values)
        .then(response => {
          console.log('Response:', response); // Debugging: Check response
          alert('Category Created Successfully!! :)');
          navigate('/'); // Redirect after successful creation
        })
        .catch(error => {
          console.error('Error creating category:', error);
          alert('Failed to create category. Please try again.'); // User-friendly error message
        });
    }
  });

  return (
    <div className="create-category-container">
      <h2>Create Category</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            {...formik.getFieldProps('name')}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
        </div>
        <br />
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            rows={4}
            cols={36}
            {...formik.getFieldProps('description')}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="error">{formik.errors.description}</div>
          ) : null}
        </div>
        <br />
        <button type="submit">Create</button>
        <br />
        <button type="button" onClick={() => navigate('/Category')}>Cancel</button>
      </form>
    </div>
  );
};

export default CreateCategory;
