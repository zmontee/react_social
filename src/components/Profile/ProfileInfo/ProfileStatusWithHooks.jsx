import React, {useState, useEffect} from 'react';
import s from './ProfileInfo.module.css';

const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
            <div>
                <span class={s.status}
                      onClick={activateEditMode}>
                    {props.status || "no status"}
                </span>
            </div>
            }
            {editMode &&
            <div>
                <input autoFocus={true}
                       onBlur={deactivateEditMode}
                       value={status}
                       onChange={onStatusChange}
                />
            </div>
            }
        </div>)
}

export default ProfileStatusWithHooks;