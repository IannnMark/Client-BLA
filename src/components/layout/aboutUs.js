import React, { useState } from "react";
import "./aboutUs.css";

const AboutUs = () => {
  const cardFront = (
    <div>
      <h2></h2>
    </div>
  );

  const cardBack = (
    <div className="">
      <h2></h2>
    </div>
  );

  const [isFlipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!isFlipped);
  };

  return (
    <div className="aboutUs">
      {/* <h1 className="geeks">GeeksforGeeks</h1>
        <h3>React Example for Flip Card Effect</h3> */}
      <div className="container">
        <div className={`flip-card ${isFlipped ? "flipped" : ""}`}>
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <div className="card-content">{cardFront}</div>
              <button className="flip-button" onClick={handleFlip}>
                Flip
              </button>
            </div>
            <div className="flip-card-back">
              <div className="card-content">{cardBack}</div>
              <button className="flip-button" onClick={handleFlip}>
                Flip
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="aboutt">
        <p>
          Welcome to <i className="school-name">Blessed Land Academy</i>, a beacon of educational excellence
          nestled in the heart of Taguig City. Established with a vision to
          nurture young minds and foster holistic development, Blessed Land
          Academy stands as a distinguished institution committed to providing
          quality education and shaping future leaders. Our academy is dedicated
          to creating a learning environment that goes beyond traditional
          academics, emphasizing character formation, values, and a strong sense
          of community. With a team of dedicated and qualified educators,
          Blessed Land Academy strives to instill a passion for knowledge,
          critical thinking, and creativity in each student.
          <br />
          <br />  
          Join us on a journey of academic growth, personal development, and
          community engagement at Blessed Land Academy, where every student is
          valued, inspired, and empowered to reach their full potential. <br />
          <br />
          <br />  
          <br /> 
          {/* Social Media Icons */}
          <div className="iconss">
          Contact us at <m></m>
          <a
            href="https://www.facebook.com/blessedlandacademy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook"></i> Blessed Land Academy Taguig
          </a>
          <br />
          <i>or</i>
          {/* Yahoo Icon with Text */}
          <div>
            <span>
              {" "}
              Email us at{" "}
              <a href="mailto:blessedlandacademy2005@yahoo.com">
                <i className="fab fa-yahoo"></i>{" "}
                blessedlandacademy2005@yahoo.com
              </a>
            </span>
          </div>
          </div>
          {/* Add more social media icons and links as needed */}
          <br />
          <br />
          <br />
          <br />
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
