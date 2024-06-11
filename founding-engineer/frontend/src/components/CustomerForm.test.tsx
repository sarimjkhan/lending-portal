import {render, screen, fireEvent, waitFor} from '@testing-library/react'
import CustomerForm from './CustomerForm'
import axios from 'axios'

jest.mock('axios')

describe('Customer Form Tests', () => {
    it('renders correctly', () => {
        render(<CustomerForm />)
        expect(screen.getByLabelText(/Name:/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument()
        expect(screen.getByText(/create customer/i)).toBeInTheDocument()
    })

    it('allows input to be entered, the change', () => {
        render(<CustomerForm />);
        const nameInput = screen.getByLabelText(/Name:/i) as HTMLInputElement

        //Check the name input
        fireEvent.change(nameInput, {target: {value: "Sarim"}})
        expect(nameInput.value).toBe('Sarim')

        //Check the email input here
    })

    it('submits the form data correctly', async () => {
        const mockPost = axios.post as jest.MockedFunction<typeof axios.post>;
        mockPost.mockResolvedValue({data: {name: 'Sarim', email: 'sarim@gmail.com'}});

        window.alert = jest.fn();

        render(<CustomerForm />);

        //Simulate form inpout and submit click
        const nameInput = screen.getByLabelText(/Name:/i);
        const emailInput = screen.getByLabelText(/Email:/i);
        fireEvent.change(nameInput, { target: { value: 'Sarim' } });
        fireEvent.change(emailInput, { target: { value: 'sarim@gmail.com' } });
        fireEvent.click(screen.getByRole('button', { name: /create customer/i }));

        //await screen.findByText("Customer created successfully")
        await waitFor(() => expect(window.alert).toHaveBeenCalledWith('Customer created successfully'))
        expect(mockPost).toHaveBeenCalledWith('http://localhost:8000/api/customers/', {
            name: 'Sarim',
            email: 'sarim@gmail.com'
        })
    })
})