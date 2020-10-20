import React, {useEffect} from 'react'
import styles from './Users.module.css'
import {UsersPropsType} from './UsersContainer'
import userPhoto from '../../assets/image/user-photo.png'
import axios, {AxiosResponse} from 'axios'
import Pagination from  'react-js-pagination'

function Users(props: UsersPropsType) {
    // if (props.items.length === 0) {
    //     axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
    //         props.setUsers(response.data.items)
    //     })
    // }



        useEffect(() => {

            // Use [] as second argument in useEffect for not rendering each time
                axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${props.currentPage}&count=${props.pageSize}`)
                    .then((response: AxiosResponse) => {
                        props.setUsers(response.data.items)
                        props.setTotalUsersCount(response.data.totalCount)
                    })

        })

    // let pageCount = Math.ceil(props.totalCount / props.pageSize)
    // let pages = [] as Array<number>
    // for (let i = 1; i <= pageCount; i++) {
    //     pages.push(i)
    // }
    // console.log(pages)
    const setPage = (pageNumber: number) => props.setCurrentPage(pageNumber)

    return (
        <div>
            <div>
                <Pagination
                    hideDisabled
                    activePage={props.currentPage}
                    itemsCountPerPage={props.pageSize}
                    totalItemsCount={props.totalCount}
                    onChange={setPage}
                    innerClass={styles.paginationWrapper}
                    itemClass={styles.pageNumber}
                    activeClass={styles.activePageNumber}
                />
                {/*{pages.map(p => <span className={props.currentPage === p ? styles.selectedPage : ''} key={p} onClick={() => {setPage(p)}}>{p}</span>)}*/}
            </div>
            {
                props.items.map(u => <div className={styles.wrapper} key={u.id}>
                        <div>
                            <div>
                                <img className={styles.userPhoto} src={u.photos.small != null ? u.photos.small : userPhoto} alt=""/>
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
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </div>
                    </div>
                )
            }
        </div>
    )

}

export default Users