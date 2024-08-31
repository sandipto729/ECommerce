import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import ProductCatagory from './../helper/productCatagory';
import { MdDelete } from "react-icons/md";
import './EditProduct.css';
import summeryAPI from './../common/index';
import { toast } from 'react-toastify'; // Make sure to install and import this
import { useNavigate } from 'react-router-dom'; // Make sure to install and import this

const EditProduct = ({ product }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: product,
  });

  const [productPhotos, setProductPhotos] = useState(product.productPhotos || []);
  const navigate = useNavigate(); // For navigation

  const onSubmit = async (data) => {
    try {
      const response = await fetch(summeryAPI.update_product.url, {
        method: summeryAPI.update_product.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result?.success) {
        toast.success(result.message);
        navigate('/admin-panel/product'); // Navigate to the product page
      } else {
        toast.error(result?.message);
      }
    } catch (error) {
      toast.error('An error occurred while updating the product.');
      console.error('Error updating product:', error);
    }
  };

  const handleUploadPic = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map(file => URL.createObjectURL(file));
    setProductPhotos([...productPhotos, ...newPhotos]);
  };

  const handleDelete = (photo) => {
    setProductPhotos(prevPhotos => {
      const updatedPhotos = prevPhotos.filter(p => p !== photo);
      URL.revokeObjectURL(photo);
      return updatedPhotos;
    });
  };

  useEffect(() => {
    // Cleanup: Revoke all URLs when component unmounts
    return () => {
      productPhotos.forEach(photo => URL.revokeObjectURL(photo));
    };
  }, [productPhotos]);

  return (
    <div className="EditProduct">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="EditProductForm">
        <div className="form-group">
          <label htmlFor="productName" className="form-label">Product Name</label>
          <input 
            id="productName"
            {...register("productName")} 
            placeholder='Product Name' 
            aria-label="Product Name" 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="productBrand" className="form-label">Product Brand</label>
          <input 
            id="productBrand"
            {...register("productBrand")} 
            placeholder='Product Brand' 
            aria-label="Product Brand" 
          />
        </div>

        <div className="form-group">
          <label htmlFor="productPrice" className="form-label">Product Price</label>
          <input 
            id="productPrice"
            type="number" 
            {...register("productPrice", { required: true })} 
            placeholder='Product Price' 
            aria-label="Product Price" 
          />
        </div>

        <div className="form-group">
          <label htmlFor="productCategory" className="form-label">Product Category</label>
          <select 
            id="productCategory"
            {...register("productCategory")} 
            aria-label="Product Category"
          >
            <option value="">Select Category</option>
            {ProductCatagory.map((category) => (
              <option value={category.value} key={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="productDescription" className="form-label">Product Description</label>
          <textarea 
            id="productDescription"
            {...register("productDescription")} 
            placeholder='Product Description' 
            aria-label="Product Description"
          />
          {errors.productDescription && <p className="text-red-500">Product description is required</p>}
        </div>

        <div className="form-group">
          <label htmlFor="productPhotos" className="form-label">Upload Product Photos</label>
          <input 
            id="productPhotos"
            type="file" 
            multiple 
            onChange={handleUploadPic} 
            aria-label="Upload Product Photos" 
          />
        </div>

        {/* Displaying the photo previews */}
        {productPhotos.length > 0 && (
          <div className="updatedProductPhotosdiv">
            {productPhotos.map((photo, index) => (
              <div key={index} className="relative">
                <img
                  src={photo}
                  alt={`Product Preview ${index + 1}`}
                  className="updatedProductPhoto"
                />
                <MdDelete 
                  className="absolute top-0 right-0 text-red-500 cursor-pointer text-xs bg-white p-1 rounded-full" 
                  onClick={() => handleDelete(photo)} 
                />
              </div>
            ))}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="productSellingPrice" className="form-label">Product Selling Price</label>
          <input 
            id="productSellingPrice"
            type="number" 
            {...register("productSellingPrice")} 
            placeholder='Product Selling Price' 
            aria-label="Product Selling Price" 
          />
          {errors.productSellingPrice && <p className="text-red-500">Product selling price is required</p>}
        </div>

        <button 
          type="submit" 
          className="save-button"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
