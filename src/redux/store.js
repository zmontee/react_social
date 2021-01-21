/*
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";

let store = {
    _state: {
        dialogsPage: {
            dialogs: [
                {id: '1', name: 'Andrey'},
                {id: '2', name: 'Bogdan'},
                {id: '3', name: 'Ann'},
                {id: '4', name: 'Elsa'},
                {id: '5', name: 'Taras'},
                {id: '6', name: 'Alice'},
                {id: '7', name: 'Nazar'}
            ],
            messages: [
                {id: '1', message: 'Hi!'},
                {id: '2', message: 'What\'s up!'},
                {id: '3', message: 'I\'m 21 years old!'}
            ],
            newMessageText: ''
        },
        profilePage: {
            posts: [
                {id: '1', message: 'Hey! How r u?', likesCount: '3'},
                {id: '2', message: 'React is cool.', likesCount: '5'},
                {id: '3', message: 'Today I\'m gonna learn react!', likesCount: '1'},
                {id: '4', message: 'Hello everybody. It\'s my first post!', likesCount: '0'},
                {id: '5', message: 'Yeah! I did it!', likesCount: '2'},
            ],
            newPostText: ''
        }
    },
    _callSubscriber() {

    },

    getState() {
      return this._state;
    },

    dispatch(action) {
        profileReducer(this._state.profilePage, action);
        dialogsReducer(this._state.dialogsPage, action);

        this._callSubscriber();
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    }
}

window.store = store;
export default store;*/
