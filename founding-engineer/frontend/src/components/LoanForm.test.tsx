import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import LoanForm from "./LoanForm"
import axios from 'axios'

jest.mock('axios');

describe('Loan Form', () => {
    it('should render correctly', async () => {
        render(<LoanForm />)
        expect(await screen.findByText(/Create Loan Offer/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Loan Amount/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Interest Rate/i)).toBeInTheDocument();
    })

    it('should submit correctly with correct values', async () => {
        window.alert = jest.fn();
        const mockPost = axios.post as jest.MockedFunction<typeof axios.post>;
        mockPost.mockResolvedValue({data: {monthly_payment: '416.67'}});
    
        const mockedCustomers = [
            { id: 1, name: 'John Doe', email: 'john@example.com' }
        ];
    
        // Mocking the initial customer data load
        const mockGet = axios.get as jest.MockedFunction<typeof axios.get>;
        mockGet.mockResolvedValueOnce({ data: mockedCustomers });
    
        render(<LoanForm />);
    
        // Wait for customers to load and select the first customer
        expect(await screen.findByText(/Create Loan Offer/i)).toBeInTheDocument();
        fireEvent.change(screen.getByLabelText(/Customer:/i), { target: { value: mockedCustomers[0].id.toString() } });
    
        // Fill in other form fields
        fireEvent.change(screen.getByLabelText(/Loan Amount:/i), { target: { value: '5000' } });
        fireEvent.change(screen.getByLabelText(/Interest Rate:/i), { target: { value: '5' } });
        fireEvent.change(screen.getByLabelText(/Term\(months\):/i), { target: { value: '12' } });
    
        // Click submit
        fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));
    
        // Wait for the post call to be called
        await waitFor(() => expect(mockPost).toHaveBeenCalled());
        expect(await screen.findByText(/Monthly Payment: 416.67 EUR/i)).toBeInTheDocument();
    });
    
    
})