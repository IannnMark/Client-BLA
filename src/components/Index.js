import React from "react";
import "./Index.css";
import Carousel from "./Carousel";
const images = [
    require("../images/gg.png"),
    require("../images/gg.png"),
    require("../images/gg.png"),
    require("../images/gg.png"),
    require("../images/gg.png"),

];
function App() {
    return (
        <div className="App">
            <header className="App-header">
                <i class="fa fa-bullhorn" aria-hidden="true">Announcement</i>
            </header>
            <main>
                <Carousel images={images} />
            </main>
        </div>
    );
}
export default App;



// import React from "react";
// import Announcement from "./Carousel";


// const announcementsData = [
//     {
//         title: "Announcement 1",
//         description: "This is the first announcement.",
//         image: [
//             require("../images/cat2.jpg"),
//         ],
//     },
//     {
//         title: "Announcement 1",
//         description: "This is the first announcement.",
//         image: [
//             require("../images/persian.jpg"),
//         ],
//     },
//     // Add more announcements as needed
// ];

// function Index() {
//     return (
//         <div className="App">
//             <header className="App-header">
//                 <i className="fa fa-bullhorn" aria-hidden="true">
//                     Announcement
//                 </i>
//             </header>
//             <main>
//                 <Announcement announcements={announcementsData} />
//             </main>
//         </div>
//     );
// }

// export default Index;
