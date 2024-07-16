import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
    const [formData, setFormData] = useState({
        user_firstname: '',
        user_lastname: '',
        user_email: '',
        user_password: '',
        user_phone: '',
        user_city: '',
        user_zipcode: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCheckboxChange = () => {
        setAgreeTerms(!agreeTerms);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!agreeTerms) {
            setError('You must agree to the terms of service and privacy policy.');
            return;
        }
        setLoading(true);
        setError(null);

        const payload = {
            user_firstname: formData.user_firstname,
            user_lastname: formData.user_lastname,
            user_email: formData.user_email,
            user_phone: formData.user_phone,
            user_password: formData.user_password,
            user_city: formData.user_city,
            user_zipcode: formData.user_zipcode,
        };

        try {
            const response = await axios.post('https://syoft.dev/Api/user_registeration/api/user_registeration', payload);
            console.log(response.data);
            setLoading(false);
            navigate('/login'); // Redirect to login page
        } catch (error) {
            console.error('Error during sign up:', error);
            setError('An error occurred during sign up. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-left">
                <h1>Welcome to Our Community</h1>
                <p>Join us and start your journey to success. Sign up to create your account and explore amazing features!</p>
                <img src="/images/signup-image.jpg" alt="Sign Up" className="signup-image" />
            </div>
            <div className="signup-right">
                <h2>Sign Up</h2>
                <p className="signin-text">Already have an account? <Link to="/login" className="signin-link">Sign In</Link></p>
                <form onSubmit={handleSubmit} className="signup-form">
                <label className="input-label" htmlFor="username">
                   USERNAME *
                </label>
                    <input
                        type="text"
                        name="user_firstname"
                        
                        value={formData.user_firstname}
                        onChange={handleChange}
                        required
                        className="signup-input"
                    />
                    <label className="input-label" htmlFor="username">
                       Email Address *
                    </label>
                    <input
                        type="email"
                        name="user_email"
                        
                        value={formData.user_email}
                        onChange={handleChange}
                        required
                        className="signup-input"
                    />
                    <label className="input-label" htmlFor="username">
                       PASSWORD *
                    </label>
                    <input
                        type="password"
                        name="user_password"
                        
                        value={formData.user_password}
                        onChange={handleChange}
                        required
                        className="signup-input"
                    />
                    <label className="input-label" htmlFor="username">
                       COMPANY
                    </label>
                    <input
                        type="text"
                        name="user_phone"
                        
                        value={formData.user_phone}
                        onChange={handleChange}
                        required
                        className="signup-input"
                    />
                    
                    <div className="checkbox-container">
                        <input
                            type="checkbox"
                            id="agreeTerms"
                            checked={agreeTerms}
                            onChange={handleCheckboxChange}
                            className="checkbox"
                        />
                        <label htmlFor="agreeTerms" className="checkbox-label">
                            I agree to the <a href="#" className="terms-link">Terms of Service</a> and <a href="#" className="privacy-link">Privacy Policy</a>.
                        </label>
                    </div>
                    <button type="submit" disabled={loading} className="signup-button">
                        {loading ? 'Loading...' : 'Create Your Free Account'}
                    </button>
                    {error && <p className="signup-error">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default SignUp;
