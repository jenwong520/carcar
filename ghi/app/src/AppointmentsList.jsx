import React, { useEffect, useState } from 'react';

function AppointmentsList() {

    const [appointments, setAppointments] = useState([]);
    const [automobiles, setAutomobiles] = useState([]);

    const isVip = (vin) => {
        const auto = automobiles.find(auto => auto.vin === vin);
        return auto ? auto.sold : false;
    };

    const fetchAppointments = async () => {
        const appointmentsUrl = 'http://localhost:8080/api/appointments/';
        const response = await fetch(appointmentsUrl);
        if (response.ok) {
            const data = await response.json();
            const activeAppointments = data.appointments.filter(appointment => appointment.status === 'active');
            setAppointments(activeAppointments);
        }
    };

    const fetchAutomobiles = async () => {
        const automobilesUrl = 'http://localhost:8100/api/automobiles/';
        const response = await fetch(automobilesUrl);
        if (response.ok) {
            const data = await response.json();
            setAutomobiles(data.autos);
        }
    };

    const deleteAppointments = async (appointmentId) => {
        const url = `http://localhost:8080/api/appointments/${appointmentId}/`;
        const response = await fetch(url, { method: "DELETE" });
        if (response.ok) {
            setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
        }
    };

    useEffect(() => {
        fetchAppointments();
        fetchAutomobiles();
    }, []);

    const handleCancel = async (id) => {
        const cancelUrl = `http://localhost:8080/api/appointments/${id}/cancel/`;
        const response = await fetch(cancelUrl, { method: 'PUT' });
        if (response.ok) {
            fetchAppointments();
        }
    };

    const handleFinish = async (id) => {
        const finishUrl = `http://localhost:8080/api/appointments/${id}/finish/`;
        const response = await fetch(finishUrl, { method: 'PUT' });
        if (response.ok) {
            fetchAppointments();
        }
    };

    return (
		<>
		<h1>Service Appointments</h1>
			<table className="table table-striped">
				<thead>
					<tr>
						<th>VIN</th>
						<th>Is VIP?</th>
						<th>Customer</th>
						<th>Date</th>
						<th>Time</th>
						<th>Technician</th>
                        <th>Reason</th>
                        <th></th>
                        <th></th>
					</tr>
				</thead>
				<tbody>
					{appointments.map(appointment => {
                        const vip = isVip(appointment.vin);
						return (
						<tr key={appointment.id}>
							<td>{ appointment.vin }</td>
							<td>{ vip ? "Yes" : "No" }</td>
							<td>{ appointment.customer }</td>
							<td>{new Date(appointment.date_time).toLocaleDateString()}</td>
                            <td>{new Date(appointment.date_time).toLocaleTimeString()}</td>
							<td>{ appointment.technician.first_name } { appointment.technician.last_name }</td>
                            <td>{ appointment.reason }</td>
                            <td>
                                <button onClick={() => handleCancel(appointment.id)} className="btn btn-danger">Cancel</button>
                                <button onClick={() => handleFinish(appointment.id)} className="btn btn-success">Finish</button>
                            </td>
                            <td>
                                <p align="right">
                                    <button onClick={() => deleteAppointments(appointment.id)} className='btn btn-outline-danger'>Delete</button>
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
export default AppointmentsList;
