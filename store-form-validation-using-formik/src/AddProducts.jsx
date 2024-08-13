// import { useState } from "react";
// import axios from "axios";
// function Addproducts(){

//     let [name,setName] = useState("");
//     let [code,setCode] = useState("");
//     let [excerpt,setExcerpt] = useState("");
//     let [category,setCategory] = useState("66a7699850a2e44edc7c3962");
//     let [price,setPrice] = useState("");
//     let [data,setData] =useState ([{code : "pant", name : "name", excerpt: "Description", category: "66a7689688ba1a618c5e21cc", price: Number}]);

//     function nameChanged(e){
//         e.preventDefault();
//         setName(e.target.value);
//     }
//     function codeChanged(e){
//         e.preventDefault();
//         setCode(e.target.value);
//     }
//     function excerptChanged(e){
//         e.preventDefault();
//         setExcerpt(e.target.value);
//     }
//     function categoryChanged(e){
//         e.preventDefault();
//         setCategory(e.target.value);
//     }
//     function priceChanged(e){
//         e.preventDefault();
//         setPrice(e.target.value);
//     }

//     function Addproducts(){
//         let newdata = {code : code, name : name, excerpt: excerpt, category: "66a7699850a2e44edc7c3962", price: price};
//         axios
//         .post("http://localhost:3000/api/v1/products",newdata)
//         .then(function(response){
//             console.log(response)
//             setData(newdata);
//         })
//         .catch(function (err){
//             console.log(err)
//         })
//     }



//     return(
//         <div className="addproducts">
//             <input type="" value={name} onChange={nameChanged} placeholder="Enter Product Name"></input>
//             <input type="" value={code} onChange={codeChanged} placeholder=" Enter Product Code"></input>
//             <input type="" value={excerpt} onChange={excerptChanged} placeholder="Enter Description of the product"></input>
//             <input type="" value={category} onChange={categoryChanged} placeholder="Enter the category of the product"></input>
//             <input type="" value={price} onChange={priceChanged} placeholder="Enter the price of your product"></input>
//             <button onClick={Addproducts}>Submit</button> 

//         </div>
//     )
// }

// export default Addproducts;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import './AddProducts.css';

function Addproducts() {
  let [categories, setCategories] = useState([]);

  useEffect(function () {
    axios
      .get(`http://localhost:3000/api/v1/categories`)
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        alert("Server is not responding. Please try again later.");
        console.error(error);
      });
  }, []);


  const validationSchema = Yup.object({
    name: Yup.string().required("Product name is required"),
    code: Yup.string().required("Product code is required"),
    excerpt: Yup.string().required("Product description is required"),
    category: Yup.string().required("Category is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be a positive number")
      .min(0, "Price cannot be negative"),
    stock: Yup.number()
      .required("Stock is required")
      .integer("Stock must be an integer")
      .min(0, "Stock cannot be negative"),
  });

  return (
    <div className="addproducts">
      <Formik
        initialValues={{
          name: "",
          code: "",
          excerpt: "",
          category: "",
          price: 0,
          stock: 0,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          axios
            .post("http://localhost:3000/api/v1/products", values)
            .then(function (response) {
              console.log(response);
              resetForm();
            })
            .catch(function (err) {
              console.log(err);
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <Field
                type="text"
                name="name"
                placeholder="Enter Product Name"
              />
              <ErrorMessage name="name" component="div" />
            </div>
            <div>
              <Field
                type="text"
                name="code"
                placeholder="Enter Product Code"
              />
              <ErrorMessage name="code" component="div" />
            </div>
            <div>
              <Field
                type="text"
                name="excerpt"
                placeholder="Enter Description of the product"
              />
              <ErrorMessage name="excerpt" component="div" />
            </div>
            <div>
              <Field as="select" name="category">
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="category" component="div" />
            </div>
            <div>
              <Field
                type="number"
                name="price"
                placeholder="Enter the price of your product"
              />
              <ErrorMessage name="price" component="div" />
            </div>
            <div>
              <Field
                type="number"
                name="stock"
                placeholder="Enter the stock quantity"
              />
              <ErrorMessage name="stock" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Addproducts;