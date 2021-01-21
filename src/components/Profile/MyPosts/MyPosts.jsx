import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validator";
import {Textarea} from "../../common/FormsControls/FormControls";

const maxLength50 = maxLengthCreator(50)

const MyPostsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                    <Field name={"newPostText"}
                           component={Textarea}
                           validate={[required, maxLength50]}
                           placeholder={"Enter your post text"}
                    />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const MyPostsReduxForm = reduxForm({
    form: 'addPost'
})(MyPostsForm);


const MyPosts = React.memo((props) => {
    let onAddPost = (values) => {
        props.addPost(values.newPostText);
    }

    //without redux-form
    /*    let onPostChange = () => {
            let text = newElementPost.current.value;
            props.updateNewPostText(text);
        }*/

    let postElements =
        props.posts.map(p => <Post message={p.message}
                                   id={p.id}
                                   likesCount={p.likesCount}
                                   liked={p.liked}
                                   profile={props.profile}
                                   like={props.like}
                                   unlike={props.unlike}
        />)

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                {/*<div>
                    <textarea
                        onChange={onPostChange}
                        ref={newElementPost}
                        value={props.newPostText}/>
                </div>*/}
                <MyPostsReduxForm onSubmit={onAddPost}/>

            </div>
            <div className={s.posts}>
                {postElements}
            </div>
        </div>
    )
})

export default MyPosts;