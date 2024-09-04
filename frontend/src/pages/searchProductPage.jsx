
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SearchProductPage = () => {
  const [productList, setProductList] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');

  const fetchProduct = async () => {
    try {
      const response = await fetch(`${SummaryApi.searchProduct.url}?q=${query}`, {
        method: SummaryApi.searchProduct.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log('data:', data);

      if (data.success) {
        setProductList(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    }
  };

  useEffect(() => {
    if (query) {
      fetchProduct();
    }
  }, [query]);

  return (
    <div>
      {productList.length > 0 ? (
        productList.map((product) => (
          <div key={product._id}>
            <Link to={`/product/${product._id}`}>{product.productName}</Link>
          </div>
        ))
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default SearchProductPage;
