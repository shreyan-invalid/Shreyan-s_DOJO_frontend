import "./Login.css";
import {Link, Redirect} from 'react-router-dom';
import React, {useState} from 'react';
import gql from 'graphql-tag';
import {useDispatch} from 'react-redux';
import {useMutation} from '@apollo/client';
import {setUser} from '../../Redux/Slices/UserSlice';
import {useSelector} from 'react-redux';
import {selectUser} from '../../Redux/Slices/UserSlice';


const Login = () => {

    const[username, setUsername]= useState("");
    const[password, setPassword]= useState("");
    const [errors, setErrors]= useState([]);
    const[loginWriting, setloginWriting]= useState("login");
    const dispatch= useDispatch();
    

    const user= useSelector(selectUser);

   
    


    

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(
          _,
          {
            data: { login: userData }
          }
        ) {
          localStorage.setItem('jwtToken', userData.token);
          dispatch(setUser({user: userData}));
          const userObj= JSON.stringify(userData);
          localStorage.setItem('user', userObj);
        },
        onCompleted(){
          setloginWriting("login");
        },
        onError(err) {
          setErrors(err.graphQLErrors[0].extensions.exception.errors);
          console.log(errors);
          setloginWriting("login");
        },
        variables: {
          username: username,
          password: password,
        }
      });

    const onSubmit = e =>{
        
        setloginWriting('loading');
        e.preventDefault();
        loginUser() 
        
    }


    if(!user) {return (
      <div className="login">
          <div className="login__container">
              
              

              <form onSubmit={onSubmit} className="login__form">
                  <h5>Username</h5>
                  <input onChange={e => setUsername(e.target.value)} value={username} type="text"/>
                  <h5>Password</h5>
                  <input onChange={e => setPassword(e.target.value)} value={password} type="password"/>
                  
                  <button disabled={loginWriting == "loading"? true: false}>{loginWriting}</button>
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
}else{
  <Redirect to="/"/>
}
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
      followingsCount
      followersCount
      bio
      imageURL
    }
  }
`;

export default Login;
