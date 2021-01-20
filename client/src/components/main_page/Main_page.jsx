import React from 'react'
import { NavLink } from 'react-router-dom';
import styles from './Main_page.module.scss';

const MainPage = (props) => {

    return(
        <div>
            It`s main page
            <div><NavLink to='/users-list'>USERS-LIST</NavLink></div>
            
        </div>
    );
}

export default MainPage;