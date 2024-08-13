import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ManufacturersList from './ManufacturersList';
import ManufacturersForm from './ManufacturersForm';
import VehicleModelsList from './VehicleModelsList';
import VehicleModelsForm from './VehicleModelsForm';
import AutomobilesList from './AutomobilesList';
import AutomobilesForm from './AutomobilesForm';

function App(props) {
	if (props.manufacturers === undefined && props.models === undefined && props.autos === undefined) {
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
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
