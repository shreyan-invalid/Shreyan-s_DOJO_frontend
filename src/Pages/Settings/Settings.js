import "./Settings.css";
import SideBar from '../../Components/Sidebar/SideBar';
import {useSelector, useDispatch} from 'react-redux';
import {selectUser, setUser} from '../../Redux/Slices/UserSlice';
import React, {useState} from 'react'
import {UPDATE_BIO, UPDATE_PROFILE_PIC} from '../../GraphqlQueries/Mutations';
import {FETCH_POSTS_QUERY} from '../../GraphqlQueries/Fetch';
import {useMutation} from '@apollo/client'; 
import {storage} from '../../Firebase';





function Settings() {


    const currUser= useSelector(selectUser);
    const [image, setImage]= useState(null);
    const [imageURL, setImageURL]= useState(null);
    const [bio, setBioUpdate]= useState("");
    const [loading, setLoading]= useState(false);
    const [bioOption, setBioOption]= useState("update");
    const dispatch= useDispatch();

    const [updateBio]= useMutation(UPDATE_BIO, {
        update(cache, result){
            const users= cache.readQuery({
                query: FETCH_POSTS_QUERY
            })

            const filteredUsers= users.getUsers.filter(user => user.username !== currUser.username);

            const updatedUser = {
                __typename: "User",
                ...result.data.updateBio
            }

            const updatedUsers= [...filteredUsers, updatedUser];

            cache.writeQuery({
                query: FETCH_POSTS_QUERY,
                data : {
                    getUsers: updatedUsers
                    
                }
              }
            )

            dispatch(setUser({user: updatedUser}));
            const finalUser = JSON.stringify(updatedUser);
            localStorage.setItem("user", finalUser);

            console.log(updatedUsers)
            setBioUpdate("");

        },
        onCompleted(){
            setBioOption("update");
            setLoading(false);
        },
        onError(err) {
            console.log(err);
            setBioOption("update");
        },
        variables: {
            bio
        }
    });

    const handleBioUpload = (e) => {
        e.preventDefault();
        setLoading(true);
        setBioOption("Please wait...")
        if(bio)updateBio();
        else alert("Please provide a bio");
    }

    const [updateProfilePic] = useMutation(UPDATE_PROFILE_PIC, {
        update(cache, result){
            const users= cache.readQuery({
                query: FETCH_POSTS_QUERY
            })

            const filteredUsers= users.getUsers.filter(user => user.username !== currUser.username);

            const updatedUser = {
                __typename: "User",
                ...result.data.updateProfilePic
            }

            const updatedUsers= [...filteredUsers, updatedUser];

            cache.writeQuery({
                query: FETCH_POSTS_QUERY,
                data : {
                    getUsers: updatedUsers
                }
              }
            )

            

            alert("Updated Profile Picture successfully!");
            setImage(null);
            setImageURL(null);
            dispatch(setUser({user: updatedUser}));
            const finalUser = JSON.stringify(updatedUser);
            localStorage.setItem("user", finalUser);
        },
        onCompleted(){
            setLoading(false);
        },
        onError(err){
            console.log(err);
        },
        variables : {
            imageURL
        }
    });


    const handleUpload = (e) => {
        e.preventDefault();

       
        if(image){
            
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
                                updateProfilePic();
                                setLoading(false);
                            })
                    }
                )
            
            
        }else{
            alert("Please give an image");
        }
    }


    return (
        <div className="home">
            <SideBar/>
            <div className="feed">
                <form className="settings__edit__imageURL">
                    <img src={currUser.imageURL}/>
                    <h3>Change Profile Picture</h3>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
                    <button disabled={loading && true} onClick={handleUpload}>{loading? "loading..." : "Upload"}</button>
                </form>

                <form className="settings__edit__bio">
                    <p>About : {currUser.bio.trim()=== "" ? "Nothing to show! Update bio now": currUser.bio}</p>
                    <h3>About youself!</h3>
                    <input type="text" placeholder="Write about yourself" value={bio} onChange={(e)=> setBioUpdate(e.target.value)}/>
                    <button  onClick={handleBioUpload}>{bioOption}</button>
                </form>
            </div>
        </div>
    )
}

export default Settings
