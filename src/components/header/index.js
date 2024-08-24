import React from 'react';
import image from '../../images/logo-png-rz.png';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';

const styles = {
  header: {
    display: "flex",
    zIndex: '1',
    position: 'fixed',
    width: '100%',
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: '#d0bdf4',
    padding: "5px",
    color: '#fff',
    borderRadius: "0px",
  },
  logoLink: {
    height: '50px',
  },
  buttonContainer: {
    alignSelf: "center",
  },
  logo:{
    height:'50px',
    width:'100px',
    marginLeft:'40px'
  },
  button: {
    height: "30px",
    width: '100px',
    border: 'none',
    cursor: 'pointer',
    alignSelf: "center",
    marginRight: "30px",
    borderRadius: "5px",
  }
};


const Header = () => {
  const navigate = useNavigate();

  const logOut = () => {
    Cookies.remove('jwt_token');
    navigate('/login');
  };

  return (
    <div>
      <header style={styles.header} className='header'>
        <Link to="/" style={styles.logoLink}>
          <img src={image} style={styles.logo}  alt="logo" />
        </Link>
        <div style={styles.buttonContainer}>
          <Link to="/create-post" style={styles.logoLink}>
            <button style={styles.button}>Add Blog</button>
          </Link>
          <button onClick={logOut} style={styles.button}>Logout</button>
        </div>
      </header>
    </div>
  );
};

export default Header;

