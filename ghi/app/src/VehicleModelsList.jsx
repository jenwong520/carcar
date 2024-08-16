import React, { useEffect, useState } from 'react';

function ModelsList() {
    const [models, setModels] = useState([]);

    const fetchModels = async () => {
        const url = 'http://localhost:8100/api/models/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setModels(data.models);
        }
    };

    const deleteModels = async (modelId) => {
        const url = `http://localhost:8100/api/models/${modelId}/`;
        const response = await fetch(url, { method: "DELETE" });
        if (response.ok) {
            setModels(models.filter(model => model.id !== modelId));
        }
    };

    useEffect(() => {
        fetchModels();
    }, []);

    return (
        <>
            <h1>Models</h1>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Manufacturer</th>
                        <th>Picture</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {models.map(models => {
                        return (
                            <tr key={models.id}>
                                <td>{models.name} </td>
                                <td>{models.manufacturer.name}</td>
                                <td>
                                    <div style={{ width: '25rem', height: '15rem', overflow: 'hidden', display: 'inline-block' }} >
                                        <img src={models.picture_url} alt="Model" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    </div>
                                </td>
                                <td>
                                    <p align="right">
                                        <button onClick={() => deleteModels(models.id)} className='btn btn-outline-danger'>Delete</button>
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

export default ModelsList;
