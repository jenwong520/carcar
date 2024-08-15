import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

async function loadData() {
	try {
		const [manufacturersResponse, modelsResponse, autosResponse, salespeopleResponse] = await Promise.all([
			fetch('http://localhost:8100/api/manufacturers/'),
			fetch('http://localhost:8100/api/models/'),
			fetch('http://localhost:8100/api/automobiles/'),
			fetch('http://localhost:8090/api/salespeople/'),
		]);

		if (manufacturersResponse.ok && modelsResponse.ok && autosResponse.ok && salespeopleResponse) {
			const manufacturersData = await manufacturersResponse.json();
			const modelsData = await modelsResponse.json();
			const autosData = await autosResponse.json();
			const salespeopleData = await salespeopleResponse.json();

			ReactDOM.createRoot(document.getElementById('root')).render(
				<React.StrictMode>
					<App
						manufacturers={manufacturersData.manufacturers}
						models={modelsData.models}
						autos={autosData.autos}
						salespeople={salespeopleData.salespeople}
					/>
				</React.StrictMode>
			);
		} else {
			console.error('Failed to load data', { manufacturersResponse, modelsResponse, autosResponse, salespeopleResponse });
		}
	} catch (error) {
		console.error('An error occurred while loading data:', error);
	}
}

loadData();
