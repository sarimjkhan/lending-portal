// Customers.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import Customers from './Customers';
import useCustomers from '../hooks/useCustomers';

jest.mock('../hooks/useCustomers');

describe('Customers', () => {
    it('displays loading message', () => {
        const mockUseCustomers = useCustomers as jest.MockedFunction<typeof useCustomers>;
        mockUseCustomers.mockReturnValue({ customers: [], loading: true, error: null });
        render(<Customers />);
        expect(screen.getByText(/Loading Customers../i)).toBeInTheDocument();
    });

    it('renders customer list successfully', () => {
        const mockCustomers = [
            { id: 1, name: 'Sarim', email: 'sarim@gmail.com' },
            { id: 2, name: 'BeesandBears', email: 'bees@bears.com' }
        ];

        const mockUseCustomers = useCustomers as jest.MockedFunction<typeof useCustomers>;
        mockUseCustomers.mockReturnValue({ customers: mockCustomers, loading: false, error: null });
        
        render(<Customers />);
        
        expect(screen.getByText(/Sarim - sarim@gmail.com/i)).toBeInTheDocument();
        expect(screen.getByText(/BeesandBears - bees@bears.com/i)).toBeInTheDocument();
    });
});
