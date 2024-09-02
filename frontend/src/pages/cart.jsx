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
  const [cartDetails, setCartDetails] = useState([]);
  const [totalPdt, setTotalPdt] = useState(0);

  const fetchCartNumber = async () => {
    try {
      const response = await fetch(summaryApi.countCartProduct.url, {
        method: summaryApi.countCartProduct.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.success) {
        // toast.success(data.message);
        setTotalPdt(data.data);
        console.log('Faulty Cart Number: ', data.data);

      } else {
        toast.error(data.message);
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error fetching cart number:', error);
      toast.error('Failed to fetch cart number');
    }
  }

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
        setCartDetails(data.data.cartProducts);
        // toast.success(data.message);
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



  const handleIncrease = async (cartStruct, e) => {
    e.preventDefault();
    e.stopPropagation();
    cartStruct.quantity += 1;

    const response = await fetch(summaryApi.cartEdit.url, {
      method: summaryApi.cartEdit.method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: cartStruct.productId,
        quantity: cartStruct.quantity
      }),
    })

    const data = await response.json();
    if (data.success) {
      toast.success(data.message);
      fetchCartProducts();
      fetchCartNumber();
    } else {
      toast.error(data.message);
    }
  };

  const handleDecrease = async (cartStruct, e) => {
    e.preventDefault();
    e.stopPropagation();
    cartStruct.quantity -= 1;

    // Ensure quantity does not go negative
    if (cartStruct.quantity < 1) {
      try {
        const response = await fetch(summaryApi.cartDelete.url, {
          method: summaryApi.cartDelete.method, // Ensure correct method
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId: cartStruct.productId,
          }),
        });

        const data = await response.json();
        if (data.success) {
          toast.success(data.message);
          fetchCartProducts(); // Refresh cart data
          fetchCartNumber();
        } else {
          toast.error(data.message);
          console.error('Delete failed:', data.message);
        }
      } catch (error) {
        toast.error('Error deleting product from cart.');
        console.error('Error:', error);
      }
    } else {
      try {
        const response = await fetch(summaryApi.cartEdit.url, {
          method: summaryApi.cartEdit.method,
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId: cartStruct.productId,
            quantity: cartStruct.quantity,
          }),
        });

        const data = await response.json();
        if (data.success) {
          toast.success(data.message);
          fetchCartProducts(); // Refresh cart data
        } else {
          toast.error(data.message);
          console.error('Update failed:', data.message);
        }
      } catch (error) {
        toast.error('Error updating product quantity.');
        console.error('Error:', error);
      }
    }
  };



  const calculateTotal = () => {
    let total = 0;
    for (let i = 0; i < cartProducts.length; i++) {
      total += Number((cartDetails[i].quantity) * (cartProducts[i].productSellingPrice));
    }
    return total;
  };

  const mrpTotal = () => {
    let total = 0;
    for (let i = 0; i < cartProducts.length; i++) {
      total += Number(cartDetails[i].quantity * cartProducts[i].productPrice);
    }
    return total;
  };

  useEffect(() => {
    fetchCartProducts();
    fetchCartNumber(); // Also fetch the total product count on mount
  }, []); // Add an empty array to only run on component mount


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
                cartProducts.map((product, idx) => (
                  <Link to={`/product/${product._id}`} key={product._id} className="cart-product-item">
                    <img
                      src={product.productPhotos[0] || 'placeholder.jpg'}
                      alt={product.productName}
                      className="cart-product-image"
                    />
                    <div className="cart-product-details">
                      <h4>{product.productName}</h4>
                      <p>
                        <span className="selling-price">₹{product.productSellingPrice}</span>
                        <span className="original-price">₹{product.productPrice}</span>
                        <span className="discount">
                          {((product.productPrice - product.productSellingPrice) / product.productPrice * 100).toFixed(2)}% OFF
                        </span>
                      </p>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={(e) => handleDecrease(cartDetails[idx], e)} style={{ cursor: 'pointer' }}>-</button>
                        <p>Quantity: {cartDetails[idx].quantity}</p>
                        <button onClick={(e) => handleIncrease(cartDetails[idx], e)} style={{ cursor: 'pointer' }}>+</button>
                      </div>
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
                <span>{totalPdt}</span>
              </div>
              <div className="summary-details" style={{ fontWeight: 'bold' }}>
                <span>Total Price:</span>
                <span style={{ color: 'green' }}>₹{calculateTotal().toFixed(2)}</span>
                <span style={{ textDecoration: 'line-through', color: 'red' }}>₹{mrpTotal().toFixed(2)}</span>
                <span style={{ color: 'red' }}>
                  ₹{((mrpTotal() - calculateTotal()) / mrpTotal() * 100).toFixed(2)} % OFF
                </span>
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