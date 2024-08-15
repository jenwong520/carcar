import React, { useEffect, useState } from 'react';

function AppointmentsForm() {
  const [technicians, setTechnicians] = useState([]);
  const [vin, setVin] = useState('');
  const [customer, setCustomer] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [technician, setTechnician] = useState('');
  const [reason, setReason] = useState('');

  const fetchData = async () => {
    const url = 'http://localhost:8080/api/technicians/';
    try {
      const response = await fetch(url);
      if (response.ok) {
      const data = await response.json();
      setTechnicians(data.technicians);
    } else {
      console.error('Failed to fetch technicians');
        setTechnicians([]);
    }
  } catch (error) {
      console.error('Fetch error:', error);
      setTechnicians([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handleVinChange = (event) => {
    const value = event.target.value;
    setVin(value);
  };

  const handleCustomerChange = (event) => {
      const value = event.target.value;
      setCustomer(value);
    };

  const handleDateChange = (event) => {
    const value = event.target.value;
    setDate(value);
};

  const handleTimeChange = (event) => {
      const value = event.target.value;
    setTime(value);
};

  const handleTechnicianChange = (event) => {
    const value = event.target.value;
    setTechnician(value);
  };

  const handleReasonChange = (event) => {
    const value = event.target.value;
    setReason(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dateTime = new Date(`${date}T${time}`)
    const data = {
      vin,
      customer,
      date_time: dateTime.toISOString(),
      technician_id: technician,
      reason,
    };

    const appointmentsUrl = 'http://localhost:8080/api/appointments/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await fetch(appointmentsUrl, fetchConfig);
      if (response.ok) {
          const newAppointment = await response.json();
          console.log("Created", newAppointment);
          resetForm();
          console.log("reset", resetForm);
          console.log("RESPONSE:", response);

        } else {
            const errorData = await response.json();
            console.error(errorData);
        }
    } catch (error) {
        console.error('Fetch Error:', error);
    }
};

const resetForm = () => {
  setVin('');
  setCustomer('');
  setDate('');
  setTime('');
  setTechnician('');
  setReason('');
}

return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a service appointment</h1>
          <form onSubmit={handleSubmit} id="create-appointment-form">
            <div className="form-floating mb-3">
              <input value={vin} onChange={handleVinChange} placeholder="Enter VIN" required type="text" name="vin" id="vin" className="form-control" />
              <label htmlFor="vin">Automobile VIN</label>
            </div>
            <div className="form-floating mb-3">
              <input value={customer} onChange={handleCustomerChange} placeholder="Enter customer" required type="text" name="customer" id="customer" className="form-control" />
              <label htmlFor="customer">Customer</label>
            </div>
            <div className="form-floating mb-3">
              <input value={date} onChange={handleDateChange} placeholder="Enter date" required type="date" name="date" id="date" className="form-control" />
              <label htmlFor="date">Date</label>
            </div>
            <div className="form-floating mb-3">
              <input value={time} onChange={handleTimeChange} placeholder="Enter time" required type="time" name="time" id="time" className="form-control" />
              <label htmlFor="time">Time</label>
            </div>
            <div className="mb-3">
              <select value={technician} onChange={handleTechnicianChange} required name="technician" id="technician" className="form-select">
                <option value="">Choose a technician...</option>
                {technicians.map(technician => {
                  return (
                    <option key={technician.id} value={technician.id}>
                      {technician.last_name}, {technician.first_name}
                    </option>
                  );
                })}
              </select>
              <div className="form-floating mb-3">
              <input value={reason} onChange={handleReasonChange} placeholder="Enter reason" required type="text" name="reason" id="reason" className="form-control" />
              <label htmlFor="reason">Reason</label>
            </div>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AppointmentsForm;
