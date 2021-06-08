
import './App.css';
import Header from './Components/Header/Header';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import React from 'react';
import AuthRoute from './Utils/AuthRoute';
import {useQuery} from '@apollo/client';
import {FETCH_POSTS_QUERY} from './GraphqlQueries/Fetch';
import{
  selectUser,
  setUsers
} from './Redux/Slices/UserSlice';
import {setUserPosts, setPublicPosts} from './Redux/Slices/PostsSlice';
import Authentication from './Pages/Authentication/Authentication';
import Home from './Components/Home/Home';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import Users from './Pages/Users/Users';
import SideBar from './Components/Sidebar/SideBar';
import Settings from './Pages/Settings/Settings';




function App() {

  const user= useSelector(selectUser);
  const dispatch= useDispatch();
  const {data, error, loading}= useQuery(FETCH_POSTS_QUERY);

  
  if(error){
    console.log(error);
  }

  
 
  if(data && user){
    console.log(data);
    const userPosts= data.getPosts.filter(post => post.username=== user.username );
    const publicPosts= data.getPosts.filter(post => post.username!== user.username);
    dispatch(setUserPosts({posts: userPosts}));
    dispatch(setPublicPosts({posts: publicPosts}));
    dispatch(setUsers({user: data.getUsers}));
  }else{
    console.log(error);
  }

 
    

  return (
    <div className="app">
      
      <Router>
        <Switch>
          <AuthRoute path="/login" component={Authentication} />
          <Route path="/settings">
            {
              user?
              <>
                <Header/>
                <SideBar/>
                <Settings/>
              </>:
              <Redirect to="/login"/>
            }
          </Route>
          <Route path="/users">
            {
              user? 
              <>
                <Header/>
                <SideBar/>
                <Users/>
              </>:
              <Redirect to="/login"/>
            }
            
          </Route>
          <Route path="/profile">
              <Header/>
              <ProfilePage/>
          </Route>
          <Route path="/">
              
               {user? 
                  <>
                    <Header/>
                    <Home/>
                  </>
                :
                  <Redirect to="/login"/>
               }

          </Route>
        </Switch>
      </Router>
      
      
    </div>
  );
}

export default App;
