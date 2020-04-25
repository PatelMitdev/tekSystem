import React, { useState, useEffect } from 'react';
import './App.css';

const present = new Date();
const lastThreeMonthDate = present.setMonth(present.getMonth() - 3);
const filterTranscationListData = (data)=> {
    const transactions = data.filter(trans =>
        new Date(trans.transactionDt) > new Date(lastThreeMonthDate)).map((info) => {
            let detailsObj = { ...info };
            const { cost } = detailsObj;
            if (cost > 50 && cost < 100) {
                let rewards = cost - 50;
                detailsObj.rewards = rewards;
            } else if (cost > 100) {
                let rewards = (2 * (cost - 100) + 50);
                detailsObj.rewards = rewards;
            } else {
                detailsObj.rewards = 0;
            }
            return detailsObj;
        });
        return transactions
}

const RewardsPointsTable = ({ TransactionDetails }) => {
    const [transactionData, SetUserData] = useState([]);
    const [perMonthRewordsPoints, setMonthRewordsPoints] = useState([]);
    const [totalRewordPoints, setTotalPoints] = useState([]);
    const setGroup = (data) => {
        return data.reduce((r, a) => {
            r[a.name] = [...r[a.name] || [], a];
            return r;
        }, {});
    }
    useEffect(() => {     
        const filterTranscationList = filterTranscationListData(TransactionDetails);
        SetUserData(filterTranscationList);

        let group = setGroup(filterTranscationList)
        let perMonthRewords = []
        for (let i = 0; i < 4; i++) {
            Object.keys(group).forEach((key) => {
                const perMonth = group[key].filter((item) => {
                    return new Date(lastThreeMonthDate).getMonth()+i  === new Date(item.transactionDt).getMonth();
                }).reduce((accumulator, currentValue) => {
                    return {
                        ...accumulator,
                        custid: currentValue.custid,
                        name: currentValue.name,
                        rewardPoints: accumulator.rewardPoints + currentValue.rewards,
                        month: currentValue.transactionDt
                    }
                }, { rewardPoints: 0 });
                if (perMonth.rewardPoints > 0) {
                    perMonthRewords.push(perMonth);
                }

            });
        }
        setMonthRewordsPoints(perMonthRewords);

        const totalGroup = setGroup(perMonthRewords);
        const totalValues = [];
        Object.keys(totalGroup).forEach((key) => {
            const y = totalGroup[key].reduce((accumulator, currentValue) => {
                return {
                    ...accumulator,
                    custid: currentValue.custid,
                    totalRewords: accumulator.totalRewords + currentValue.rewardPoints
                }
            }, { totalRewords: 0 })
            totalValues.push(y);
        });
        setTotalPoints(totalValues);
    }, [TransactionDetails]);
    return (
        <div className="rewardContainer">
            <div>
                <h3>Individual RewordPoints List</h3>
                <table>

                    <thead>
                        <tr>
                            <th>Name </th>
                            <th>Customer Id </th>
                            <th>Date </th>
                            <th>Cost </th>
                            <th>Rewards </th>
                        </tr>

                    </thead>
                    <tbody>
                        {transactionData.map((trans, key) => {
                            return (<tr key={key}>
                                <td>{trans.name}</td>
                                <td>{trans.custid} </td>
                                <td>{trans.transactionDt}</td>
                                <td>{trans.cost}</td>
                                <td>{trans.rewards}</td>
                            </tr>)
                        })
                        }

                    </tbody>
                </table>
            </div>
            <div>
                <h3>PerMonth RewordPoints List</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Customer Id </th>
                            <th>Month </th>
                            <th>Rewards Points </th>
                        </tr>
                    </thead>
                    <tbody>
                        {perMonthRewordsPoints.map((trans, key) => {
                            return (
                                <tr key={key} >
                                    <td>{trans.custid} </td>
                                    <td>{trans.month}</td>
                                    <td>{trans.rewardPoints}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div>
                <h3>perMonth Rewords List</h3>
                <ul>
                    {totalRewordPoints.map((reword, key) => {
                        return (
                            <li key={key} ><span>CustomerID{reword.custid}</span>:{reword.totalRewords}</li>
                        )
                    })}
                </ul>
            </div>
        </div>

    )
}

export default RewardsPointsTable;