import './Feed.css';

import React, {useEffect, useState} from 'react';
import UserInfo from '../../Components/UserInfo/UserInfo';
import Upload from '../../Components/Upload/Upload';
import Post from '../../Components/Post/Post';
import {useSelector} from 'react-redux';
import {selectUser, selectUsers} from '../../Redux/Slices/UserSlice';








const Feed = ({posts, flag}) => {

      
      const user= useSelector(selectUser);
      const users= useSelector(selectUsers);
      const [currUser, setCurrUser]= useState(null);
     
     
    useEffect(() => {
      setCurrUser(users && users.find(now => now.username === user.username));
    }, [users])

   
    

    if(user){
      

      return (
        <div className="feed">
            {flag && <UserInfo user={currUser== null? user: currUser}/>}
            <Upload/>

            { posts && 
              posts.map((post) => 
                
                  <Post 
                    caption={post.caption}
                    timestamp={post.createdAt}
                    image={post.imageURL}
                    likeCount={post.likeCount}
                    likes={post.likes}
                    username={post.username}
                    comments = {post.comments}
                    commentCount = {post.commentCount}
                    allUsers= {users}
                    key={post.id}
                    postId={post.id}
                />
               
              
              )
            }
            
        </div>
      )
    }
}





export default Feed;
