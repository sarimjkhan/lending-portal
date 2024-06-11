import React, { useState } from 'react';
import useCustomers from '../hooks/useCustomers';
import axios from 'axios';

interface Customer {
    id: number;
    name: string;
    email: string;
}

const Customers: React.FC = () => {
    const {customers, loading, error } = useCustomers();
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

    const fetchCustomerDetails = async (customerId: number) => {
        try {
            const response = await axios.get<Customer>(`http://localhost:8000/api/customers/${customerId}`);
            setSelectedCustomer(response.data);
        } catch (error) {
            console.error('Error fetching customer details:', error);
        }
    };

    if(loading) return <p>Loading Customers..</p>
    if (error) return <p>Error loading customers: {error.message}</p>;

    return (
        <div>
            <h2>Customer List</h2>
            <ul>
                {customers.map(customer => (
                    <li key={customer.id} onClick={() => fetchCustomerDetails(customer.id)}>
                        {customer.name} - {customer.email}
                    </li>
                ))}
            </ul>
            {
                selectedCustomer && (
                    <div>
                        <h3>Customer Details:</h3>
                        <p>Name: {selectedCustomer.name}</p>
                        <p>Email: {selectedCustomer.email}</p>
                    </div>
                )
            }
        </div>
    )
}

export default Customers;