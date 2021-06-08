import React from 'react';
import Feed from '../../Pages/Feed/Feed';
import {selectUserPosts} from '../../Redux/Slices/PostsSlice';
import {useSelector} from 'react-redux';
import SideBar from '../../Components/Sidebar/SideBar';
import {selectUser} from '../../Redux/Slices/UserSlice';
import { Redirect } from 'react-router';
import Header from '../../Components/Header/Header'

function ProfilePage() {

    const user= useSelector(selectUser);
    const posts= useSelector(selectUserPosts);

    if(user){
        return (
            <div className="home">
                <SideBar/>
                <Feed flag={true} posts={posts}/>
            </div>
        )
    }else{
        return(
            <Redirect to="/"/>
        )
    }
}

export default ProfilePage;
