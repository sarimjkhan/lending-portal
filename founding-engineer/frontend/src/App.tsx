import React, { useState } from 'react';
import './App.css';
import Customers from './components/Customers';
import CustomerForm from './components/CustomerForm';
import LoanForm from './components/LoanForm';
import LoanOffers from './components/LoanOffers';

function App() {
  const [view, setView] = useState('loanOffers');

  const renderView = () => {
    switch (view) {
      case 'customers':
        return <Customers />
      case 'loanOffers':
        return <LoanOffers />
      case 'customerForm':
        return <CustomerForm />
      case 'loanForm':
          return <LoanForm />
      default:
        return <LoanForm />
    }
  }

  return (
    <div className="App">
      <h1>Lending Platform</h1>
      <div className='nav-container'>
        <button className='nav-button' onClick={() => setView('loanForm')}>Create Loan Offer</button>
        <button className='nav-button' onClick={() => setView('loanOffers')}>Loan Offers</button>
        <button className='nav-button' onClick={() => setView('customers')}>Customers</button>
        <button className='nav-button' onClick={() => setView('customerForm')}>Create Customer</button>
      </div>
      {renderView()}
    </div>
  );
}

export default App;
