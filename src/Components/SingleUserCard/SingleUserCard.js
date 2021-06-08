import "./SingleUserCard.css";
import {selectPublicPosts} from '../../Redux/Slices/PostsSlice';
import {useSelector} from 'react-redux';
import {useMutation} from '@apollo/client';
import {selectUser} from '../../Redux/Slices/UserSlice';
import {FOLLOW_USER} from '../../GraphqlQueries/Mutations';
import React, {useEffect, useState}  from 'react';
import FollowUserButton from '../FollowUserButton/FollowUserButton';

function SingleUserCard({userId, username, userPhoto, followers, followings, followersList}) {

    const posts= useSelector(selectPublicPosts);

    const userPosts= posts.filter(post => post.username === username);


    return (
        <div className="user__card">
            <div className="user__image">
                <img src={userPhoto}/>
            </div>

            <div className="user__info">
                <div className="user__follow">
                    <h3>{username}</h3>
                    <FollowUserButton userId={userId} followersCount={followers} followersList={followersList} className="followButton"/>
                </div>

                <ul className="user__appeal">
                    <li>Posts: {userPosts.length}</li>
                    <li>Followers: {followers}</li>
                    <li>Followings: {followings}</li>
                </ul>
            </div>

        </div>
    )
}

export default SingleUserCard
