import React, { useState } from 'react';
import ROLE from '../common/role';
import { IoMdClose } from "react-icons/io";
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import './ChangeUserRole.css'; // Import the CSS file

const ChangeUserRole = ({ user, onClose, callFunc }) => {
    const [userRole, setUserRole] = useState(user.role);

    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value);
        console.log(e.target.value);
    };

    const updateUserRole = async () => {
        const fetchResponse = await fetch(SummaryApi.update_user.url, {
            method: SummaryApi.update_user.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                userId: user._id,
                role: userRole
            })
        });

        const responseData = await fetchResponse.json();

        if (responseData.success) {
            toast.success(responseData.message);
            onClose();
            if (typeof callFunc === 'function') {
                callFunc(); // Call the function to refresh user list
            } else {
                console.error('callFunc is not a function');
            }
        }

        console.log("Role updated", responseData);
    };

    return (
        <div className='change-user-role-overlay'>
            <div className='change-user-role-container'>

                <button className='close-button' onClick={onClose}>
                    <IoMdClose />
                </button>

                <h1 className='title'>Change User Role</h1>

                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>

                <div className='role-selection'>
                    <p>Role:</p>
                    <select className='role-select' value={userRole} onChange={handleOnChangeSelect}>
                        {Object.values(ROLE).map(el => (
                            <option value={el} key={el}>{el}</option>
                        ))}
                    </select>
                </div>

                <button className='update-button' onClick={updateUserRole}>Change Role</button>
            </div>
        </div>
    );
};

export default ChangeUserRole;
