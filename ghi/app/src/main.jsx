import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

async function loadData() {
	try {
		const [manufacturersResponse, modelsResponse, autosResponse] = await Promise.all([
			fetch('http://localhost:8100/api/manufacturers/'),
			fetch('http://localhost:8100/api/models/'),
			fetch('http://localhost:8100/api/automobiles/')
		]);

		if (manufacturersResponse.ok && modelsResponse.ok && autosResponse.ok) {
			const manufacturersData = await manufacturersResponse.json();
			const modelsData = await modelsResponse.json();
			const autosData = await autosResponse.json();

			ReactDOM.createRoot(document.getElementById('root')).render(
				<React.StrictMode>
					<App manufacturers={manufacturersData.manufacturers} models={modelsData.models} autos={autosData.autos} />
				</React.StrictMode>
			);
		} else {
			console.error('Failed to load data', { manufacturersResponse, modelsResponse, autosResponse });
		}
	} catch (error) {
		console.error('An error occurred while loading data:', error);
	}
}

loadData();
