import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import styles from './Pagination.module.scss';

const Pagination = (props) => {
    
    const pageCount = Math.ceil(props.totalUsersCount / props.portionCount);
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }
    let numberOfPage =  Math.floor(1 * Math.ceil(props.currentPage / 11));
    const [ currentPortion, setCurrentPortion ] = useState(numberOfPage);
    useEffect(() => {
        setCurrentPortion(numberOfPage)
    }, [numberOfPage])
    let portionNumber = Math.ceil(pageCount / 10);
    let leftBorder = ((currentPortion - 1) * 10) + 1;
    let rightBorder = 10 * currentPortion;

    return(
        <div className={cn(styles.pages)}>
                {currentPortion > 1 && <button onClick={() => setCurrentPortion(currentPortion-1)}>minus</button> }
                {pages
                .filter(page => page >= leftBorder && page <= rightBorder)
                .map(page => {
                    return (
                        <span onClick={() => { props.getNewPortionOfUsers(page)}} className={cn({[styles.pageSelected || styles.page]: props.currentPage === page}) } key={page}>{page} </span>
                    );
                })
                }
                {portionNumber > currentPortion && <button onClick={() => setCurrentPortion(currentPortion+1)}>plus</button> }
            </div>
    );
}

export default Pagination;