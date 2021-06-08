import "./UserInfo.css";

import React from 'react';
import {useSelector} from 'react-redux';
import {selectUser} from '../../Redux/Slices/UserSlice';
import {selectUserPosts} from '../../Redux/Slices/PostsSlice';
import {Avatar} from '@material-ui/core';



const UserInfo = ({user}) => {

    const posts= useSelector(selectUserPosts);
    
    

    if(user){
        return (
            <div className="userinfo">
                <div className="userinfo__image">
                    
                    <img className="userinfo__imageIcon" src={user.imageURL}/>
                </div>
                <div className="userinfo__social">
                    <div className="userinfo__item">
                        <h2>{user.username}</h2>
                    </div>
                    <div className="userinfo__item">
                        <span className="userinfo__socialInfo">{`Posts: ${posts.length}`}</span>
                        <span className="userinfo__socialInfo">{`Followers: ${user.followersCount}`}</span>
                        <span className="Userinfo__socialInfo">{`Following: ${user.followingsCount}`}</span>
                    </div>
                    <div className="userinfo__item">
                        <p>
                            {user.bio}
                        </p>
                    </div>
                    
                </div>
            </div>
           
        )
    }else{
        return <h2>No posts!</h2>
    }
    
}

export default UserInfo
