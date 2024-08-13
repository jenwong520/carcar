import React, { useState } from 'react';

function ManufacturersForm() {
    const [name, setName] = useState('');

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
          name,
        };

        const manufacturersUrl = 'http://localhost:8100/api/manufacturers/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        try {
          const response = await fetch(manufacturersUrl, fetchConfig);
          if (response.ok) {
            const newManufacturer = await response.json();
            console.log(newManufacturer);

            setName('');

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
            <h1>Create a manufacturer</h1>
            <form onSubmit={handleSubmit} id="create-manufacturer-form">
              <div className="form-floating mb-3">
                <input value={name} onChange={handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                <label htmlFor="name">Manufacturer name...</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

export default ManufacturersForm
