// addToCart.js
import { toast } from 'react-toastify';
import SummaryApi from '../common';

const addToCart = async (e, product, updateCartCount) => {
  e.preventDefault();
  e.stopPropagation();

  try {
    const response = await fetch(SummaryApi.addToCartProduct.url, {
      method: SummaryApi.addToCartProduct.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: product._id,
        quantity: 1,
      }),
    });

    const data = await response.json();

    if (data.success) {
      toast.success(data.message);
      updateCartCount(); // Update cart count after adding the product
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error('Error adding product to cart:', error);
    toast.error('Failed to add product to cart');
  }
};

export default addToCart;
