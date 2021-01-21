import './App.css';
import React from 'react';
import Navigation from './components/Navigation/Navigation';
import {Route} from "react-router-dom";
import Music from "./components/Music/Music";
import Login from "./components/Login/Login";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
/*import DialogsContainer from "./components/Dialogs/DialogsContainer";*/
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from "./components/Header/HeaderContainer";
import {Component} from "react";
import {connect} from "react-redux";
import {initializeAppTC} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import DialogsPlug from "./components/Dialogs/DialogsPlug";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

class App extends Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if(!this.props.initialized) {
            return <Preloader />
        }

        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navigation/>
                <div className="app-wrapper-content">
                    <Route path='/profile/:userId?'
                           render={() => <ProfileContainer/>}/>
                    <Route path='/dialogs'
                           render={() => <DialogsPlug/>}/>
                    <Route path='/users'
                           render={() => <UsersContainer/>}/>
                    <Route path='/login'
                           render={() => <Login/>}/>
                    <Route path='/music' component={Music}/>
                    <Route path='/news' component={News}/>
                    <Route path='/settings' component={Settings}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

export default connect(mapStateToProps, {initializeApp: initializeAppTC})(App);
