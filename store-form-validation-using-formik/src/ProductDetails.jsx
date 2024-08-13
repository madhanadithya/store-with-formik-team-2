import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/products/${id}`);
        setProduct(response.data.product);
      } catch (err) {
        setError("Error fetching product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]); 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="product-details">
      <h1>Product Details</h1>
      <p><b>Name:</b> {product.name}</p>
      <p><b>Price:</b> {product.price}</p>
      <p><b>Code:</b> {product.code}</p>
      {/* <p><b>ID:</b> {product._id}</p> */}
    </div>
  );
}

export default ProductDetails;
