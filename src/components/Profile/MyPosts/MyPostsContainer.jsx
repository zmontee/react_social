import React from 'react';
import {
    addPostActionCreator, likeActionCreator,
    likeThunkCreator, unlikeActionCreator, unlikeThunkCreator,
} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";


/*const MyPostsContainer = (props) => {
    let addPost = () => {
        let action = addPostActionCreator();
        props.dispatch(action);
    }

    let onPostChange = (text) => {
        let action = updateNewPostTextActionCreator(text);
        props.dispatch(action);
    }

    return (<MyPosts
        updateNewPostText={onPostChange}
        addPost={addPost}
        profilePage={props.profilePage}
    />)
}*/

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostText) => {
            let action = addPostActionCreator(newPostText);
            dispatch(action);
        },
        like: (postId) => {
            let action = likeActionCreator(postId);
            dispatch(action)
        },
        unlike: (postId) => {
            let action = unlikeActionCreator(postId);
            dispatch(action)
        },
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;