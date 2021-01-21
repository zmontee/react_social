import React from 'react';
import s from './Message.module.css';

const Message = (props) => {
    return (
        <div className={s.massage}>
            {props.text}
        </div>
    )
}

export default Message;