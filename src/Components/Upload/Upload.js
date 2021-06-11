import "./Upload.css";

import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {selectUser} from '../../Redux/Slices/UserSlice';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/client';
import {storage} from '../../Firebase';
import {Avatar} from '@material-ui/core';
import default_user from '../../images/default_user.jpg'




const Upload = () => {

    const user= useSelector(selectUser);
    const[imageURL, setImageURL]= useState("");
    const[caption, setCaption]= useState("");
    const[image, setImage]= useState(null);
    const [loading, setLoading]= useState(false);
    

    const handleChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0]);
            
        }        
        console.log(image);
    }

    const handleUpload = (e) => {
        e.preventDefault();

       
        if(image){
            if(caption === ""){
                alert("Please provide a caption");
                return;
            }else{
                setLoading(true);
                const uploadTask= storage.ref(`images/${image.name}`).put(image);


                uploadTask.on(
                    'state_changed',
                    snapshot => {},
                    error => {
                        console.log(error);
                    },
                    () => {
                        storage
                            .ref('images')
                            .child(image.name)
                            .getDownloadURL()
                            .then(url => {
                                setImageURL(url);
                                createPost();
                                setLoading(false);
                            })
                    }
                )
            }
            
        }else{
            alert("Please give an image");
        }
        
    }



    const [createPost, {error}] = useMutation(CREATE_POST_MUTATION, {
        variables: {
            imageURL: imageURL,
            caption: caption
        },
        update(proxy, result){
            setCaption("");
            setImageURL("");
            
            const data= proxy.readQuery({
                query: FETCH_POSTS_QUERY
            })
            
            const newRes= {
                __typename: "Post",
                ...result.data.createPost
            }

            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: {
                    getPosts: [newRes, ...data.getPosts]
                }
            })

            setImage(null);

            alert("Post successfully!");
        },
        onError(err){
            console.log(err);
        }

    })


    if(error){
        console.log(error);
    }

    return (
        <form onSubmit={handleUpload} className="upload">
            <div className="upload__info">
                <img  src={user.imageURL.trim()!=="default"? user.imageURL : default_user} alt={user.username}/>
                <input  onChange={(e) => setCaption(e.target.value)} value={caption} type="text" placeholder="Write a caption!"/>
            </div>
            <div className="upload__file">
                <input onChange={handleChange} type="file"/>
                <button disabled={loading && true} onClick={handleUpload}>{loading? "Loading...": "Upload"}</button>
            </div>
            {error && <div className="errors">
                    <ul>
                       <li>{error}</li> 
                    </ul>
                </div>}
        </form>
    )
}

const CREATE_POST_MUTATION = gql`
mutation createPost($caption: String!, $imageURL: String!){
    createPost(caption: $caption, imageURL: $imageURL){
        id
        caption 
        imageURL
        createdAt
        username
        likes{
            id 
            username
            createdAt
        }
        likeCount
        comments{
            id
            username
            body
            createdAt
        }
        commentCount
    }
}
`

const FETCH_POSTS_QUERY =  gql`
{
  getPosts {
    id
    caption
    imageURL
    createdAt
    username
    likeCount
    likes {
      username
    }
    commentCount
    comments {
      id
      username
      createdAt
      body
    }
  }
}
`;


export default Upload
