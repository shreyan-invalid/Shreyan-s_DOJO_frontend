import React, {useState, useEffect} from 'react';
import { useMutation } from '@apollo/client';
import {LIKE_POST} from '../../GraphqlQueries/Mutations';
import {selectUser} from '../../Redux/Slices/UserSlice';
import {useSelector} from 'react-redux';
import "./LikeButton.css";
import LoopIcon from '@material-ui/icons/Loop';

const LikeButton = ({id, likes, likeCount})  => {


    const [liked, setLiked]= useState(false);
    const [likeComponent, setLikeComponent]= useState("fa fa-thumbs-up")
    const user= useSelector(selectUser);

    const [likePost, {loading}]= useMutation(LIKE_POST, {
        onError(err){
            console.log(err);
        },
        variables: {postId: id}
    });


        
    useEffect(() => {
            if (user && likes.length > 0 && likes.find((like) => like.username === user.username)) {
              setLiked(true);
            } else{
                setLiked(false);
            } ;
     }, [user, likes]);
       
   

 
    if(user)return (
        <button onClick={likePost} disabled={loading && true}  className={!liked? "liked_button": "likebuttongreen"}>{!loading? <i className={likeComponent} />: <LoopIcon/>}<span> : {likeCount}</span></button>
    )
}

export default LikeButton;
