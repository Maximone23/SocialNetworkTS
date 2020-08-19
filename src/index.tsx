import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

let dialogs = [
    {id: 1, name: 'Maxim'},
    {id: 2, name: 'Dmitry'},

    {id: 3, name: 'Elena'},
    {id: 4, name: 'Andrew'},
    {id: 5, name: 'Daria'},
    {id: 6, name: 'Irina'}
];
let messages = [
    {id: 1, message: 'Hi'},
    {id: 2, message: 'How are u?'},
    {id: 3, message: 'Yo'},
    {id: 4, message: 'Yo'},
    {id: 5, message: 'Yo'}
];
let posts = [
    {id: 1, message: 'Hi, how are u?', likesCount: 23},
    {id: 2, message: 'It`s my first post', likesCount: 15}
];
ReactDOM.render(
  <React.StrictMode>
    <App posts={posts} dialogs={dialogs} messages={messages}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
