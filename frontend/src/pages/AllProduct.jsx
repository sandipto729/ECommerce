import React, { useEffect, useState } from 'react';
import './AllProduct.css';
import UploadProduct from './../components/UploadProduct';
import { toast } from 'react-toastify';
import summeryAPI from './../common/index';
import { MdEdit } from "react-icons/md";
import EditProduct from './../components/EditProduct'; // Corrected import

const Product = () => {
  const [allProduct, setAllProduct] = useState([]);
  const [uploadProduct, setUploadProduct] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch(summeryAPI.all_product.url, {
        method: summeryAPI.all_product.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

      if (data.success) {
        setAllProduct(data.data);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      toast.error('Failed to fetch products. Please try again later.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="product-container">
      <div className="productAll">
        <h2>All Products</h2>
        <button onClick={() => setUploadProduct(!uploadProduct)}>
          {uploadProduct ? 'Close Product' : 'Upload Product'}
        </button>
      </div>

      {/* Display products */}
      <div className='product-display'>
        {allProduct.length > 0 ? (
          allProduct.map((product) => (
            <div className='product-card' key={product._id}>
              <img src={product.productPhotos[0]} alt={product.productName} />
              <h3>{product.productName}</h3>
              {/* <p>{product.productDescription}</p> */}
              {/* <p>{product.productPrice}</p>
              <p>{product.productCategory}</p>
              <p>{product.productBrand}</p> */}
              <p><strong>Price : </strong>{product.productSellingPrice}</p>
              <MdEdit onClick={() => setActiveProduct(product)} className='edit'/>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>

      {/* Upload product */}
      {uploadProduct && (
        <div className="upload-product-container">
          <UploadProduct />
        </div>
      )}

      {/* Edit product */}
      {activeProduct && (
        <div className="edit-product-container">
          <EditProduct product={activeProduct} /> {/* Use the correct component name */}
          
        </div>
      )}
    </div>
  );
};

export default Product;
