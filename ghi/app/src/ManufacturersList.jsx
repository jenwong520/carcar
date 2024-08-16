import React, { useEffect, useState } from 'react';

function ManufacturersList() {
	const [manufacturers, setManufacturers] = useState([]);

	const fetchManufacturers = async () => {
		const url = 'http://localhost:8100/api/manufacturers/';
		const response = await fetch(url);
		if (response.ok) {
			const data = await response.json();
			setManufacturers(data.manufacturers);
		}
	};

	const deleteManufacturers = async (manufacturerId) => {
		const url = `http://localhost:8100/api/manufacturers/${manufacturerId}/`;
		const response = await fetch(url, { method: "DELETE" });
		if (response.ok) {
			setManufacturers(manufacturers.filter(manufacturer => manufacturer.id !== manufacturerId));
		}
	};

	useEffect(() => {
		fetchManufacturers();
	}, []);

    return (
		<>
		<h1>Manufacturers</h1>
			<table className="table table-striped">
				<thead>
					<tr>
						<th>Name</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{manufacturers.map(manufacturer => {
						return (
						<tr key={manufacturer.id}>
							<td>{ manufacturer.name }</td>
							<td>
								<p align="right">
                                <button onClick={() => deleteManufacturers(manufacturer.id)} className='btn btn-outline-danger'>Delete</button>
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
export default ManufacturersList;
