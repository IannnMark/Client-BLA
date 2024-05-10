import React from "react";
import "./Guest.css";
import { FaFacebookSquare, FaViber, FaEnvelope } from 'react-icons/fa';

const Index = () => {
    return (
        <div className="container-bg">
            <header className="header" style={{ padding: "20px" }}>
                <h1 className="guest-header">Welcome, guest!</h1>
            </header>
            <main>
                <div className="text-guest" style={{ fontSize: "40px" }}>
                    <p>
                        To access our website, kindly email our Administrator, Ms. Jonara, including your full name, school ID, date of graduation, and the school year.
                        Please wait for her response, during which she will provide you with the necessary login credentials.
                        This process ensures smooth login procedures and enhances security for all users. Thank you for your cooperation!
                    </p>
                    <div className="contact-options" style={{ fontSize: "20px" }}>
                        <a><FaEnvelope /> ms.jonara@gmail.com</a>
                        <br />
                        <a><FaFacebookSquare /> Jonara Ana De Jesus</a>
                        <br />
                        <a><FaViber /> +93 928 365 3020</a>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>

                </div>
            </main>
        </div>
    );
}

export default Index;
