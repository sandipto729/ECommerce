import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import summeryAPI from '../common/index';
import './AllUsers.css'; // Import the CSS file
import { FaEdit } from "react-icons/fa";
import ChangeUserRole from './../components/ChangeUserRole'; // Import the ChangeUserRole component

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [selectedUser, setSelectedUser] = useState(null); // State to track the selected user

  const fetchUsers = async () => {
    try {
      const response = await fetch(summeryAPI.all_users.url, {
        method: summeryAPI.all_users.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (data.success) {
        setAllUsers(data.data);
        toast.success(data.message);
      } else {
        toast.error(data.message);
        setError(data.message);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      toast.error('Failed to fetch users');
      setError('Failed to fetch users');
    } finally {
      setLoading(false); // Ensure loading state is stopped after fetch attempt
    }
  };

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setSelectedUser(user); // Set the selected user when edit button is clicked
  };

  const handleCloseChangeUser = () => {
    setSelectedUser(null); // Clear the selected user when closing the ChangeUserRole component
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>All Users</h1>
      <table className="users-table">
        <thead>
          <tr>
            <th>SR</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              <td>
                <button className='admin-edit' onClick={() => handleEditClick(user)}>
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <ChangeUserRole 
          user={selectedUser} 
          onClose={handleCloseChangeUser} 
          callFunc={fetchUsers} // Ensure fetchUsers is passed correctly as a function
        />
      )}
    </div>
  );
};

export default AllUsers;
