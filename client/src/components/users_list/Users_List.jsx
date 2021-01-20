import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { actions, getUsersThunk } from '../../redux/users_list-reducer';
import { getCurrentPage, getPortionCount, getTotalUsersCount, getUsersList } from '../../redux/users_list-selector';
import Pagination from './pagination/Pagination';
const queryString = require('query-string');

const UsersList = (props) => {
    const totalUsersCount = useSelector(getTotalUsersCount)
    const portionCount = useSelector(getPortionCount)
    const currentPage = useSelector(getCurrentPage)
    const history = useHistory();
    const dispatch = useDispatch()
    const usersList = useSelector(getUsersList)
    
    const getNewPortionOfUsers = (pageNumber) => {
        dispatch(actions.changeCurrentPage(pageNumber));
        dispatch(getUsersThunk(pageNumber, portionCount))
    }
    const usersListArray = usersList.map( user => {
        return <tr key={user.id}>
                    <td>{user.id}</td>
                    <td><NavLink to={`/user/${user.id}`}>{user.first_name}</NavLink></td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                    <td>{user.gender}</td>
                    <td>{user.ip_address}</td>
                    <td>{user.totalClicks}</td> 
                    <td>{user.totalPageViews}</td>
            </tr>
    })

    useEffect( () => {
        const parsed = queryString.parse(history.location.search)
        dispatch(actions.changeCurrentPage(Number(parsed.page)));
        dispatch(actions.changePortionCount(Number(parsed.count)));
        dispatch(getUsersThunk(Number(parsed.page), Number(parsed.count)))
    }, [])

    useEffect(() => {
        const parsedForUrl = {};
        if(!!currentPage) parsedForUrl.page = currentPage
        if(!!portionCount) parsedForUrl.count = portionCount
        
        history.push({
            pathname: '/users-list',
            search: queryString.stringify(parsedForUrl)
        })
    },[currentPage, portionCount])
    
    return(
        <div>
            It`s users list
            <table>
            <thead>
                
                    <th>ID</th>
                    <th>First name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>IP Adress</th>
                    <th>Total clicks</th>   
                    <th>Total page views</th>
              
            </thead>
            <tbody>        
                {usersListArray}
            </tbody>
            </table>

            <Pagination getNewPortionOfUsers={getNewPortionOfUsers}
            totalUsersCount={totalUsersCount}
            portionCount={portionCount}
            currentPage={currentPage}/>
        </div>
    );
}

export default UsersList;