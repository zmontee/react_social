import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {Redirect} from "react-router-dom";

const Profile = (props) => {

    return (
      <div className={s.profile}>
        <ProfileInfo profile={props.profile}
                     status={props.status}
                     updateStatus={props.updateStatus}
                     isOwner={props.isOwner}
                     saveProfile={props.saveProfile}
                     savePhoto={props.savePhoto}
        />
        <MyPostsContainer profile={props.profile}
        />
      </div>
    )
}

export default Profile;