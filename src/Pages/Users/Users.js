import './Users.css';
import SingleUserCard from '../../Components/SingleUserCard/SingleUserCard';
import React from 'react';
import {selectUsers, selectUser} from '../../Redux/Slices/UserSlice';
import {useSelector} from 'react-redux';
import SideBar from '../../Components/Sidebar/SideBar';


function Users() {

    const users= useSelector(selectUsers);
    const currUser= useSelector(selectUser);
   

    if(users && currUser){
            return (
                <div className="home">
                    <SideBar/>
                   <div className="feed">

                   {
                        Object.keys(users).length> 0 && Object.values(users).map((user) => 
                            currUser.username!== user.username && <SingleUserCard
                                key= {user.id}
                                followers={user.followersCount}
                                followings={user.followingsCount}
                                username={user.username}
                                userPhoto={user.imageURL}
                                userId={user.id}
                                followersList={user.followers}
                            />
                        )
                    }
                    

                   </div>
                    
                   
                </div>
            )
    }else{
        return(
            <h2>Loading</h2>
        )
    }
}

export default Users
