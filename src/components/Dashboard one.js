import React from 'react';

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div>
            <h1>Welcome, {user.user_firstname}</h1>
            <p>Email: tharun@email.com</p>
            <p>Phone: 9390076123</p>
            <p>City: Hyderabad</p>
            <p>Zipcode: 502345</p>
        </div>
    );
};

export default Dashboard;
