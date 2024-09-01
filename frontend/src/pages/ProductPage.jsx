import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import AddToCart from './../helper/addToCart';
import { FaStarHalf, FaStar } from "react-icons/fa";
import Loading from './../helper/Spinner';
import Context from './../context/index';
import './ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  const [pdt, setPdt] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState('');
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);
  const [catagoryList, setCatagoryList] = useState([]);

  // Ensure to get `fetchCartProducts` correctly from context
  const { fetchCartProducts } = useContext(Context);

  const fetchCatagory = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.get_catagoryProduct.url, {
        method: SummaryApi.get_catagoryProduct.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (data.success) {
        if (data.data.length >= 3) {
          const generateUniqueRandomNumbers = (max, count) => {
            const numbers = new Set();
            while (numbers.size < count) {
              const rand = Math.floor(Math.random() * max);
              numbers.add(rand);
            }
            return Array.from(numbers);
          };

          const [rand1, rand2, rand3] = generateUniqueRandomNumbers(data.data.length, 3);
          setCatagoryList([data.data[rand1], data.data[rand2], data.data[rand3]]);
        } else {
          toast.error('Not enough categories available');
        }
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error('Failed to load categories. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchPdtById = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.get_productById.url, {
        method: SummaryApi.get_productById.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: id,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setPdt(data.data);
        setSelectedPhoto(data.data.productPhotos[0]);
      } else {
        throw new Error(data.message || 'Failed to load product');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to load product. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPdtById();
    fetchCatagory();
  }, [id]);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => {
    setShowZoom(true);
  };

  const handleMouseLeave = () => {
    setShowZoom(false);
  };

  if (loading) {
    return <div><Loading /></div>;
  }

  if (!pdt.productPhotos || pdt.productPhotos.length === 0) {
    return <div>No product images available.</div>;
  }

  return (
    <div className="product-page">
      <div className='pdt-devider'>
        {/* Sidebar with thumbnails */}
        <div className="product-thumbnails">
          {pdt.productPhotos.map((photo, index) => (
            <img
              src={photo}
              alt={`Product ${index}`}
              key={index}
              className={`thumbnail-photo ${selectedPhoto === photo ? 'selected' : ''}`}
              onMouseEnter={() => setSelectedPhoto(photo)}
            />
          ))}
        </div>

        {/* Main display of the selected photo */}
        <div
          className="product-main-photo"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img src={selectedPhoto} alt="Selected Product" className="main-photo" />
        </div>
          
        {showZoom ? (
          <div
            className="zoom-photo"
            style={{
              backgroundImage: `url(${selectedPhoto})`,
              backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`
            }}
          />
        ) : null}
        
        {/* Product details */}
        <div className="product-info">
          <h1 className="product-name">{pdt.productName || 'Product Name'}</h1>
          <span className="product-rating"><FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalf /></span>
          <p className="product-category">{pdt.productCategory?.toUpperCase() || 'Product Category'}</p>
          <div className="product-pricing-container">
            <div className="product-pricing">
              <span className="product-offer">
                {-((pdt.productPrice - pdt.productSellingPrice) / pdt.productPrice * 100).toFixed(2)}%
              </span>
              <span className="product-selling-price">₹{pdt.productSellingPrice}</span>
            </div>
            <p className="product-price">MRP: <span style={{ textDecoration: 'line-through' }}>₹{pdt.productPrice}</span></p>
          </div>
          <p><strong>Description:</strong> {pdt.productDescription}</p>
          <button className="add-to-cart-btn"><Link to='#' style={{ color: 'white' }}>Buy Now</Link></button>
          <button onClick={(e) => AddToCart(e, pdt, fetchCartProducts)} className="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>

      <div className="recomended-product">
        {catagoryList.map((item, index) => (
          <div key={index} className="catagory-item">
            <h3 className="catagory-name">Top's {item.catagory.toUpperCase()}</h3>
            <div className="product-slider">
              {item.products.map((product) => (
                <Link to={`/product/${product._id}`} key={product._id} className="product-card">
                  <img
                    src={product.productPhotos[0] || 'placeholder.jpg'}
                    alt={product.productName}
                    className="product-photo"
                  />
                  <h4>{product.productName}</h4>
                  <div className="product-pricing" style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <p className="product-selling-price" style={{ color: 'red' }}>₹{product.productSellingPrice}</p>
                    <p className="product-price" style={{ color: 'green' }}>₹{product.productPrice}</p>
                    <p className='productOffer' style={{ color: 'red' }}>
                      {((product.productPrice - product.productSellingPrice) / product.productPrice * 100).toFixed(2)} % off
                    </p>
                  </div>
                  <p><strong>Brand: </strong>{product.productBrand}</p>
                  <p><strong>Description: </strong>{product.productDescription}</p>
                  <button onClick={(e) => AddToCart(e, product, fetchCartProducts)} className="add-to-cart-btn">Add to Cart</button>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
