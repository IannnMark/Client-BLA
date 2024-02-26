import React from 'react';
import './Footer.css'


const Footer = () => {
  return <div>
    <footer className='footer-style'>
      <p style={{ color: "black", fontSize: "60" }}> Blessed Land - ©2023-2024.All rights reserved.</p>
      <img src="/images/school_logo.png" alt='avatar' style={{ width: "50px" }} />
    </footer>
  </div>;
};

export default Footer;