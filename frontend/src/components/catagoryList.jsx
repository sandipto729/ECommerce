import React, { useState, useEffect } from 'react';
import summaryApi from './../common/index';
import { toast } from 'react-toastify';
import './CatagoryList.css';
import { Link } from 'react-router-dom';
import BannerProduct from './bannerProduct';
import Spinner from './../helper/Spinner'; // Import Spinner correctly
import AddToCart from '../helper/addToCart';
import { useContext } from 'react';
import Context from './../context/index';

const CatagoryList = () => {
  const [catagoryList, setCatagoryList] = useState([]);
  const [loading, setLoading] = useState(false);

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
        setCatagoryList(data.data);
      } else {
        toast.error(data.message);
        throw new Error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error('Failed to load categories. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatagory();
  }, []);

  const {fetchCartProducts} =useContext(Context); 

  return (
    <div className="catagory-container">
      {loading && <Spinner />}
      <div className="catagory-header">
        {catagoryList.map((item, index) => (
          <Link to={`/product-catagory/${item.catagory}`} key={index} className="catagory-header-item">
            <img
              src={item.products[0]?.productPhotos[0] || 'placeholder.jpg'}
              alt={item.catagory}
              className="catagory-header-photo"
            />
            <p className="catagory-header-name">{item.catagory.toUpperCase()}</p>
          </Link>
        ))}
      </div>

      <BannerProduct />

      <h3 className="catagory-title">Category Wise Product</h3>
      {catagoryList.map((item, index) => (
        <div key={index} className="catagory-item">
          <h3 className="catagory-name">Top's {item.catagory.toUpperCase()}</h3>
          <div className="product-slider">
            {item.products.map((product) => (
              <Link to={`/product/${product._id}`} key={product._id} className="product-card" >
                <img
                  src={product.productPhotos[0] || 'placeholder.jpg'}
                  alt={product.productName}
                  className="product-photo"
                />
                <h4>{product.productName}</h4>
                <div className="product-pricing" style={{ display: 'flex' , justifyContent: 'flex-start'}}>
                  <p className="product-selling-price" style={{ color: 'red' }}>₹{product.productSellingPrice}</p>
                  <p className="product-price" style={{ color: 'green' }}>₹{product.productPrice}</p>
                  <p className='productOffer' style={{ color: 'red' }}>
                    {((product.productPrice - product.productSellingPrice) / product.productPrice * 100).toFixed(2)} % off
                  </p>
                </div>
                <p><strong>Brand: </strong>{product.productBrand}</p>
                <p><strong>Description: </strong>{product.productDescription}</p>
                <button onClick={(e) => AddToCart(e,product,fetchCartProducts)} className="add-to-cart-btn">Add to Cart</button>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CatagoryList;
