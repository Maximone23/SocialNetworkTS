import React from 'react'
import styles from './Users.module.css'
import userPhoto from '../../assets/image/user-photo.png'
import Pagination from 'react-js-pagination'
import {NavLink} from "react-router-dom";
import {UsersType} from "../../redux/users-reducer";

type UsersPropsType = {
    setPage: (pageNumber: number) => void
    users: Array<UsersType>
    totalCount: number
    pageSize: number
    currentPage: number
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
}

function Users(props: UsersPropsType) {
    return (
        <>
            <Pagination
                hideDisabled
                activePage={props.currentPage}
                itemsCountPerPage={props.pageSize}
                totalItemsCount={props.totalCount}
                onChange={props.setPage}
                innerClass={styles.paginationWrapper}
                itemClass={styles.pageNumber}
                activeClass={styles.activePageNumber}
            />
            {
                props.users.map(u => <div className={styles.wrapper} key={u.id}>
                        <div>
                            <div>
                                <NavLink to={'/profile/' + u.id}>
                                    <img className={styles.userPhoto}
                                         src={u.photos.small != null ? u.photos.small : userPhoto}
                                         alt=""/>
                                </NavLink>

                            </div>
                            <div>
                                {
                                    u.followed ?
                                        <button disabled={props.followingInProgress.some(id => id === u.id)}
                                                onClick={() => {
                                                    props.unfollow(u.id)
                                                }}>Unfollow</button> :
                                        <button disabled={props.followingInProgress.some(id => id === u.id)}
                                                onClick={() => {
                                                    props.follow(u.id)
                                                }}>Follow</button>
                                }
                            </div>
                        </div>
                        <div>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </div>
                    </div>
                )
            }
        </>
    )
}


export default Users