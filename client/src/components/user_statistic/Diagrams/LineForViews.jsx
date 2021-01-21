import 'antd/dist/antd.css';
import React from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { getUserStatistic } from '../../../redux/user_statistic-selector';
import styles from './Diagrams.module.scss'

const LineForViews = (props) => {
    const userStatistic = useSelector(getUserStatistic);
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
    return (
        <div >
            <div className={styles.title}>
                Views
            </div>
            <div className={styles.diagram}>
                <Line
                    data={stateForViews}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        title: {
                            display: false,
                            text: 'Views',
                            fontSize: 20
                        },
                        legend: {
                            display: false,
                            position: 'right'
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    stepSize: 200
                                }
                                }
                            ],
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

export default LineForViews;