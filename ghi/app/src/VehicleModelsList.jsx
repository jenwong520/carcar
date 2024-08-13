import React, { useEffect, useState } from 'react';

function ModelsList(props) {
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
                    </tr>
                </thead>
                <tbody>
                    {props.models.map(models => {
                        return (
                            <tr key={models.id}>
                                <td>{models.name} </td>
                                <td>{models.manufacturer.name}</td>
                                <td>
                                    <img src={models.picture_url} alt="Logo" width="auto" height="200"/>
                                </td>
                                <td>
                                    <button onClick={() => deleteModels(models.id)} className='btn btn-danger'>Delete</button>
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
