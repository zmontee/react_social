import React from 'react';
import Profile from "./Profile";
import {
    getProfileThunkCreator,
    getStatusThunkCreator, savePhotoThunkCreator, saveProfileThunkCreator,
    updateStatusThunkCreator
} from "../../redux/profileReducer";
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


class ProfileContainer extends React.Component {
    refreshProfile() {
        let userId = this.props.match.params.userId;
        let currentUserId = this.props.currentUserId;
        this.props.getProfileThunkCreator(userId, currentUserId);
        this.props.getStatusThunkCreator(userId);
    }

    componentDidMount() {
        this.refreshProfile();
        /*  let userId = this.props.match.params.userId;
        if(!userId) {
            userId = 2;
        }
        usersAPI.getProfile(userId).then(data => {
            this.props.setUserProfile(data);
        });*/
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <Profile {...this.props}
                     isOwner={!this.props.match.params.userId}
                     profile={this.props.profile}
                     isAuth={this.props.isAuth}
                     status={this.props.status}
                     updateStatus={this.props.updateStatusThunkCreator}
                     savePhoto={this.props.savePhotoThunkCreator}
                     saveProfile={this.props.saveProfileThunkCreator}
            />
        )
    }
}

let AuthRedirectComponent = withAuthRedirect(ProfileContainer);

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    currentUserId: state.auth.userId,
    status: state.profilePage.status
})

const WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);

export default compose(
    connect(mapStateToProps,{
        getProfileThunkCreator,
        getStatusThunkCreator,
        updateStatusThunkCreator,
        savePhotoThunkCreator,
        saveProfileThunkCreator
    }),
    withRouter,
    withAuthRedirect
)(ProfileContainer);