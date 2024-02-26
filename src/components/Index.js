import React from "react";
import "./Index.css";
import Carousel from "./Carousel";
const images = [
    require("../images/1.png"),
    require("../images/2.png"),
    require("../images/3.png"),
    require("../images/4.png"),

];
function App() {
    return (
        <div className="App">
            <header className="App-header">
            </header>
            <main>
                <Carousel images={images} />
                <br />
                <br />
                <br />
                <br />
            </main>
        </div>
    );

}
export default App;

