import { useState } from 'react';
import axios from 'axios';
import useCustomers from '../hooks/useCustomers';

const LoanForm = () => {
    const {customers, loading, error } = useCustomers();
    const [monthlyPayment, setMonthlyPayment] = useState<string>('');
    const [formData, setFormData] = useState({
        customerId: '',
        amount: '',
        interest_rate: '',
        term: ''
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(!formData.customerId) {
            alert('Please select a customer');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/loanoffers/', {
                customer: parseInt(formData.customerId),
                amount: parseFloat(formData.amount),
                interest_rate: parseFloat(formData.interest_rate),
                term: parseInt(formData.term)
            });
            setMonthlyPayment(response.data.monthly_payment);
        } catch (error) {
            console.error('Error submitting loan data:', error);
        }   
    }

    if (loading) return <p>Loading customers...</p>;

    return (
        <div>
            <h1>Create Loan Offer</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="customerId">
                    Customer:
                    <select name="customerId" id="customerId" value={formData.customerId} onChange={handleSelectChange} required>
                        <option value="">Select a customer</option>
                        {
                            customers.map((customer) => (
                                <option key={customer.id} value={customer.id}>
                                    {customer.name}
                                </option>
                            ))
                        }
                    </select>
                </label>
                <label>
                    Loan Amount:
                    <input type="number" name="amount" value={formData.amount} onChange={handleChange} />
                </label>

                <label>
                    Interest Rate:
                    <input type="number" name="interest_rate" value={formData.interest_rate} onChange={handleChange} />
                </label>

                <label>
                    Term(months):
                    <input type="number" name="term" value={formData.term} onChange={handleChange} />
                </label>

                <button type="submit">Calculate</button>
            </form>
            {monthlyPayment && <div>Monthly Payment: {monthlyPayment} EUR</div>}
        </div>
    )
}

export default LoanForm;