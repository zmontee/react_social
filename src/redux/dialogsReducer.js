const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

const initialState = {
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
    ]
}

const dialogsReducer = (state = initialState, action) => {
    let stateCopy;
    switch (action.type) {
        case ADD_MESSAGE: {
            // Updated version
            /*let text = state.newMessageText;*/
            let text = action.newMessageText;
            let id = (state.messages.length + 1).toString();
            let newMessage = {
                id: id,
                message: text
            }
            return {
                ...state,
                messages: [...state.messages, newMessage]
            }

            // Old version
            /*let newMessage = {
                id: (state.messages.length + 1).toString(),
                message: state.newMessageText
            }
            let stateCopy = {...state};
            stateCopy.messages = [...state.messages];
            stateCopy.messages.push(newMessage);
            stateCopy.newMessageText = '';
            return stateCopy;*/
        }
        default:
            return state;
    }
}

export const addMessageActionCreator = (newMessageText) => ({type: ADD_MESSAGE, newMessageText});
export default dialogsReducer;