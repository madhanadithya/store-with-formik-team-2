import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import './AddProducts.css'

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
      .min(0, "Price cannot be negative")
      .positive("Price must be a positive number"),
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
