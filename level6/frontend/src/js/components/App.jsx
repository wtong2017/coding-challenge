import React from "react";
// import List from "./List.jsx";
import Nav from "./Nav.jsx";
import Post from "./Post.jsx";
import Loader from "./Loader.jsx"

const App = () => (
    <div>
        <Nav />
        <div style={{position: "relative"}}>
            <Loader />
            <div className="container">
                <div className="row">
                    <div className="col-md-12 mt-5">
                        <h2>Details</h2>
                        <Post />
                    </div>
                </div>
            </div>
        </div>
    </div>
);
export default App;
