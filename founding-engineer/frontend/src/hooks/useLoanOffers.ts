import { useEffect, useState } from "react";
import axios from 'axios';

interface LoanOffer {
    id: number;
    customer: number;
    amount: number;
    interest_rate: number;
    term: number;
    monthly_payment?: number;
}

interface LoanOffers {
    loanOffers: LoanOffer[],
    loading: boolean,
    error: Error | null
}

const useLoanOffers = (): LoanOffers => {
    const [loanOffers, setLoanOffers] = useState<LoanOffer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
      const fetchLoanOffers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/loanoffers');
            setLoanOffers(response.data);
            setLoading(false);
        } catch (error) {
            setError(error as Error);
            setLoading(false);
        }
      }
      fetchLoanOffers();
    }, [])
    
    return {loanOffers, loading, error};
}

export default useLoanOffers;