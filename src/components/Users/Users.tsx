import React from 'react'
import styles from './Users.module.css'
import {UsersPropsType} from './UsersContainer'
import userPhoto from '../../assets/image/user-photo.png'
import Pagination from 'react-js-pagination'
import {NavLink} from "react-router-dom";
import axios, {AxiosResponse} from "axios";

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
                props.items.map(u => <div className={styles.wrapper} key={u.id}>
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
                                        <button onClick={() => {
                                            axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,{
                                                withCredentials: true,
                                                headers: {
                                                    'API-KEY': 'f1c82423-cd00-4395-b54c-61550699ae40'
                                                }
                                            })
                                                .then((response: AxiosResponse) => {
                                                    if (response.data.resultCode == 0) {
                                                        props.unfollow(u.id)
                                                    }
                                                })
                                        }}>Unfollow</button> :
                                        <button onClick={() => {
                                            axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                                withCredentials: true,
                                                headers: {
                                                    'API-KEY': 'f1c82423-cd00-4395-b54c-61550699ae40'
                                                }
                                            })
                                                .then((response: AxiosResponse) => {
                                                    if (response.data.resultCode == 0 ) {
                                                        props.follow(u.id)
                                                    }
                                                })
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