import React from 'react';
import Header from "./components/Header";
import PostsContainer from "./components/PostsContainer";

function App() {
    return (
        <div className="app">
            <Header/>
            <PostsContainer/>
        </div>
    );
}

export default App;
