// //import logo from './logo.svg';
// import './App.css';
// import ShowProducts from './ShowProducts';
// import ProductDetails from './ProductDetails';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Addproducts from './AddProducts';
// import UserDetails from './UserDetails';
// import CategoryPage from './Category';
// import EditUsers from './EditUser';
// import ShowUsers from './ShowUsers';
// import AddUsers from './AddUsers';
// import RoleForm from './RoleForm';

// function App() {
//   return (
//     <>
//       <div className="App">

//       <Router>
//         <Routes>
//           <Route path="/" element={<ShowProducts />} />
//           <Route path="/admin/category" element={<CategoryPage/>} />
//           <Route path="/products/:id" element={<ProductDetails />} />
//           <Route path='/addProduct' element={<Addproducts/>}/>
                    
//           <Route path='/admin/users' element={<AddUsers/>}> </Route>


//           <Route path="/showUsers" element={<ShowUsers/>} /> 
//           <Route path="/users/:userId" element={<UserDetails/>} /> 
//           <Route path="/users/update/:userId" element={<EditUsers/>}/>

//           <Route path='/role' element={<RoleForm/>}/>
          

    
//         </Routes>
//       </Router>
      

//       </div>
    
//     </>
    
//   );
// }

// export default App;





import React from 'react';
// import './App.css';
import ShowProducts from './ShowProducts';
import ProductDetails from './ProductDetails';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Addproducts from './AddProducts';
import UserDetails from './UserDetails';
import CategoryPage from './Category';
import EditUsers from './EditUser';
import ShowUsers from './ShowUsers';
import AddUsers from './AddUsers';
import RoleForm from './RoleForm';
import Navbar from './Navbar'; 
import CategoryList from './CategoryList';
import CreateCategory from './CreateCategory';
import EditCategory from './EditCategory';



function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>

          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/addProduct" element={<Addproducts />} />


          <Route path="/AddUsers" element={<AddUsers />} />
          <Route path="/ShowUsers" element={<ShowUsers />} />

          {/* <Route path="/users/:userId" element={<UserDetails />} /> */}
          <Route path="/role" element={<RoleForm />} />

          <Route path="Category" element={<CategoryList />}>
                <Route path="create" element={<CreateCategory />} />
                <Route path="edit/:id" element={<EditCategory />} />
          </Route>

        </Routes>
      </div>
    </Router>
  );
}

export default App;

