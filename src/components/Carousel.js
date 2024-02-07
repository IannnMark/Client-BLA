import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(null);

    const slideVariants = {
        hiddenRight: {
            x: "100%",
            opacity: 0,
        },
        hiddenLeft: {
            x: "-100%",
            opacity: 0,
        },
        visible: {
            x: "0",
            opacity: 1,
            transition: {
                duration: 1,
            },
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            transition: {
                duration: 0.5,
            },
        },
    };
    const slidersVariants = {
        hover: {
            scale: 1.2,
            backgroundColor: "#ff00008e",
        },
    };
    const dotsVariants = {
        initial: {
            y: 0,
        },
        animate: {
            y: -10,
            scale: 1.2,
            transition: { type: "spring", stiffness: 1000, damping: "10" },
        },
        hover: {
            scale: 1.1,
            transition: { duration: 0.2 },
        },
    };

    const handleNext = () => {
        setDirection("right");
        setCurrentIndex((prevIndex) =>
            prevIndex + 1 === images.length ? 0 : prevIndex + 1
        );
    };

    const handlePrevious = () => {
        setDirection("left");

        setCurrentIndex((prevIndex) =>
            prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleDotClick = (index) => {
        setDirection(index > currentIndex ? "right" : "left");
        setCurrentIndex(index);
    };

    return (
        <div className="carousel">
            <div className="carousel-images">
                <AnimatePresence>
                    <motion.img
                        key={currentIndex}
                        src={images[currentIndex]}
                        initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
                        animate="visible"
                        exit="exit"
                        variants={slideVariants}
                    />
                </AnimatePresence>
                <div className="slide_direction">
                    <motion.div
                        variants={slidersVariants}
                        whileHover="hover"
                        className="left"
                        onClick={handlePrevious}
                    >

                    </motion.div>
                    <motion.div
                        variants={slidersVariants}
                        whileHover="hover"
                        className="right"
                        onClick={handleNext}
                    >

                    </motion.div>
                </div>
            </div>
            <div className="carousel-indicator">
                {images.map((_, index) => (
                    <motion.div
                        key={index}
                        className={`dot ${currentIndex === index ? "active" : ""}`}
                        onClick={() => handleDotClick(index)}
                        initial="initial"
                        animate={currentIndex === index ? "animate" : ""}
                        whileHover="hover"
                        variants={dotsVariants}
                    ></motion.div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;




// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import "./Index.css";

// const Announcement = ({ announcements }) => {
//     const [currentIndex, setCurrentIndex] = useState(0);

//     const handleNext = () => {
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % announcements.length);
//     };

//     const handlePrevious = () => {
//         setCurrentIndex(
//             (prevIndex) => (prevIndex - 1 + announcements.length) % announcements.length
//         );
//     };

//     return (
//         <div className="announcement">
//             <AnimatePresence exitBeforeEnter>
//                 <motion.div
//                     key={currentIndex}
//                     className="announcement-item"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                 >
//                     <img
//                         src={announcements[currentIndex].image}
//                         alt="Announcement Image"
//                         className="announcement-image"
//                     />
//                     <div className="announcement-text">
//                         <h2>{announcements[currentIndex].title}</h2>
//                         <p>{announcements[currentIndex].description}</p>
//                     </div>
//                 </motion.div>
//             </AnimatePresence>

//             <div className="announcement-direction">
//                 <div className="left" onClick={handlePrevious}>
//                     &#10094;
//                 </div>
//                 <div className="right" onClick={handleNext}>
//                     &#10095;
//                 </div>
//             </div>

//             <div className="announcement-indicator">
//                 {announcements.map((_, index) => (
//                     <div
//                         key={index}
//                         className={`dot ${currentIndex === index ? "active" : ""}`}
//                         onClick={() => setCurrentIndex(index)}
//                     ></div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Announcement;