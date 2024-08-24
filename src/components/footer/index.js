import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Blog Application. All rights reserved.</p>
      </footer>
    );
  }
}

const styles = {
  footer: {
    backgroundColor: '#d0bdf4',
    color: '#000',
    padding: '10px 15px',
    textAlign: 'center',
    bottom: 0,
    borderRadius:'0px',
  },
};

export default Footer;
