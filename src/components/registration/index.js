import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css';
import image from '../../images/logo-rz.png'
import bannerImage from '../../images/what-is-a-blog-1.webp'
import { register } from '../../services/api';

class RegistrationForm extends Component {
    state = {
        username: '',
        password: '',
        confirmPassword: '',
        showSubmitError: false,
        errorMsg: '',
    };

    onChangeUsername = (event) => {
        this.setState({ username: event.target.value });
    };

    onChangePassword = (event) => {
        this.setState({ password: event.target.value });
    };
    onChangeConfirmPassword = (event) => {
        this.setState({ confirmPassword: event.target.value });
    };
    onSubmitSuccess = (jwtToken) => {
        const { history } = this.props;

        Cookies.set('jwt_token', jwtToken, {
            expires: 30,
            path: '/',
        });
        history.replace('/');
    };

    onSubmitFailure = (errorMsg) => {
        this.setState({ showSubmitError: true, errorMsg });
    };

    submitForm = async (event) => {
        event.preventDefault();
        const { username, password, confirmPassword } = this.state;
        const userDetails = { username, password };

        if (password !== confirmPassword) {
            this.setState({ showSubmitError: true, errorMsg: "Password and Confirm Password are not same." });
        } else if (username === '' || password === '' || confirmPassword === '') {
            this.setState({ showSubmitError: true, errorMsg: "Please enter values for all fields" });
        }
        else {
            let data;
            try {
                data = await register(userDetails);
                if (data.ok) {
                    localStorage.setItem('currentUser', username);
                    this.onSubmitSuccess(data.token);
                } else {
                    this.onSubmitFailure(data.error);
                }
            } catch (e) {
                console.log(data);
                this.onSubmitFailure('Login failed:', e);
            }
        }


    };

    renderPasswordField = () => {
        const { password } = this.state;
        return (
            <>
                <label className="input-label" htmlFor="password">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    className="password-input-field"
                    value={password}
                    onChange={this.onChangePassword}
                    placeholder="Password"
                />
            </>
        );
    };

    renderConfirmPasswordField = () => {
        const { confirmPassword } = this.state;
        return (
            <>
                <label className="input-label" htmlFor="confirmPassword">
                    Confirm Password
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    className="password-input-field"
                    value={confirmPassword}
                    onChange={this.onChangeConfirmPassword}
                    placeholder="Confirm Password"
                />
            </>
        );
    };

    renderUsernameField = () => {
        const { username } = this.state;
        return (
            <>
                <label className="input-label" htmlFor="username">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    className="username-input-field"
                    value={username}
                    onChange={this.onChangeUsername}
                    placeholder="Username"
                />
            </>
        );
    };

    render() {
        const { showSubmitError, errorMsg } = this.state;
        const jwtToken = Cookies.get('jwt_token');

        if (jwtToken !== undefined) {
            return <Navigate to="/" />;
        }

        return (
            <div className="login-form-container">
                <img
                    src={image}
                    className="login-website-logo-mobile-image"
                    alt="website logo"
                />
                <img
                    src={bannerImage}
                    className="login-image"
                    alt="website login"
                />
                <form className="form-container" onSubmit={this.submitForm}>
                    <img
                        src={image}
                        className="login-website-logo-desktop-image"
                        alt="website logo"
                    />
                    <div className="input-container">{this.renderUsernameField()}</div>
                    <div className="input-container">{this.renderPasswordField()}</div>
                    <div className="input-container">{this.renderConfirmPasswordField()}</div>

                    <button type="submit" className="login-button">
                        Register
                    </button>

                    {showSubmitError && <p className="error-message">*{errorMsg}</p>}
                    <Link to='/login' className="link">
                        <button className="account-register">
                            Click here to Login
                        </button>
                    </Link>
                </form>
            </div>
        );
    }
}

export default RegistrationForm;
