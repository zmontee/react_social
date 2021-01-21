import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/FormControls";
import {maxLengthCreator, required} from "../../utils/validators/validator";

const maxLength60 = maxLengthCreator(60);

const DialogsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={"newMessageText"}
                       placeholder={"Enter your message"}
                       component={Textarea}
                       validate={[required, maxLength60]}
                />
            </div>
            <div>
                <button>New message</button>
            </div>
        </form>
    )
}

const DialogsReduxForm = reduxForm({
    form: 'addMessage'
})(DialogsForm);

const Dialogs = (props) => {
    const onAddMessage = (values) => {
        props.addMessage(values.newMessageText);
    }

    const dialogsElements =
        props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>);

    const messagesElements =
        props.dialogsPage.messages.map(m => <Message text={m.message}/>);


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                {/*<textarea
                    onChange={onMessageChange}
                    ref={newMessageElement}
                    value={props.dialogsPage.newMessageText}/>
                <br/>
                <button onClick={onAddMessage}>New message</button>*/}
                <DialogsReduxForm onSubmit={onAddMessage}/>
            </div>
        </div>
    )
}

export default Dialogs;