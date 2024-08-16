import React, { useState, useEffect } from 'react';

function SaleForm() {
    const [automobiles, setAutomobiles] = useState([]);
    const [salespeople, setSalespeople] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [vin, setVin] = useState('');
    const [salesperson, setSalesperson] = useState('');
    const [customer, setCustomer] = useState('');
    const [price, setPrice] = useState('');

    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    };

    const handleSalespersonChange = (event) => {
        const value = event.target.value;
        setSalesperson(value);
    };

    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value);
    };

    const handlePriceChange = (event) => {
        const value = event.target.value;
        setPrice(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            automobile: vin,
            salesperson,
            customer,
            price,
        };

        console.log("Data to send:", data);

        const salesUrl = 'http://localhost:8090/api/sales/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        try {
            const response = await fetch(salesUrl, fetchConfig);
            if (response.ok) {
                const newSale = await response.json();
                console.log("Created", newSale);

                await updateAutomobileSoldStatus(vin);

                resetForm()

                fetchData()
              } else {
                  const errorData = await response.json();
                  console.error(errorData);
              }
          } catch (error) {
              console.error('Fetch Error:', error);
          }
      };

          const resetForm = () => {
              setVin('');
              setSalesperson('');
              setCustomer('');
              setPrice('');
          }


    const fetchData = async () => {
        try {
            const [automobileResponse, salespersonResponse, customerResponse] = await Promise.all([
                fetch('http://localhost:8100/api/automobiles/'),
                fetch('http://localhost:8090/api/salespeople/'),
                fetch('http://localhost:8090/api/customers/'),
            ]);

            if (automobileResponse.ok && salespersonResponse.ok && customerResponse.ok) {
                const automobilesData = await automobileResponse.json();
                const salespeopleData = await salespersonResponse.json();
                const customersData = await customerResponse.json();

                if (automobilesData.autos && Array.isArray(automobilesData.autos)) {
                const unsoldAutomobiles = automobilesData.autos.filter(automobile => !automobile.sold);
                setAutomobiles(unsoldAutomobiles);

            } else {
                console.error('Automobiles data is not in the expected format:', automobilesData);
                setAutomobiles([]);
            }

                setSalespeople(salespeopleData.salespeople || []);
                setCustomers(customersData.customers || []);
            } else {
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };


    const updateAutomobileSoldStatus = async (vin) => {
        const automobileUrl = `http://localhost:8100/api/automobiles/${vin}/`;
        const fetchConfig = {
            method: "PUT",
            body: JSON.stringify({ sold: true }),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const response = await fetch(automobileUrl, fetchConfig);
            if (response.ok) {
                console.log(`Automobile ${vin} marked as sold.`);
            } else {
                const errorData = await response.json();
                console.error('Failed to update automobile:', errorData);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);


    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Record A New Sale</h1>
            <form onSubmit={handleSubmit} id="create-sale-form">
            <div className="mb-3">
              <select value={vin} onChange={handleVinChange} required name="vin" id="vin" className="form-select">
                <option value="">Choose An Automobile VIN</option>
                {automobiles.map(automobile => {
                  return (
                    <option key={automobile.id} value={automobile.vin}>
                      {automobile.vin}
                    </option>
                  );
                })}
              </select>
            </div>
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
            <div className="mb-3">
              <select value={customer} onChange={handleCustomerChange} required name="customer" id="customer" className="form-select">
                <option value="">Choose A Customer</option>
                {customers.map(customer => {
                  return (
                    <option key={customer.id} value={customer.id}>
                      {customer.last_name}, {customer.first_name}
                    </option>
                  );
                })}
              </select>
            </div>
              <div className="form-floating mb-3">
                <input value={price} onChange={handlePriceChange} placeholder="Price" required type="text" name="price" id="price" className="form-control" />
                <label htmlFor="price">Price</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

export default SaleForm;
