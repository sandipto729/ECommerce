import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './common/index'; // Ensure correct import
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice'; // Ensure correct import
import Context from './context';

function App() {
  const dispatch = useDispatch();
  const[countCartProduct,setCountCartProduct]=useState(0);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: 'include', // Ensures cookies are sent with the request
        headers: {
          'Content-Type': 'application/json', // Adjust this header according to the API's requirements
          // Include any other headers like authorization if required
        },
      });

      if (!response.ok) { // Check if the response is not okay (status code not in the range 200-299)
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('User details:', data.data);

      if (data.success) {
        dispatch(setUserDetails(data.data)); // Set user details in Redux state
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching user details:', error.message);
    }
  };

  const fetchCartProducts=async()=>{
    try{
      const response = await fetch(SummaryApi.countCartProduct.url, {
        method: SummaryApi.countCartProduct.method,
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json', 
        },
      });
      if (!response.ok) { // Check if the response is not okay (status code not in the range 200-299)
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Cart products:', data.data);
      if (data.success) {
        setCountCartProduct(data.data);
      } else {
        toast.error(data.message);
      }
    }catch(error){
      console.error('Error fetching cart products:', error.message);
    }
  }

  useEffect(() => {
    fetchUserDetails();
    fetchCartProducts();
  },[]); // The empty dependency array ensures this runs only once on component mount

  return (
    <>
    <Context.Provider value={{countCartProduct,fetchUserDetails,fetchCartProducts}}>
      
      <ToastContainer />
      <Header />
      <Outlet />
      <Footer />
    </Context.Provider>
    </>
  );
}

export default App;