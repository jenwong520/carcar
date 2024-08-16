import React, { useEffect, useState } from 'react';

function AutomobilesList() {
	const [automobiles, setAutomobiles] = useState([]);

	const fetchAutomobiles = async () => {
        const url = 'http://localhost:8100/api/automobiles/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setAutomobiles(data.autos);
        }
    };

    const deleteAutomobiles = async (automobileId) => {
        const url = `http://localhost:8100/api/automobiles/${automobileId}/`;
        const response = await fetch(url, { method: "DELETE" });
        if (response.ok) {
            setAutomobiles(automobiles.filter(automobile => automobile.id !== automobileId));
        }
    };

    useEffect(() => {
        fetchAutomobiles();
    }, []);

    return (
		<>
		<h1>Automobiles</h1>
			<table className="table table-striped border-bottom">
				<thead>
					<tr>
						<th>VIN</th>
						<th>Color</th>
						<th>Year</th>
						<th>Model</th>
						<th>Manufacturer</th>
						<th>Sold</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{automobiles.map(auto => {
						return (
						<tr key={auto.id}>
							<td>{ auto.vin }</td>
							<td>{ auto.color }</td>
							<td>{ auto.year }</td>
							<td>{ auto.model.name }</td>
							<td>{ auto.model.manufacturer.name }</td>
							<td>{ (auto.sold).toString() }</td>
							<td>
								<button onClick={() => deleteAutomobiles(auto.id)} className='btn btn-outline-danger'>Delete</button>
							</td>
						</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
}
export default AutomobilesList;
