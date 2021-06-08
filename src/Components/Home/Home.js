import React from 'react';
import Feed from '../../Pages/Feed/Feed';
import "./Home.css";
import Sidebar from '../Sidebar/SideBar';
import {selectPublicPosts} from '../../Redux/Slices/PostsSlice';
import {useSelector} from 'react-redux';
import Header from '../Header/Header';




function Home() {

    const posts= useSelector(selectPublicPosts);

    return (
        <div className="home">
            <Sidebar/>
            <Feed  posts={posts} />
        </div>
    )
}

export default Home
