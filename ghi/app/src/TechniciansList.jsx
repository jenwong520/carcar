import React, { useEffect, useState } from 'react';

function TechniciansList() {

	const [technicians, setTechnicians] = useState([]);

    const fetchTechnicians = async () => {
        const url = 'http://localhost:8080/api/technicians/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians);
        }
    };

    const deleteTechnicians = async (technicianId) => {
        const url = `http://localhost:8080/api/technicians/${technicianId}/`;
        const response = await fetch(url, { method: "DELETE" });
        if (response.ok) {
            setTechnicians(technicians.filter(technician => technician.id !== technicianId));
        }
    };

    useEffect(() => {
        fetchTechnicians();
    }, []);


	return (
		<>
		<h1>Technicians</h1>
			<table className="table table-striped">
				<thead>
					<tr>
						<th>Employee ID</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{technicians.map(technician => {
						return (
						<tr key={technician.id}>
							<td>{ technician.employee_id }</td>
                            <td>{ technician.first_name }</td>
                            <td>{ technician.last_name }</td>
							<td>
							<p align="right">
                                <button onClick={() => deleteTechnicians(technician.id)} className='btn btn-outline-danger'>Delete</button>
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
export default TechniciansList;
