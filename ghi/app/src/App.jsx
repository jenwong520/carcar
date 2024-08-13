import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import VehicleModelsList from './VehicleModelsList';
// import VehicleModelsForm from './VehicleModelsForm';

function App(props) {
	if (props.models === undefined) {
		return null;
	}
	return (
		<BrowserRouter>
			<Nav />
			<div className="container">
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/models" element={<VehicleModelsList models={props.models} />} />
					{/* <Route path="/models/create" element={<VehicleModelsForm />} /> */}
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
