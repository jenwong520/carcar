import React, { useEffect, useState } from 'react';

function AutomobilesForm() {
  const [models, setModels] = useState([]);
  const [color, setColor] = useState('');
  const [year, setYear] = useState('');
  const [vin, setVin] = useState('');
  const [model, setModel] = useState('');

  const handleColorChange = (event) => {
      const value = event.target.value;
      setColor(value);
    };

  const handleYearChange = (event) => {
    const value = event.target.value;
    setYear(value);
};

  const handleVinChange = (event) => {
      const value = event.target.value;
    setVin(value);
};

  const handleModelChange = (event) => {
    const value = event.target.value;
    setModel(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      color,
      year,
      vin,
      model_id: model,
    };

    const autosUrl = 'http://localhost:8100/api/automobiles/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await fetch(autosUrl, fetchConfig);
      if (response.ok) {
          const newAuto = await response.json();
          console.log("Created", newAuto);
          resetForm()

        } else {
            const errorData = await response.json();
            console.error(errorData);
        }
    } catch (error) {
        console.error('Fetch Error:', error);
    }
};

    const resetForm = () => {
        setColor('');
        setYear('');
        setVin('');
        setModel('');
    }

const fetchData = async () => {
  const url = 'http://localhost:8100/api/models/';
  try {
    const response = await fetch(url);
    if (response.ok) {
    const data = await response.json();
    setModels(data.models);
  } else {
    console.error('Failed to fetch models');
      setModels([]);
  }
} catch (error) {
    console.error('Fetch error:', error);
    setModels([]);
  }
};

useEffect(() => {
  fetchData();
}, []);

return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add An Automobile To Inventory</h1>
          <form onSubmit={handleSubmit} id="create-automobile-form">
            <div className="form-floating mb-3">
              <input value={color} onChange={handleColorChange} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
              <label htmlFor="color">Color</label>
            </div>
            <div className="form-floating mb-3">
              <input value={year} onChange={handleYearChange} placeholder="Year" required type="number" name="year" id="year" className="form-control" />
              <label htmlFor="year">Year</label>
            </div>
            <div className="form-floating mb-3">
              <input value={vin} onChange={handleVinChange} placeholder="VIN" required type="text" name="vin" id="vin" className="form-control" />
              <label htmlFor="vin">VIN</label>
            </div>
            <div className="mb-3">
              <select value={model} onChange={handleModelChange} required name="model" id="model" className="form-select">
                <option value="">Choose A Model</option>
                {models.map(model => {
                  return (
                    <option key={model.id} value={model.id}>
                      {model.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AutomobilesForm;
