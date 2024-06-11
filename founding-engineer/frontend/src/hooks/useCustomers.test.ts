
import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios'
import useCustomers from './useCustomers';

jest.mock('axios')

describe('useCustomers hook', () => {
    it('fetches customers list succesfully', async () => {
        const mockCustomer = [{id: 1, name: 'Sarim', email: 'sarim@gmail.com'}];
        const mockGet = axios.get as jest.MockedFunction<typeof axios.get>;
        mockGet.mockResolvedValue({data: mockCustomer});

        const {result, waitForNextUpdate} = renderHook(()=> useCustomers());
        await waitForNextUpdate();
    
        expect(result.current.customers).toEqual(mockCustomer);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
    })
})