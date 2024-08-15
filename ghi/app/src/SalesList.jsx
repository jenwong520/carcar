import React, { useEffect, useState } from 'react';

function SalesList() {
    const [sales, setSales] = useState([]);

    const fetchSales = async () => {
        const url = 'http://localhost:8090/api/sales/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setSales(data.sales);
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
        fetchSales();
    }, []);

    const formatPrice = (price) => {
        return `$${parseFloat(price).toFixed(2)}`;
    };

    return (
        <>
        <h1>Sales</h1>
            <table className='table table-striped border-bottom'>
                <thead>
                    <tr>
                        <th>Salesperson Employee ID</th>
                        <th>Salesperson Name</th>
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
                                <td>{sales.salesperson.employee_id} </td>
                                <td>{sales.salesperson.first_name} {sales.salesperson.last_name} </td>
                                <td>{sales.customer.first_name} {sales.customer.last_name}</td>
                                <td>{sales.automobile.vin}</td>
                                <td>{formatPrice(sales.price)}</td>
                                <td>
                                    <button onClick={() => deleteSales(sales.id)} className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

export default SalesList;
