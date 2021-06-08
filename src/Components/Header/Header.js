import "./Header.css";
import React, {useState} from 'react';
import SearchIcon from '@material-ui/icons/Search';
import {Avatar} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import ChatIcon from '@material-ui/icons/Chat';
import {deletePublicPosts, deleteUserPosts} from '../../Redux/Slices/PostsSlice';
import {useDispatch, useSelector} from 'react-redux';
import {deleteUser, selectUser} from '../../Redux/Slices/UserSlice';
import {Redirect, Link} from 'react-router-dom';

const Header = () => {
    const [toggle, setToggle]= useState(true);
    const dispatch= useDispatch();
    const user= useSelector(selectUser);

    const handleToggle = () =>{
        setToggle(!toggle);
    }

    function onClick(){
      dispatch(deleteUser())
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('user');
      dispatch(deletePublicPosts());
      dispatch(deleteUserPosts());
      setToggle(true);
     <Redirect to="/login"/>
    }

    return (
        <div className="header">
            <div className="header__left">
                <Link onClick={() => setToggle(true)} to="/" className="header__logo"><h2>Shreyan's DOJO</h2></Link>

                {/* search bar to be implemented */}
                {/* <div className="header__form">
                    <input  type="text"/>
                    <SearchIcon className="header__search"/>
                </div> */}
            
                
            
            </div>

            

            <div className="header__right">
                <div className={toggle? "header__options": "header__options header__dropdown"}>
                    <Link onClick={() => setToggle(true)} to="/" className="header__option">
                        <HomeIcon/>
                    </Link>
                   
                    <a href="https://shreyan-s-superchat.web.app/" onClick={() => setToggle(true)} className="header__option">
                        <ChatIcon/>
                    </a>

                   

                    <div onClick={onClick} className="header__option">
                        <p>Log Out</p>
                    </div>

                    
                    
                </div>
                <Link to="/profile" className="header__profile__option">
                            <Avatar src={user && user.imageURL}/>
                </Link>
                <div className="header__menu">
                        
                        {
                            toggle? <MenuIcon onClick={handleToggle}/>: <CloseIcon onClick={handleToggle}/>
                        }
                    </div>
                
            </div>
        </div>
    )
}

export default Header
