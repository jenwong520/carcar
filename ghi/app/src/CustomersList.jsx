import React, { useEffect, useState } from 'react';

function CustomersList() {
    const [customers, setCustomers] = useState([]);

    const fetchCustomers = async () => {
        const url = 'http://localhost:8090/api/customers/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setCustomers(data.customers);
        }
    };

    const deleteCustomers = async (customerId) => {
        const url = `http://localhost:8090/api/customers/${customerId}/`;
        const response = await fetch(url, { method: "DELETE" });
        if (response.ok) {
            setCustomers(customers.filter(customer => customer.id !== customerId));
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <>
        <h1>Customers</h1>
            <table className='table table-striped border-bottom'>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customers => {
                        return (
                            <tr key={customers.id}>
                                <td>{customers.first_name} </td>
                                <td>{customers.last_name} </td>
                                <td>{customers.phone_number}</td>
                                <td>{customers.address}</td>
                                <td>
                                    <p align="right">
                                        <button onClick={() => deleteCustomers(customers.id)} className='btn btn-outline-danger'>Delete</button>
                                    </p>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

export default CustomersList;
