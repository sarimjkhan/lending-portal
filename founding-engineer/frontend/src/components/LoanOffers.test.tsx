import { render, screen } from '@testing-library/react';
import LoanOffers from './LoanOffers';
import useLoanOffers from '../hooks/useLoanOffers';

jest.mock('../hooks/useLoanOffers');

describe('LoanOffers', () => {
    it('displays loading message', () => {
        const mockUseLoanOffers = useLoanOffers as jest.MockedFunction<typeof useLoanOffers>;
        mockUseLoanOffers.mockReturnValue({ loanOffers: [], loading: true, error: null });
        render(<LoanOffers />);
        expect(screen.getByText(/Loading loan offers.../i)).toBeInTheDocument();
    });

    it('renders loan offers list successfully', () => {
        const mockLoanOffers = [
            { id: 1, customer: { name: 'Sarim' }, amount: 1000, interest_rate: 5, term: 12 },
            { id: 2, customer: { name: 'BeesandBears' }, amount: 2000, interest_rate: 4.5, term: 24 }
        ];
        const mockUseLoanOffers = useLoanOffers as jest.MockedFunction<typeof useLoanOffers>;
        mockUseLoanOffers.mockReturnValue({ loanOffers: mockLoanOffers as any, loading: false, error: null });

        render(<LoanOffers />);
        expect(screen.getByText(/Loan for Customer Sarim: 1000 EUR at 5% interest for 12 months/i)).toBeInTheDocument();
        expect(screen.getByText(/Loan for Customer BeesandBears: 2000 EUR at 4.5% interest for 24 months/i)).toBeInTheDocument();
    });
});
