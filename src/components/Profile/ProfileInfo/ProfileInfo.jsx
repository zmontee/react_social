import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";


const ProfileInfo = (props) => {
    let [editMode, setEditMode] = useState(false);

    const activateEditMode = () => {
        setEditMode(true);
    }

    if (!props.profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
        if(e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData) => {
        props.saveProfile(formData).then(
                () => {
                    setEditMode(false);
                }
            )
        /*console.log(formData);*/
    }

    return (
        <div className={s.profile}>
            <div>
                {/*avatar*/}
                <img src={props.profile.photos.large != null ? props.profile.photos.large : 'https://i.pinimg.com/originals/fc/04/73/fc047347b17f7df7ff288d78c8c281cf.png'}
                     className={s.profilePhoto}/>
                {props.isOwner && <input type={"file"}
                                         onChange={onMainPhotoSelected}
                />}

                {/*status*/}
                <div>
                    <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
                </div>

            </div>

            {/*description*/}
            <div>
                {editMode
                    ? <ProfileDataForm profile={props.profile}
                                       initialValues={props.profile}
                                       onSubmit={onSubmit}
                                       isOwner={props.isOwner}/>
                    : <ProfileData profile={props.profile}
                                   activateEditMode={activateEditMode}
                                   isOwner={props.isOwner}/>}
            </div>
        </div>
    )
}

const ProfileData = (props) => {
   return <div>

       <div className={s.profileName}>
           {props.profile.fullName}
       </div>
        <div>
            Looking for a job: {props.profile.lookingForAJob ? "yes" : "no"}
        </div>
        {props.profile.lookingForAJob &&
        <div>
            My professional skills: {props.profile.lookingForAJobDescription}
        </div>
        }
        <div>
            About me: {props.profile.aboutMe}
        </div>
        <div>
            Contacts: {Object.keys(props.profile.contacts).map(key => {
            return <Contact contactTitle={key}
                            contactValue={props.profile.contacts[key]}
                            key={key}
            />
        })}
        </div>
       {props.isOwner &&  <div><button onClick={props.activateEditMode}>Edit</button></div>}
    </div>
}

const Contact = (props) => {
    return <div className={s.contactItem}>
        <b>{props.contactTitle} </b>: {props.contactValue}
    </div>
}

export default ProfileInfo;