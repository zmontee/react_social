import React from 'react';
import {addMessageActionCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

/*const DialogsContainer = (props) => {
    let onMessageChange = (text) => {
        let action = updateNewMessageTextActionCreator(text);
        props.dispatch(action);
    }

    let addMessage = () => {
        let action = addMessageActionCreator();
        props.dispatch(action);
    }

    return (
        <Dialogs
            updateNewMessage={onMessageChange}
            addMessage={addMessage}
            dialogsPage={props.dialogsPage}
        />)
}*/

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}

let mapDispatchToProps = (dispatch) => {
    let action;
    return {
        addMessage: (newMessageText) => {
            action = addMessageActionCreator(newMessageText);
            dispatch(action);
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);