import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ManufacturersList from './ManufacturersList';
import ManufacturersForm from './ManufacturersForm';
import VehicleModelsList from './VehicleModelsList';
import VehicleModelsForm from './VehicleModelsForm';
import AutomobilesList from './AutomobilesList';
import AutomobilesForm from './AutomobilesForm';
import TechniciansList from './TechniciansList';
import TechniciansForm from './TechniciansForm';
import AppointmentsForm from './AppointmentsForm';

function App(props) {
	if (props.manufacturers === undefined && props.models === undefined && props.autos === undefined && props.technicians === undefined && props.appointments === undefined) {
		return null;
	}
	return (
		<BrowserRouter>
			<Nav />
			<div className="container">
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/manufacturers/" element={<ManufacturersList manufacturers={props.manufacturers} />} />
					<Route path="/manufacturers/create/" element={<ManufacturersForm />} />
					<Route path="/models" element={<VehicleModelsList models={props.models} />} />
					<Route path="/models/create" element={<VehicleModelsForm />} />
					<Route path="/automobiles/" element={<AutomobilesList autos={props.autos} />} />
					<Route path="/automobiles/create/" element={<AutomobilesForm />} />
					<Route path="/technicians/" element={<TechniciansList technicians={props.technicians} />} />
					<Route path="/technicians/create/" element={<TechniciansForm />} />
					<Route path="/appointments/create/" element={<AppointmentsForm />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
