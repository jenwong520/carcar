import React, { useState, useEffect } from 'react';

function ServiceHistory() {
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [vin, setVin] = useState('');
    const [automobiles, setAutomobiles] = useState([]);

    const isVip = (vin) => {
        const auto = automobiles.find(auto => auto.vin === vin);
        return auto ? auto.sold : false;
    };

    const fetchAppointments = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/appointments/');
            if (response.ok) {
                const data = await response.json();
                setAppointments(data.appointments);
                setFilteredAppointments(data.appointments);

                console.error("Failed to fetch appointments");
            }
        } catch (error) {
            console.error("Error fetching appointments:", error);
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

    useEffect(() => {
        fetchAppointments();
        fetchAutomobiles();
    }, []);

    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        if (vin === '') {
            setFilteredAppointments(appointments);
        } else {
            const filtered = appointments.filter(appointment =>
                appointment.vin.toLowerCase().includes(vin.toLowerCase())
            );
            setFilteredAppointments(filtered);
        }
    };



    return (
        <div>
            <h1>Service History</h1>
            <form onSubmit={handleSearch}>
                <div className="form-group">
                    <label htmlFor="vin">Search by VIN</label>
                    <input value={vin} onChange={handleVinChange} placeholder="Enter VIN" type="text" id="vin" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Search</button>
            </form>

            <table className="table table-striped mt-4">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Is VIP?</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAppointments.map(appointment => {
                        const vip = isVip(appointment.vin);
                        return (
                        <tr key={appointment.id}>
                            <td>{appointment.vin}</td>
                            <td>{ vip ? "Yes" : "No" }</td>
                            <td>{appointment.customer}</td>
                            <td>{new Date(appointment.date_time).toLocaleDateString()}</td>
                            <td>{new Date(appointment.date_time).toLocaleTimeString()}</td>
                            <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                            <td>{appointment.reason}</td>
                            <td>{appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}</td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ServiceHistory;
