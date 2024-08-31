import React from 'react';
import './AdminPanel.css';
import { useSelector } from 'react-redux';
import { FaRegUserCircle } from "react-icons/fa";
import { Link, Outlet } from 'react-router-dom';


const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user);
    return (
        <div className='adminpanel'>
            <aside className="adminsidebar">
                <div className="admin_user-profile">
                    <div className="admin_profile-image">
                        {user?.profilePhoto ? (
                            <img src={user?.profilePhoto} alt="user" className="profile-img" />
                        ) : (
                            <FaRegUserCircle className="profile-icon" />
                        )}
                    </div>
                    <p>{user?.name}</p>
                    <p>{user?.role}</p>
                </div>

                <div>
                    {/* navigation */}
                    <nav>
                        <Link to={'/admin-panel/all-users'}>All Users</Link>
                        <Link to={'/admin-panel/product'}>Product</Link>
                    </nav>
                </div>
            </aside>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminPanel;
