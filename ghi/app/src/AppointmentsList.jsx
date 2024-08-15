import React, { useEffect, useState } from 'react';

function AppointmentsList(props) {

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    }

    function formatTime(dateString) {
        const date = new Date(dateString);
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        return `${hours}:${minutes}:${seconds} ${ampm}`;
    }

    const [appointments, setAppointments] = useState([]);
    const [automobiles, setAutomobiles] = useState([]);

    const fetchAppointments = async () => {
        const appointmentsUrl = 'http://localhost:8080/api/appointments/';
        const response = await fetch(appointmentsUrl);
        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments);
        }
    };

    const fetchAutomobiles = async () => {
        const automobilesUrl = 'http://localhost:8080/api/automobiles/';
        const response = await fetch(automobilesUrl);
        if (response.ok) {
            const data = await response.json();
            setAutomobiles(data.autos);
        }
    };

    useEffect(() => {
        fetchAppointments();
        fetchAutomobiles();
    }, []);

    const isVip = (vin) => {
        const auto = automobiles.find(auto => auto.vin === vin);
        return auto ? auto.sold : false;
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
					</tr>
				</thead>
				<tbody>
					{props.appointments.map(appointment => {
                        const vip = isVip(appointment.vin);
						return (
						<tr key={appointment.id}>
							<td>{ appointment.vin }</td>
							<td>{ vip ? "Yes" : "No" }</td>
							<td>{ appointment.customer }</td>
							<td>{ formatDate(appointment.date_time) }</td>
                            <td>{ formatTime(appointment.date_time) }</td>
							<td>{ appointment.technician.first_name } { appointment.technician.last_name }</td>
							<td>{ appointment.reason }</td>
                            <td></td>
						</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
}
export default AppointmentsList;
