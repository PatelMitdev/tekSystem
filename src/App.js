import React from 'react';
import RewardsPointsTable from './RewardsPoinsTable'
import { TransactionDetails } from './TransactionsInfo';
import './App.css';

function App() {
  return (
    <div className="App">
      <RewardsPointsTable TransactionDetails={TransactionDetails}/>
    </div>
  );
}

export default App;
