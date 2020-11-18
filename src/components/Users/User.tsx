import React from 'react'
import styles from './Users.module.css'
import userPhoto from '../../assets/image/user-photo.png'
import {NavLink} from "react-router-dom";
import {UsersType} from "../../redux/users-reducer";

type UserPropsType = {
    user: UsersType
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

function User({user,followingInProgress, unfollow, follow}: UserPropsType) {
    return (
             <div className={styles.wrapper} >
                        <div>
                            <div>
                                <NavLink to={'/profile/' + user.id}>
                                    <img className={styles.userPhoto}
                                         src={user.photos.small != null ? user.photos.small : userPhoto}
                                         alt=""/>
                                </NavLink>

                            </div>
                            <div>
                                {
                                    user.followed ?
                                        <button disabled={followingInProgress.some(id => id === user.id)}
                                                onClick={() => {
                                                    unfollow(user.id)
                                                }}>Unfollow</button> :
                                        <button disabled={followingInProgress.some(id => id === user.id)}
                                                onClick={() => {
                                                    follow(user.id)
                                                }}>Follow</button>
                                }
                            </div>
                        </div>
                        <div>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </div>
                    </div>
    )
}


export default User