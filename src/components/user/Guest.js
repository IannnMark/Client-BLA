import React from "react";
import "./Guest.css";
import { FaFacebookSquare, FaViber, FaEnvelope } from 'react-icons/fa';

const Index = () => {
    return (
        <div className="container">
            <header className="header">
                <h1>Welcome, guest!</h1>
            </header>
            <main>
                <div className="text">
                    <p>
                        To access our website, kindly email our Administrator, Ms. Jonara, including your full name, school ID, date of graduation, and the school year.
                        Please wait for her response, during which she will provide you with the necessary login credentials.
                        This process ensures smooth login procedures and enhances security for all users. Thank you for your cooperation!
                    </p>
                    <div className="contact-options">
                        <a><FaEnvelope /> ms.jonara@gmail.com</a>
                        <br />
                        <a><FaFacebookSquare /> Jonara Ana De Jesus</a>
                        <br />
                        <a><FaViber /> +93 928 365 3020</a>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Index;
