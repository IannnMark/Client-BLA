// import React, { Fragment } from "react";
// const Footer = () => {
//     return (
//         <Fragment>
//             <footer className="py-1">
//                 <p className="text-center mt-1">
//                     Blessedland - 2023-2024, All Rights Reserved
//                 </p>
//             </footer>
//         </Fragment>
//     );
// };
// export default Footer;

import React from 'react';
import './Footer.css'


const Footer = () => {
  return <div>
    <footer className='footer-style'>
      <p style={{ color: "black", fontSize: "60" }}> Blessedland - ©2023-2024.All rights reserved.</p>
      <img src="/images/school_logo.png" alt='avatar' style={{ width: "50px" }} />
    </footer>
  </div>;
};

export default Footer;
