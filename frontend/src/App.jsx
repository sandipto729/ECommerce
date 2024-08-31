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

function App() {
  const dispatch = useDispatch();

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
      console.log('User details:', data);

      if (data.success) {
        dispatch(setUserDetails(data.data)); // Set user details in Redux state
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching user details:', error.message);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []); // The empty dependency array ensures this runs only once on component mount

  return (
    <>
      <ToastContainer />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;