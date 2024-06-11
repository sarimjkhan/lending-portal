import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import useLoanOffers from './useLoanOffers';

jest.mock('axios');

describe('useLoanOffers hook', () => {
    it('fetches the loan offers correctly', async () => {
        const mockedLoanOffers = [
            {
                id: 1, customer: 1, amount: 5000, interest_rate: 5, term: 12, monthly_payment: 416.67
            }
        ]

        const mockAxiosGet = axios.get as jest.MockedFunction<typeof axios.get>;
        mockAxiosGet.mockResolvedValue({data: mockedLoanOffers})

        const {result, waitForNextUpdate} = renderHook(()=> useLoanOffers());

        await waitForNextUpdate();

        expect(result.current.loanOffers).toEqual(mockedLoanOffers);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
    })
})