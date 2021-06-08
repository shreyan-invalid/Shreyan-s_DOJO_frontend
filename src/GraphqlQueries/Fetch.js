
import {gql} from '@apollo/client';



export const FETCH_POSTS_QUERY = gql`
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

  getUsers{
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
      imageURL
    }
}
`;

export const FETCH_USER_IMAGE = gql`
  query getProfilePic($username: String) {
    getProfilePic(username: $username) 
  }
`;




export const FETCH_CURRENT_USER= gql `{
  getUser{
    id
    username
    followersCount
    followingsCount
    bio
    imageURL
  }
}
`