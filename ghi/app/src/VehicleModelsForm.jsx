import React, { useEffect, useState } from 'react';

function VehicleModelsForm() {
    const [manufacturers, setManufacturers] = useState([]);
    const [name, setName] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');
    const [manufacturer, setManufacturer] = useState('');


    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }

    const handlePictureUrlChange = (event) => {
        const value = event.target.value;
        setPictureUrl(value);
    }

    const handleManufacturerChange = (event) => {
        const value = event.target.value;
        setManufacturer(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            name,
            picture_url: pictureUrl,
            manufacturer_id: manufacturer,
        };
        // console.log("submitting data", data)

        const modelsUrl = 'http://localhost:8100/api/models/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const response = await fetch(modelsUrl, fetchConfig);
            if (response.ok) {
                const newModel = await response.json();
                console.log("Created", newModel);
                resetForm()

            } else {
                const errorData = await response.json();
                console.error(errorData)
            }
        } catch (error) {
            console.error('Fetch Error:', error);
        }
    };

const resetForm = () => {
    setName('');
    setPictureUrl('');
    setManufacturer('');
}

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/manufacturers/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers);
            // console.log(data.manufacturers)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

        return (
            <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create A Vehicle Model</h1>
              <form onSubmit = {handleSubmit} id="create-model-form">
                <div className="form-floating mb-3">
                  <input value={name} onChange={handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                  <label htmlFor="name">Model Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input value={pictureUrl} onChange={handlePictureUrlChange} placeholder="Picture" required type="text" name="picture_url" id="picture_url" className="form-control"/>
                  <label htmlFor="picture_url">Picture Url</label>
                </div>
                <div className="mb-3">
                  <select value={manufacturer} onChange={handleManufacturerChange} required name="manufacturer" id="manufacturer" className="form-select">
                    <option value="">Choose A Manufacturer</option>
                    {manufacturers.map(manufacturer => {
                        return (
                            <option key={manufacturer.id} value={manufacturer.id}>
                                {manufacturer.name}
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
    };

      export default VehicleModelsForm;
