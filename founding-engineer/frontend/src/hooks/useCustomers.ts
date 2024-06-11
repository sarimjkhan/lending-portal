import { useEffect, useState } from "react";
import axios from 'axios';

interface Customer {
    id: number;
    name: string;
    email: string;
}

interface Customers {
    customers: Customer[];
    loading: boolean;
    error: Error | null;
}

const useCustomers = (): Customers => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/customers');
                setCustomers(response.data);
                setLoading(false);            
            } catch (error) {
                setError(error as Error);
                setLoading(false);
            }
        }
        fetchCustomers();
    }, [])

    return {customers, loading, error}
}

export default useCustomers;