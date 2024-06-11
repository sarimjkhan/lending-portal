import React, { useState } from 'react';
import axios from 'axios';

const CustomerForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData(prevFormData => {
        return {
            ...prevFormData,
            [name]: value
        }
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:8000/api/customers/', formData);
        alert('Customer created successfully');
        setFormData({name: '', email: ''});
    } catch (error) {
        console.error("Error creating customer: ", error);
    }
  }

  return (
    <div>
        <h1>Create a customer</h1>
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>
            <button type="submit">Create Customer</button>
        </form>
    </div>
  )
}

export default CustomerForm;
