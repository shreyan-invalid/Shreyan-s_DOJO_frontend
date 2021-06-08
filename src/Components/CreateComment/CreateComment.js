import "./CreateComment.css";
import {useMutation} from '@apollo/client';
import {CREATE_COMMENT} from '../../GraphqlQueries/Mutations';
import React from 'react';

function CreateComment({postId, body}) {

    const [createComment] = useMutation(CREATE_COMMENT, {
        onError(err){
            console.log(err);
        },
        variables : {
            postId,
            body
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if(body.trim!== ""){
            createComment();
            
        }else{
            alert("Not allowed!");
        }
        
    }


    return (
        <div className="create__commment__button">
            <button onClick={handleSubmit}>Comment</button>
        </div>
    )
}

export default CreateComment;
