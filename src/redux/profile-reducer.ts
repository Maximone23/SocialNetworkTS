const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are u?', likesCount: 23},
        {id: 2, message: 'It`s my first post', likesCount: 15}
    ] as Array<PostType>,
    newPostText: 'static Text' as string
}
export type PostType = {
    id: number
    message: string
    likesCount: number
}
export type InitialStateType = typeof initialState


const profileReducer = (state: InitialStateType = initialState, action: PostsActionTypes) => {


    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            }
            state.posts.push(newPost)
            state.newPostText = ''
            return state
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText
            return state
        default:
            return state

    }

}
type PostsActionTypes = AddPostACActionType | UpdateNewPostTextACActionType

type UpdateNewPostTextACActionType = {
    type: typeof UPDATE_NEW_POST_TEXT
    newText: string
}
type AddPostACActionType = {
    type: typeof ADD_POST
}


export const addPost = (): AddPostACActionType => ({type: ADD_POST})

export const updateNewPostText = (text: string): UpdateNewPostTextACActionType => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text
})


export default profileReducer