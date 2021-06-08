import {gql} from '@apollo/client';


export const LIKE_POST = gql`
    mutation likePost($postId: ID!){
        likePost(postId: $postId){
            id,
            likes{
                id
                username
            }
            likeCount
        }
    }
`


export const FOLLOW_USER = gql`
    mutation followUser($userId: ID!){
        followUser(userId: $userId){
            username
            id
            followers{
                username
                id
            }
            followings{
                username
                id
            }
            followersCount
            followingsCount
            imageURL
            bio
        }
    }
`

export const DELETE_POST = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`

export const CREATE_COMMENT = gql`
    mutation comment($postId: ID! , $body: String!){
        createComment(postId: $postId ,  body: $body){
            username
            comments{
                username
                id
                body
            }
            commentCount
    }
}
`

export const DELETE_COMMENT = gql`
  mutation deleteComment($postId: ID! , $commentId: ID!){
     deleteComment(postId: $postId , commentId: $commentId){
        id
        imageURL
        caption
        username
        likes{
            username
            id
        }
        likeCount
        comments{
            username
            id
            body
        }
        commentCount
    }
  }
`

export const UPDATE_BIO= gql`
  mutation updateBio($bio: String!){
    updateBio(bio: $bio){
        id
        username
        imageURL
        followers{
            username
            id
        }
        followings{
            username
            id
        }
        followersCount
        followingsCount
        bio
    }
  }
`

export const UPDATE_PROFILE_PIC = gql`
    mutation updatePic($imageURL: String!){
        updateProfilePic(imageURL: $imageURL){
            id
            username
            followers{
                username
                id
            }
            followings{
                username
                id
            }
            followersCount
            followingsCount
            bio
            imageURL
        }
    }
`