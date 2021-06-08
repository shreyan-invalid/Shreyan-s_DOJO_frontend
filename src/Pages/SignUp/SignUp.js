import "./SignUp.css";
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {setUser, deleteUser} from '../../Redux/Slices/UserSlice';
import { useDispatch } from 'react-redux';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/client';
import { FETCH_POSTS_QUERY } from "../../GraphqlQueries/Fetch";


const SignUp = () => {

    const [errors, setErrors] = useState({});
    const dispatch= useDispatch();
    const history= useHistory();

    const [username, setUsername]= useState("");
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [confirmPassword, setconfirmPassword]= useState("");
    const [signUpwriting, setsignUpwriting]= useState("register");

  
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(
      proxy,
      {
        data: { register: userData }
      }
    ) {
      dispatch(setUser({user: userData}))
      console.log(userData);
      localStorage.setItem('jwtToken', userData.token)
      const userObj= JSON.stringify(userData);
      localStorage.setItem('user', userObj);
      const users= proxy.readQuery({query: FETCH_POSTS_QUERY});

      const newUser= {
          __typename: "User",
          ...userData
      }

      proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: {
              getUsers: [newUser, ...users.getUsers]
          }
        })

      
    },
    onCompleted(){
        setsignUpwriting("register");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      console.log(err.graphQLErrors[0].extensions.exception.errors);
      setsignUpwriting("register");
    },
    variables: {
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    }
  });

  const onSubmit = (event) => {
    event.preventDefault();
    setsignUpwriting('loading');
    addUser();
  }

  

  

    return (
        <div className="signup">
            <div className="signup__container">

                <form 
                className="signup__form"
                onSubmit={onSubmit}
                >
                    <h5>Username</h5>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <h5>Email</h5>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <h5>Password</h5>
                    <input 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"/>
                    <h5>Confirm Password</h5>
                    <input 
                        value={confirmPassword}
                        onChange={(e) => setconfirmPassword(e.target.value)}
                        type="password"
                    />

                    <button disabled={signUpwriting == 'loading'? true: false} type="submit">
                        {signUpwriting}
                    </button>
                </form>
            </div>

            {
                Object.keys(errors).length> 0 && 
                <>
                <div className="errors">

                
                    <ul >
                        {
                              Object.values(errors).map((value)=>( 
                                <li key={value}><p>{value}</p></li>
                            ) 
                            )
                        }
                    </ul>  
                </div>
                </>
            }
        </div>
    )
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ){
            id 
            email 
            username 
            createdAt 
            token
            imageURL
            bio
            followersCount
            followingsCount
        }
    }
`;

export default SignUp
