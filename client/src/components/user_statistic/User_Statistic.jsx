import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import { actions, getUsersStatisticsThunk } from '../../redux/user_statistic-reducer';
import styles from './User_statistic.module.scss';
import { Line } from 'react-chartjs-2';
import { getToData, getFromData, getUserStatistic } from '../../redux/user_statistic-selector';
import { DatePicker, Space } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
const queryString = require('query-string');;

const UserStatistic = (props) => {
    const { id } = useParams()
    const { RangePicker } = DatePicker;
    // from = '2019-10-02', to = '2019-10-30'
    const userStatistic = useSelector(getUserStatistic);
    const toData = useSelector(getToData);
    const fromData = useSelector(getFromData);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const parsed = queryString.parse(history.location.search)
        dispatch(actions.setFromTo(parsed.from, parsed.to))
        dispatch(getUsersStatisticsThunk(id, parsed.from, parsed.to))
    }, [])
    
    

    const stateForClicks = {
        labels: userStatistic.dateArray,
        datasets: [
            {
                label: 'Clicks',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: userStatistic.clicksArray
            }
        ]
    }
    const stateForViews = {
        labels: userStatistic.dateArray,
        datasets: [
            {
                label: 'Views',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: userStatistic.viewsArray
            }
        ]
    }
    const dateFormat = "YYYY-MM-DD";
    const changeDate = (mode) => {
        
        dispatch(actions.setFromTo(mode[0], mode[1]))
        dispatch(getUsersStatisticsThunk(id, mode[0], mode[1]));
    }

    useEffect(() => {
        const parsedForUrl = {};
        if(!!fromData) parsedForUrl.from = fromData
        if(!!toData) parsedForUrl.to = toData
        
        history.push({
            pathname: `/user/${id}`,
            search: queryString.stringify(parsedForUrl)
        })
    },[toData, fromData])
    debugger
    return (
        <div >
            <div>
                {userStatistic.fullName}
            </div>
            <div>
                <Space direction="vertical" size={12}>
                    <RangePicker bordered={false} 
                        onChange={(value, mode) => changeDate(mode)}
                        value={[moment(fromData, dateFormat), moment(toData, dateFormat)]}
                        format={"YYYY-MM-DD"}
                        disabledDate={(current) => {
                            return (
                                current < moment("2019-10-01", dateFormat) ||
                                current > moment("2019-10-31", dateFormat)
                            );
                        }} />
                </Space>
            </div>
            <div style={{ width: '1050px', height: '550px' }}>
                <Line
                    data={stateForClicks}
                    options={{
                        title: {
                            display: true,
                            text: 'Clicks',
                            fontSize: 20
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        },
                        scales: {
                            xAxes: [
                                {
                                    gridLines: {
                                        display: false
                                    }
                                }
                            ]
                        }
                    }}
                />
            </div>
            <div style={{ width: '1050px', height: '550px' }}>

                <Line
                    data={stateForViews}
                    options={{
                        title: {
                            display: true,
                            text: 'Views',
                            fontSize: 20
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        },
                        scales: {
                            xAxes: [
                                {
                                    gridLines: {
                                        display: false
                                    }
                                }
                            ]
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default UserStatistic;