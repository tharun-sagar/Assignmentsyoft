import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        user_email: '',
        user_password: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const payload = {
            user_email: formData.user_email,
            user_password: formData.user_password,
        };

        try {
            const response = await axios.post('https://syoft.dev/Api/userlogin/api/userlogin', payload);
            console.log(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            setLoading(false);
            navigate('/dashboard'); // Redirect to dashboard page
        } catch (error) {
            console.error('Error during login:', error);
            setError('An error occurred during login. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            
            <div className="login-right">
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <input
                        type="email"
                        name="user_email"
                        placeholder="Email Address"
                        value={formData.user_email}
                        onChange={handleChange}
                        required
                        className="login-input"
                    />
                    <input
                        type="password"
                        name="user_password"
                        placeholder="Password"
                        value={formData.user_password}
                        onChange={handleChange}
                        required
                        className="login-input"
                    />
                    <button type="submit" disabled={loading} className="login-button">
                        {loading ? 'Loading...' : 'Log In'}
                    </button>
                    {error && <p className="login-error">{error}</p>}
                    <p className="signup-footer">
                        Don't have an account? <Link to="/signup" className="signup-footer-link">Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
