import React from 'react';
import styles from './Users.module.css'
import {UsersTypeM} from './UsersContainer';

function Users(props: UsersTypeM) {
    return (
        <div>
            {
                props.users.map(u => <div className={styles.wrapper} key={u.id}>
                        <div>
                            <div>
                                <img className={styles.userPhoto} src={u.photoUrl} alt=""/>
                            </div>
                            <div>
                                {
                                    u.followed ?
                                        <button onClick={() => props.unfollow(u.id)}>Unfollow</button> :
                                        <button onClick={() => props.follow(u.id)}>Follow</button>
                                }
                            </div>
                        </div>
                        <div>
                            <div>{u.fullName}</div>
                            <div>{u.status}</div>
                        </div>
                    </div>
                )
            }
        </div>
    )

}

export default Users