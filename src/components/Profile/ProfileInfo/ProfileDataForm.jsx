import React from 'react';
import {reduxForm} from "redux-form";
import {createField, Input, Textarea} from "../../common/FormsControls/FormControls";
import s from "./ProfileInfo.module.css";
import sForm from "../../common/FormsControls/FormControls.module.css";

const ProfileDataForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div className={s.profileName}>
            {props.profile.fullName}
        </div>
        <div>
            Looking for a job: { createField("",
            "lookingForAJob",
            [],
            Input,
            {type: "checkbox"} )}
        </div>

        <div>
            My professional skills:
            { createField("My professional skills",
                "lookingForAJobDescription",
                [],
                Textarea,
                )}
        </div>

        <div>
            About me:
            { createField("About me",
                "aboutMe",
                [],
                Textarea,
            )}
        </div>
        <div>
            Contacts: {Object.keys(props.profile.contacts).map(key => {
            return <div key={key} className={s.contactItem}>
                <b>{key}:{ createField(key,
                    "contacts." + key,
                    [],
                    Input,
                )}</b>
            </div>
        })}
        </div>
        {props.isOwner &&  <div><button>Save</button></div>}
        {props.error && <div className={sForm.formControlSummaryError}>
            {props.error}
        </div>}
    </form>
}

const ProfileDataReduxForm = reduxForm({form: "editProfile"})(ProfileDataForm)

export default ProfileDataReduxForm;