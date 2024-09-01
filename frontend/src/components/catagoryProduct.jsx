// CatagoryProduct.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import summaryApi from '../common';
import { toast } from 'react-toastify';
import Spinner from '../helper/Spinner';
import AddToCart from '../helper/addToCart';
import Context from '../context'; // Ensure correct import path
import './catagoryProduct.css';

const CatagoryProduct = () => {
  const [catagoryList, setCatagoryList] = useState([]);
  const { catagory } = useParams();
  const [loading, setLoading] = useState(false);
  const { fetchCartProducts } = useContext(Context); // Context to update cart count

  // Fetch products based on category
  const fetchCatagory = async () => {
    setLoading(true);
    try {
      const response = await fetch(summaryApi.get_catagoryProduct.url, {
        method: summaryApi.get_catagoryProduct.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        // Filter products based on selected category
        const filteredData = data.data.filter(item => item.catagory === catagory);
        setCatagoryList(filteredData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching category products:', error);
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatagory();
  }, [catagory]);

  return (
    <div className="category-product-container">
      {loading && <Spinner />}
      <h2 className="category-title">Product Category: {catagory.toUpperCase()}</h2>
      <div className="product-list">
        {catagoryList.map((item, index) => (
          <div className="category-item" key={index}>
            <div className="product-grid">
              {item.products.map((product) => (
                <Link to={`/product/${product._id}`} key={product._id} className="product-card_catagory">
                  <div className="product-photo-container">
                    <img
                      src={product.productPhotos[0] || 'placeholder.jpg'}
                      alt={product.productName}
                      className="product-photo"
                    />
                  </div>
                  <h4 className="product-name">{product.productName}</h4>
                  <p className="price-container">
                    <strong>Price:</strong>
                    <span className="selling-price" style={{ color: 'red' }}>
                      ₹{product.productSellingPrice}
                    </span>
                    <span className="original-price" style={{ color: 'green', textDecoration: 'line-through' }}>
                      ₹{product.productPrice}
                    </span>
                    <span className="productOffer" style={{ color: 'red' }}>
                      {((product.productPrice - product.productSellingPrice) / product.productPrice * 100).toFixed(2)}% off
                    </span>
                  </p>
                  <p><strong>Brand:</strong> {product.productBrand}</p>
                  <p><strong>Description:</strong> {product.productDescription}</p>
                  <button onClick={(e) => AddToCart(e, product, fetchCartProducts)} className="add-to-cart-btn">
                    Add to Cart
                  </button>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatagoryProduct;
