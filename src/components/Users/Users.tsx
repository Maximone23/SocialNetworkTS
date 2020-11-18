import React from 'react'
import styles from './Users.module.css'
import Pagination from 'react-js-pagination'
import {UsersType} from "../../redux/users-reducer";
import User from "./User";

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

function Users({currentPage, pageSize, totalCount, setPage, users, follow, unfollow, followingInProgress}: UsersPropsType) {
    return (

        <>
            <Pagination
                hideDisabled
                activePage={currentPage}
                itemsCountPerPage={pageSize}
                totalItemsCount={totalCount}
                onChange={setPage}
                innerClass={styles.paginationWrapper}
                itemClass={styles.pageNumber}
                activeClass={styles.activePageNumber}
            />
            {
                users.map(u => <User key={u.id}
                                     user={u}
                                     follow={follow}
                                     unfollow={unfollow}
                                     followingInProgress={followingInProgress} />
                )
            }
        </>
    )
}


export default Users