import './FollowUserButton.css';
import {useSelector} from 'react-redux';
import {useMutation} from '@apollo/client';
import {selectUser} from '../../Redux/Slices/UserSlice';
import {FOLLOW_USER} from '../../GraphqlQueries/Mutations';
import React, {useEffect, useState}  from 'react';
import { FETCH_POSTS_QUERY } from '../../GraphqlQueries/Fetch';


function FollowUserButton({userId, followersCount, followersList}) {

    const [followed, setFollowed]= useState(false);
    const currUser= useSelector(selectUser);
    const [followingText, setfollowingText]= useState("follow");
    const [followText, setfollowText]= useState("following");

 


    const [followUser, {loading}]= useMutation(FOLLOW_USER, {
        update(cache){

           
            const data= cache.readQuery({
                query: FETCH_POSTS_QUERY
            })

            console.log(data.getUsers);

            setfollowingText('follow');
        },
        onCompleted(){
            setfollowingText('follow');
            setfollowText('following');
        },
        onError(err){
            console.log(err);
        },
        variables: {userId: userId}
    });

  

    useEffect(() => {
        
        if(followersList && followersList.find((follow)=> follow.username === currUser.username)){
           
            setFollowed(true);
        }else{
            setFollowed(false);
        }
        
    }, [currUser, followersCount])


    const Submit = (e) =>{
        setfollowingText('loading');
        setfollowText('loading');
        setFollowed(!followed);
        followUser();

        
    }
  



    return (
        <button disabled={loading && true} className={`follow__button ${followed? "user__follow__green": "user__follow__gray"}`} onClick={Submit}>{followed? followText: followingText}</button>
    )
}

export default FollowUserButton
