import React, { useEffect, useState } from 'react';
import summaryApi from './../common/index';
import { toast } from 'react-toastify';
import Spinner from '../helper/Spinner';
import './cart.css';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchCartProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(summaryApi.cartView.url, {
        method: summaryApi.cartView.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        setCartProducts(data.data.products);
        setUser(data.data.user);
        toast.success(data.message);
        console.log('Fetched Data: ', data.data);
      } else {
        toast.error(data.message);
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error fetching cart products:', error);
      toast.error('Failed to fetch cart products');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    let total = 0;
    for (let i = 0; i < cartProducts.length; i++) {
      total += Number(cartProducts[i].productSellingPrice);
    }
    return total;
  };

  const mrpTotal = () => {
    let total = 0;
    for (let i = 0; i < cartProducts.length; i++) {
      total += Number(cartProducts[i].productPrice);
    }
    return total;
  };

  useEffect(() => {
    fetchCartProducts();
  }, []);

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Cart View</h2>
      <div className="cartProductView">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="cart-products">
              {cartProducts.length > 0 ? (
                cartProducts.map((product) => (
                    <Link to={`/product/${product._id}`} key={product._id} className="cart-product-item">
                    <img
                      src={product.productPhotos[0] || 'placeholder.jpg'}
                      alt={product.productName}
                      className="cart-product-image"
                    />
                    <div className="cart-product-details">
                      <h4>{product.productName}</h4>
                      <p >
                        <span className="selling-price">₹{product.productSellingPrice}</span>
                        <span className="original-price">₹{product.productPrice}</span>
                        <span className="discount">{((product.productPrice - product.productSellingPrice) / product.productPrice * 100).toFixed(2)}% OFF</span>
                      </p>
                      <p>Quantity: {product.quantity}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <p>No products in the cart.</p>
              )}
            </div>
            <div className="cart-summary">
              <h3>Summary</h3>
              <div className="summary-details">
                <span>Total Items:</span>
                <span>{cartProducts.reduce((total, product) => total + product.quantity, 0)}</span>
              </div>
              <div className="summary-details" style={{fontWeight: 'bold'}}>
                <span>Total Price:</span>
                <span style={{color: 'green'}}>₹{calculateTotal().toFixed(2)}</span>
                <span style={{ textDecoration: 'line-through' ,color: 'red'}} >₹{mrpTotal().toFixed(2)}</span>
                <span style={{color: 'red'}}>₹{((mrpTotal() - calculateTotal())/mrpTotal()*100).toFixed(2)} % OFF</span>
              </div>
              <div className="summary-total">
                <span>Grand Total:</span>
                <span> ₹{calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
