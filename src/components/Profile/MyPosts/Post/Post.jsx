import React from 'react';
import s from './Post.module.css';
import Preloader from "../../../common/Preloader/Preloader";

const Post = (props) => {
    if (!props.profile) {
        return <Preloader />
    }

    return (
        <div className={s.post}>
            <div className={s.postUserPhotoWrapper}>
                <img  src={props.profile.photos.small != null ? props.profile.photos.small : 'https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png'}/>
            </div>
            <div className={s.postDesc}>
                <div className={s.message}>{props.message}</div>
                <br/>
                <span className={s.likes}>
                    {props.liked
                        ?
                        <button onClick={() => props.unlike(props.id)}
                                className={s.unlike}>
                            <i className="fas fa-heart"></i>
                        </button>
                        :
                        <button onClick={() => props.like(props.id)} className={s.like}>
                            <i className="far fa-heart"></i>
                        </button>
                    }
                    likes({props.likesCount})
                </span>
            </div>
        </div>
    )
}

export default Post;