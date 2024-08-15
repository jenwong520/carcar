import React, { useState } from 'react';

function CustomerForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    const handleFirstNameChange = (event) => {
        const value = event.target.value;
        setFirstName(value);
    };

    const handleLastNameChange = (event) => {
        const value = event.target.value;
        setLastName(value);
    };

    const handlePhoneNumberChange = (event) => {
        const value = event.target.value;
        setPhoneNumber(value);
    };

    const handleAddressChange = (event) => {
        const value = event.target.value;
        setAddress(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
          first_name: firstName,
          last_name: lastName,
          phone_number: phoneNumber,
          address,
        };

        const customersUrl = 'http://localhost:8090/api/customers/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        try {
          const response = await fetch(customersUrl, fetchConfig);
          if (response.ok) {
            const newCustomers = await response.json();
            console.log(newCustomers);

            setFirstName('');
            setLastName('');
            setPhoneNumber('');
            setAddress('');

          } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
          }
        } catch (error) {
          console.error('Fetch error:', error);
        }
    }

    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add A Customer</h1>
            <form onSubmit={handleSubmit} id="create-customer-form">
              <div className="form-floating mb-3">
                <input value={firstName} onChange={handleFirstNameChange} placeholder="First Name" required type="text" name="first_name" id="first_name" className="form-control" />
                <label htmlFor="first_name">First Name</label>
              </div>
              <div className="form-floating mb-3">
                <input value={lastName} onChange={handleLastNameChange} placeholder="Last Name" required type="text" name="last_name" id="last_name" className="form-control" />
                <label htmlFor="last_name">Last Name</label>
              </div>
              <div className="form-floating mb-3">
                <input value={phoneNumber} onChange={handlePhoneNumberChange} placeholder="Phone Number" required type="text" name="phone_number" id="phone_number" className="form-control" />
                <label htmlFor="phone_number">Phone Number</label>
              </div>
              <div className="form-floating mb-3">
                <input value={address} onChange={handleAddressChange} placeholder="Address" required type="text" name="address" id="address" className="form-control" />
                <label htmlFor="address">Address</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

export default CustomerForm
