import React, {useEffect} from 'react';
import "./Comment.css";
import {FETCH_USER_IMAGE} from '../../GraphqlQueries/Fetch';
import {useQuery} from '@apollo/client';
import SpringModal from '../../Components/Modal/SpringModal';
import {selectUser} from '../../Redux/Slices/UserSlice';
import {useSelector} from 'react-redux';



const Comment = ({comment, postId, uid, username, postUsername}) => {

    const {data, error, loading, refetch}= useQuery(FETCH_USER_IMAGE, {
        variables : {username}
    });

    const user= useSelector(selectUser);

    useEffect(() => {
        
        if(data){
            refetch();
        }


    }, [])

   
    
    return (
        <div className="comment">
         <div className="comment__image">
             <img src={data && data.getProfilePic}/>
         </div>
         
         <p><span>{username} </span>{comment}</p>
        {user && (user.username === username || user.username === postUsername)  && <SpringModal postId={postId} commentId={uid}/>}
        </div>
    )
}

export default Comment
