import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css';
import { Link } from 'react-router-dom';
import image from '../../images/logo-rz.png'
import bannerImage from '../../images/what-is-a-blog-1.webp'
import { login } from '../../services/api';

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmitSuccess = (jwtToken) => {
    const { history } = this.props;
    const {username} = this.state;

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    });
    Cookies.set('username', username, {
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
    const { username, password } = this.state;
    const userDetails = { username, password };
  
    try {
      const data = await login(userDetails);
  
      if (data.token) {
        localStorage.setItem('currentUser', username);
        this.onSubmitSuccess(data.token);
      } else {
        this.onSubmitFailure(data.message);
      }
    } catch (error) {
      console.error('Login failed:', error);
      this.onSubmitFailure('Incorrect username or password.');
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
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          <Link to='/account/register' className="link">
            <button className="account-register">
              Don't have an account? Click here to register 
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

export default LoginForm;
