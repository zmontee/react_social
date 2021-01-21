import profileReducer, {addPostActionCreator, deletePostActionCreator, likeActionCreator} from "./profileReducer";

let state = {
    posts: [
        {id: 1, message: 'Hey! How r u?', liked: false, likesCount: 3},
        {id: 2, message: 'React is cool.', liked: false, likesCount: 5},
        {id: 3, message: 'Today I\'m gonna learn react!', liked: true, likesCount: 1},
        {id: 4, message: 'Hello everybody. It\'s my first post!', liked: false, likesCount: 0},
        {id: 5, message: 'Yeah! I did it!', liked: false, likesCount: 2},
    ]
};

test('new post should be added', () => {
    let action = addPostActionCreator("social network");

    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(6);
});

test('message of new post should be correct', () => {
    let action = addPostActionCreator("social network");

    let newState = profileReducer(state, action);

    expect(newState.posts[5].message).toBe("social network");
});

test('after deleting length of messages should be decrement', () => {
    let action = deletePostActionCreator(1);

    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(4);
});

test('like should be changed', () => {
    let action = likeActionCreator(1);

    let newState = profileReducer(state, action);

    expect(newState.posts[0].liked).toBe(true);
});
