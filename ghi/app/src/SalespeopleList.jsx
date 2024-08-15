import React, { useEffect, useState } from 'react';

function SalespeopleList() {
    const [salespeople, setSalespeople] = useState([]);

    const fetchSalespeople = async () => {
        const url = 'http://localhost:8090/api/salespeople/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setSalespeople(data.salespeople);
        }
    };

    const deleteSalespeople = async (salespersonId) => {
        const url = `http://localhost:8090/api/salespeople/${salespersonId}/`;
        const response = await fetch(url, { method: "DELETE" });
        if (response.ok) {
            setSalespeople(salespeople.filter(salesperson => salesperson.id !== salespersonId));
        }
    };

    useEffect(() => {
        fetchSalespeople();
    }, []);

    return (
        <>
        <h1>Salespeople</h1>
            <table className='table table-striped border-bottom'>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {salespeople.map(salespeople => {
                        return (
                            <tr key={salespeople.id}>
                                <td>{salespeople.first_name} </td>
                                <td>{salespeople.last_name} </td>
                                <td>{salespeople.employee_id}</td>
                                <td>
                                    <button onClick={() => deleteSalespeople(salespeople.id)} className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

export default SalespeopleList;
