import React from 'react';
import { useParams } from 'react-router-dom';
import summaryApi from './../common/index';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import './catagoryProduct.css';

const CatagoryProduct = () => {
  const [catagoryList, setCatagoryList] = useState([]);
  const { catagory } = useParams();

  const fetchCatagory = async () => {
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
        const filteredData = data.data.filter(item => item.catagory === catagory);
        setCatagoryList(filteredData);
      } else {
        toast.error(data.message);
        throw new Error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchCatagory();
  }, [catagory]);

  const handleAddToCart = (product) => {
    // Implement add to cart functionality here
    toast.success(`${product.productName} added to cart!`);
  };

  return (
    <div className="category-product-container">
      <h2 className="category-title">Product Category: {catagory}</h2>
      <div className="product-list">
        {catagoryList.map((item, index) => (
          <div key={index} className="category-item">
            <h3 className="category-name">{item.catagory}</h3>
            <div className="product-grid">
              {item.products.map((product) => (
                <div key={product._id} className="product-card_catagory">
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
                    <span className="selling-price" style={{ color: 'red' }}>{product.productSellingPrice}</span>
                    <span className="original-price" style={{ color: 'green', textDecoration: 'line-through' }}>{product.productPrice}</span>
                    <span className='productOffer' style={{ color: 'red' }}>
                      {((product.productPrice - product.productSellingPrice) / product.productPrice * 100).toFixed(2)} % off
                    </span>
                  </p>
                  <p><strong>Brand:</strong> {product.productBrand}</p>
                  <p><strong>Description:</strong> {product.productDescription}</p>
                  <button onClick={() => handleAddToCart(product)} className="add-to-cart-btn">Add to Cart</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatagoryProduct;
