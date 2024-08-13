import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ManufacturersList from './ManufacturersList';
import ManufacturersForm from './ManufacturersForm';
import AutomobilesList from './AutomobilesList';

function App(props) {
	if (props.manufacturers === undefined && props.autos === undefined) {
		return null;
	}
	return (
		<BrowserRouter>
			<Nav />
			<div className="container">
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/manufacturers" element={<ManufacturersList manufacturers={props.manufacturers} />} />
					<Route path="/manufacturers/create/" element={<ManufacturersForm />} />
					<Route path="/automobiles/" element={<AutomobilesList autos={props.autos} />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
