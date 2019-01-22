import React from "react";
import List from "./List.jsx";
import Form from "./Form.jsx";
import Post from "./Post.jsx";

const App = () => (
    <div className="row mt-5">
        {/* <div className="col-md-4 offset-md-1">
            <h2>Stocks in database</h2>
            <List />
        </div> */}
        <div className="col-md-4 offset-md-1">
            <h2>Search for stocks</h2>
            <Form />
        </div>
        <div className="col-md-4 offset-md-1">
            <h2>Details</h2>
            <Post />
        </div>
    </div>
);
export default App;
