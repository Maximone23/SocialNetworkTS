import profileReducer, {addPost, deletePost, InitialStateType, PostType} from "./profile-reducer";
import {v1} from "uuid";


let postId1: string
let postId2: string
let startState: InitialStateType
beforeEach(() => {

    postId1 = v1()
    postId2 = v1()
    startState = {
        posts: [
            {id: postId1, message: 'Hi, how are u?', likesCount: 23},
            {id: postId2, message: 'It`s my first post', likesCount: 15}
        ] as Array<PostType>,
        profile: null,
        status: '' as string
    }
})

test('Length of posts should be incremented', () => {
    const action = addPost('new post text')

    const endState = profileReducer(startState, action)

    expect(endState.posts.length).toBe(3)

})
test('New post should be added with correct message ', () => {
    const action = addPost('new post text')

    const endState = profileReducer(startState, action)

    expect(endState.posts.length).toBe(3)
    expect(endState.posts[0].message).toBe('new post text')
})
test('after deleting length of posts should be decrement', () => {
    const action = deletePost(postId1)

    const endState = profileReducer(startState, action)

    expect(endState.posts.length).toBe(1)
})
test('after deleting length of posts shouldn`t be decrement if Id is incorrect', () => {
    const action = deletePost("test")

    const endState = profileReducer(startState, action)

    expect(endState.posts.length).toBe(2)
    expect(endState.posts[0]).toEqual(startState.posts[0])
    expect(endState.posts[1]).toEqual(startState.posts[1])
})