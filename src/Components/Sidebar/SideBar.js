import './SideBar.css';

import React from 'react';
import {Avatar} from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ShopIcon from '@material-ui/icons/Shop';
import StarsIcon from '@material-ui/icons/Stars';
import SettingsIcon from '@material-ui/icons/Settings';
import {useSelector} from 'react-redux';
import {selectUser} from '../../Redux/Slices/UserSlice';
import {Link} from 'react-router-dom';
import default_user from '../../images/default_user.jpg'

const SideBar = () => {

    const user= useSelector(selectUser);
    
    if(user){
        return (
            <div className="sidebar">
                <ul className="sidebar__nav">
                    <li className="sidebar__logo">
                        <Link to="/profile" className="sidebar__link">
    
                            {user.imageURL? <Avatar src={user.imageURL.trim() !== "default"? user.imageURL: default_user}  className="logo"/>: <h3 style={{color: "white"}}>Loading...</h3>}
                            <p className="link__text logo__text">{user.username}</p>
    
                        </Link>
                    </li>
    
                    <li className="sidebar__item">
                        <Link to="/users" className="sidebar__link">
                            <GroupIcon className="sidebar__icon"/>
                            <p className="link__text">People</p>
                        </Link>
                    </li>
    
                    <li className="sidebar__item">
                        <a href="https://vigilant-tesla-b53390.netlify.app/" className="sidebar__link">
                            <StarsIcon className="sidebar__icon"/>
                            <p className="link__text">Covid report</p>
                        </a>
                    </li>
    
                    <li className="sidebar__item">
                        <a href="https://shreyan-s-store.web.app/" className="sidebar__link">
                            <ShopIcon className="sidebar__icon"/>
                            <p className="link__text">Shop here</p>
                        </a>
                    </li>
    
                    <li className="sidebar__item">
                        <a className="sidebar__link">
                            <BookmarkIcon className="sidebar__icon"/>
                            <p className="link__text">Saved</p>
                        </a>
                    </li>
    
                    <li className="sidebar__item">
                        <Link to="/settings" className="sidebar__link">
                            <SettingsIcon className="sidebar__icon"/>
                            <p className="link__text">Settings</p>
                        </Link>
                    </li>
    
                </ul>
            </div>
        )
    }else{
        return(
            <h2 className="sidebar">Loading!</h2>
        )
    }
}

export default SideBar
