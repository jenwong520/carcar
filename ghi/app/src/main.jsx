import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

// async function loadData() {
// 	try {
// 	  const [manufacturersResponse] = await Promise.all([
// 		fetch('http://localhost:8100/api/manufacturers/')
// 	  ]);

// 	  if(manufacturersResponse.ok) {
// 		const manufacturersData = await manufacturersResponse.json();


// 		ReactDOM.createRoot(document.getElementById('root')).render(
// 		  <React.StrictMode>
// 				   <App manufacturers={manufacturersData.manufacturers} />
// 				 </React.StrictMode>
// 		);
// 	  } else {
// 		console.error('Failed to load data', { manufacturersResponse });
// 	  }
// 	}
// }

// loadData()

async function loadManufacturers() {
    const response = await fetch('http://localhost:8100/api/manufacturers/');
    if (response.ok) {
        const data = await response.json();
		ReactDOM.createRoot(document.getElementById("root")).render(
			<React.StrictMode>
			  <App manufacturers={data.manufacturers} />
			</React.StrictMode>
		  );
      } else {
        console.error(response);
      }
    }
  loadManufacturers();
