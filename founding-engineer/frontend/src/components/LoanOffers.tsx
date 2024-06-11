import React from 'react';
import useLoanOffers from '../hooks/useLoanOffers';

const LoanOffers: React.FC = () => {
    const {loanOffers, loading, error} = useLoanOffers();

    if (loading) return <div>Loading loan offers...</div>;
    if (error) return <div>Error fetching loan offers: {error.message}</div>;


    return (
        <div>
            <h1>Loan Offers</h1>
            <ul>
                {loanOffers.map((offer: any) => (
                    <li key={offer.id}>
                        Loan for Customer {offer.customer.name}: {offer.amount} EUR at {offer.interest_rate}% interest for {offer.term} months
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default LoanOffers;