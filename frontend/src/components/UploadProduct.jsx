import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './UploadProduct.css';
import ProductCatagory from './../helper/productCatagory'; 
import { toast } from 'react-toastify';
import uploadImage from './../helper/uploadImage';
import DisplayImage from './../components/DisplayImage'; 
import { MdDelete } from "react-icons/md";
import summeryAPI from './../common/index';

const UploadProduct = () => {
  const [activeImg, setActiveImg] = useState('');
  const [productPhotos, setProductPhotos] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Add productPhotos URLs to the data object
    const formData = {
      ...data,
      productPhotos,
    };

    console.log(formData);
    try {
      const response = await fetch(summeryAPI.upload_product.url, {
        method: summeryAPI.upload_product.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });
      const result = await response.json();
      if (result?.success) {
        toast.success(result.message);
        navigate('/'); // Navigate to the home page
      } 
      else {
        toast.error(result?.message);
      }
    } catch (error) {
      toast.error("Failed to submit product data");
    }
  };

  const handleUploadPic = async (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      try {
        const uploadedPhotos = await Promise.all(
          Array.from(files).map(async (file) => {
            const uploadImageCloudinary = await uploadImage(file);
            return uploadImageCloudinary.url;
          })
        );
        setProductPhotos(prev => [...prev, ...uploadedPhotos]); // Accumulate photos instead of replacing
      } catch (error) {
        toast.error("Image upload failed");
      }
    }
  };

  const handleZoomClick = (url) => {
    setActiveImg(url); 
  };

  const closeZoom = () => {
    setActiveImg(''); 
  };

  const handleDelete = (url) => {
    setProductPhotos(productPhotos.filter((photo) => photo !== url));
  };

  return (
    <div className='upload-product'>
      <h4>Upload Product</h4>
      <form onSubmit={handleSubmit(onSubmit)} className="upload-product-form">
        <input {...register("productName", { required: true })} placeholder='Product Name' aria-label="Product Name" />
        {errors.productName && <p className="error">Product name is required</p>}

        <input {...register("productBrand", { required: true })} placeholder='Product Brand' aria-label="Product Brand" />
        {errors.productBrand && <p className="error">Product Brand is required</p>}

        <input type="number" {...register("productPrice", { required: true })} placeholder='Product Price' aria-label="Product Price" />
        {errors.productPrice && <p className="error">Product price is required</p>}

        <select {...register("productCategory", { required: true })} className="category-select" aria-label="Product Category">
          <option value="">Select Category</option>
          {ProductCatagory.map((category) => (
            <option value={category.value} key={category.id}>
              {category.label}
            </option>
          ))}
        </select>
        {errors.productCategory && <p className="error">Product category is required</p>}

        <textarea {...register("productDescription", { required: true })} placeholder='Product Description' aria-label="Product Description" />
        {errors.productDescription && <p className="error">Product description is required</p>}

        <input type="file" multiple onChange={handleUploadPic} aria-label="Upload Product Photos" />
        {productPhotos.length > 0 && (
          <div className="product-preview">
            {productPhotos.map((photo, index) => (
              <div key={`${photo}-${index}`} className="product-photo-container">
                <img
                  src={photo}
                  alt={`Product Preview ${index + 1}`}
                  className="product-photo"
                  onClick={() => handleZoomClick(photo)}
                />
                <MdDelete className="delete-icon" onClick={() => handleDelete(photo)}/>
              </div>
            ))}
          </div>
        )}
        <input type="number" {...register("productSellingPrice", { required: true })} placeholder='Product Selling Price' aria-label="Product Selling Price" />
        {errors.productSellingPrice && <p className="error">Product selling price is required</p>}

        <button type="submit" className="submit-button" disabled={!productPhotos.length}>Submit</button>
      </form>

      {activeImg && <DisplayImage onClose={closeZoom} imgUrl={activeImg}/>}
    </div>
  );
};

export default UploadProduct;
