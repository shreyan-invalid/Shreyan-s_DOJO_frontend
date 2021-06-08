import "./Post.css";
import React, {useState, useEffect} from 'react';
import Comment from '../Comment/Comment';
import CommentIcon from '@material-ui/icons/Comment';
import {selectUser} from '../../Redux/Slices/UserSlice';
import {useSelector} from 'react-redux';
import LikeButton from '../LikeButton/LikeButton';
import SpringModal from '../Modal/SpringModal';
import {CREATE_COMMENT} from '../../GraphqlQueries/Mutations';
import { useMutation } from "@apollo/client";








const Post = ({postId, image, username, timestamp, caption, likes, likeCount, comments, commentCount, allUsers}) => {

    const [commentsActive, setCommentsactive]= useState(false);
    const [body, setBody]= useState("");
    const [totalComments, setTotalComments]= useState(comments);
    const [commentsNumber, setcommentsNumber]= useState(commentCount);


   

    const user= useSelector(selectUser);

    const profilePic= allUsers.find(user => username === user.username);
   

    const [createComment]= useMutation(CREATE_COMMENT, {
        update(cache, result){
            setBody("");
            setTotalComments(result.data.createComment.comments);
            setcommentsNumber(commentsNumber + 1);
        },
        onError(error){
            console.log(error);
        },
        variables: {
            postId , 
            body
        }
    })

    const handleCommentSubmit = (e) =>{
        
        e.preventDefault();
        
        if(body.trim() !== ""){
            setCommentsactive(true);
            createComment();
            
        }else{
           alert("Not allowed!");
        }
    }


    const handleChange= () => {
        setCommentsactive(!commentsActive);
    }

    useEffect(() => {
        if(comments === totalComments){
            setTotalComments(comments);
        }
        setcommentsNumber(commentCount);
    }, [commentCount, comments])



    return (
        <div className="post">
            <div className="post__top">
                <img src={profilePic && profilePic.imageURL} alt=""/>
                <div className="top__info">
                    <h3>{username}</h3>
                    <p>{timestamp}</p>

                   
                </div>
            </div>
            {
                username === user.username && 
                <div className="post_delete">
                    <SpringModal postId={postId}/>
                </div>
            }
            


            <div className="post__bottom">
                <p>{caption}</p>
            </div>

            

            <div className="post__image">
                {image? <img src={image} alt="https://www.wired.com/wp-content/uploads/2016/03/MIT-Web-Loading.jpg"/> : <h3>Loading</h3>}
            </div>

            <div className="post__apeal">
                <div className="post__appealItem">
                    <LikeButton id={postId} likes={likes} likeCount={likeCount}/>
                </div>

                <div className="post__appealItem" onClick={handleChange}>
                    <CommentIcon/><span>: {commentsNumber}</span>
                </div>
                
            </div>

            <form className="post__postComment">
                    <input value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write a comment!"/>
                    <button onClick={createComment}>Comment</button>
            </form>

            <div className={commentsActive? `${comments.length === 0? "post__comments__empty": "post__comments__full"}`: "post__inactive"}>

                
               
                {comments.length> 0 ? comments.map((comment) => 
                    <div className="post__comment__single">
                        <Comment postUsername={username} postId={postId} key={comment.id} username={comment.username} comment= {comment.body} uid={comment.id}/>
                    </div>
                ): <p>No Comments Yet</p>}
            </div>
        </div>
    )
}

export default Post;
