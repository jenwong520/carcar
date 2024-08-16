import React, { useEffect, useState } from 'react';

function SalespersonHistory() {
    const [sales, setSales] = useState([]);
    const [salespeople, setSalespeople] = useState([]);
    const [salesperson, setSalesperson] = useState('');

    const handleSalespersonChange = (event) => {
        const value = event.target.value;
        setSalesperson(value);
        fetchSales(value);
    };

    const fetchSalespeople = async () => {
        try {
            const response = await fetch('http://localhost:8090/api/salespeople/');
            if (response.ok) {
                const data = await response.json();
                setSalespeople(data.salespeople || []);
            } else {
                console.error('Failed to fetch salespeople');
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const fetchSales = async (salespersonId) => {
        if (!salespersonId) return;  // Exit if no salesperson is selected

        const url = `http://localhost:8090/api/sales?salesperson=${salespersonId}`;
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setSales(data.sales);
            } else {
                console.error('Failed to fetch sales');
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const deleteSales = async (saleId) => {
        const url = `http://localhost:8090/api/sales/${saleId}/`;
        const response = await fetch(url, { method: "DELETE" });
        if (response.ok) {
            setSales(sales.filter(sale => sale.id !== saleId));
        }
    };

    useEffect(() => {
        fetchSalespeople();
    }, []);

    const formatPrice = (price) => {
        return `$${parseFloat(price).toFixed(2)}`;
    };


    return (
        <>
        <h1>Salesperson History</h1>
        <div className="mb-3">
              <select value={salesperson} onChange={handleSalespersonChange} required name="salesperson" id="salesperson" className="form-select">
                <option value="">Choose A Salesperson</option>
                {salespeople.map(salesperson => {
                  return (
                    <option key={salesperson.id} value={salesperson.id}>
                      {salesperson.last_name}, {salesperson.first_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <table className='table table-striped border-bottom'>
                <thead>
                    <tr>
                        <th>Salesperson</th>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map(sales => {
                        return (
                            <tr key={sales.id}>
                                <td>{sales.salesperson.first_name} {sales.salesperson.last_name} </td>
                                <td>{sales.customer.first_name} {sales.customer.last_name}</td>
                                <td>{sales.automobile.vin}</td>
                                <td>{formatPrice(sales.price)}</td>
                                <td>
                                    <p align="right">
                                        <button onClick={() => deleteSales(sales.id)} className='btn btn-outline-danger'>Delete</button>
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

export default SalespersonHistory;
