import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ManufacturersList from './ManufacturersList';
import ManufacturersForm from './ManufacturersForm';
import VehicleModelsList from './VehicleModelsList';
import VehicleModelsForm from './VehicleModelsForm';
import AutomobilesList from './AutomobilesList';
import AutomobilesForm from './AutomobilesForm';
import SalespeopleList from './SalespeopleList';
import SalespersonForm from './SalespersonForm';
import CustomersList from './CustomersList';
import CustomerForm from './CustomerForm';
import SalesList from './SalesList';
import SaleForm from './SaleForm';
import SalespersonHistory from './SalespersonHistory';

function App(props) {
	if (
		props.manufacturers === undefined &&
		props.models === undefined &&
		props.autos === undefined &&
		props.salespeople === undefined &&
		props.customers === undefined &&
		props.sales === undefined
	) {
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
					<Route path="/salespeople/" element={<SalespeopleList salespeople={props.salespeople} />} />
					<Route path="/salespeople/create/" element={<SalespersonForm />} />
					<Route path="/customers/" element={<CustomersList customers={props.customers} />} />
					<Route path="/customers/create/" element={<CustomerForm />} />
					<Route path="/sales/" element={<SalesList sales={props.sales} />} />
					<Route path="/sales/create/" element={<SaleForm />} />
					<Route path="/sales/history/" element={<SalespersonHistory sales={props.sales} />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
