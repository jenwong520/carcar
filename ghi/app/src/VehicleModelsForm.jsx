// import React, { useEffect, useState } from 'react';

// function VehicleModelsForm() {
//     const [locations, setLocations] = useState([]);
//     const [styleName, setStyleName] = useState('');
//     const [fabric, setFabric] = useState('');
//     const [color, setColor] = useState('');
//     const [pictureUrl, setPictureUrl] = useState('');
//     const [location, setLocation] = useState('');


//     const handleStyleNameChange = (event) => {
//         const value = event.target.value;
//         setStyleName(value);
//     }

//     const handleFabricChange = (event) => {
//         const value = event.target.value;
//         setFabric(value);
//     }

//     const handleColorChange = (event) => {
//         const value = event.target.value;
//         setColor(value);
//     }

//     const handlePictureUrlChange = (event) => {
//         const value = event.target.value;
//         setPictureUrl(value);
//     }

//     const handleLocationChange = (event) => {
//         const value = event.target.value;
//         setLocation(value);
//     }
//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         const data = {
//             style_name: styleName,
//             fabric,
//             color,
//             picture_url: pictureUrl,
//             location,
//         };
//         console.log("submitting data", data)

//         const hatsUrl = 'http://localhost:8090/api/hats/';
//         const fetchConfig = {
//             method: "post",
//             body: JSON.stringify(data),
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         };

//         try {
//             const response = await fetch(hatsUrl, fetchConfig);
//             if (response.ok) {
//                 const newHat = await response.json();
//                 console.log("created", newHat);
//                 resetForm()

//             } else {
//                 const errorData = await response.json();
//                 console.error(errorData)
//             }
//         } catch (error) {
//             console.error('Fetch error:', error);
//         }
//     };

// const resetForm = () => {
//     setStyleName('');
//     setFabric('');
//     setColor('');
//     setPictureUrl('');
//     setLocation('');
// }

//     const fetchData = async () => {
//         const url = 'http://localhost:8100/api/locations/';
//         const response = await fetch(url);
//         if (response.ok) {
//             const data = await response.json();
//             setLocations(data.locations);
//         }
//     }

//     useEffect(() => {
//         fetchData();
//     }, []);

//         return (
//             <div className="row">
//           <div className="offset-3 col-6">
//             <div className="shadow p-4 mt-4">
//               <h1>Create A New Hat</h1>
//               <form onSubmit = {handleSubmit} id="create-hat-form">
//                 <div className="form-floating mb-3">
//                   <input value={styleName} onChange={handleStyleNameChange} placeholder="Style Name" required type="text" name="style_name" id="style_name" className="form-control"/>
//                   <label htmlFor="style_name">Style Name</label>
//                 </div>
//                 <div className="form-floating mb-3">
//                   <input value={fabric} onChange={handleFabricChange} placeholder="Fabric" required type="text" name="fabric" id="fabric" className="form-control"/>
//                   <label htmlFor="fabric">Fabric</label>
//                 </div>
//                 <div className="form-floating mb-3">
//                   <input value={color} onChange={handleColorChange} placeholder="Color" required type="text" name="color" id="color" className="form-control"/>
//                   <label htmlFor="color">Color</label>
//                 </div>
//                 <div className="form-floating mb-3">
//                   <input value={pictureUrl} onChange={handlePictureUrlChange}placeholder="Picture" required type="text" name="picture_url" id="picture_url" className="form-control"/>
//                   <label htmlFor="picture_url">Picture Url</label>
//                 </div>
//                 <div className="mb-3">
//                   <select value={location} onChange={handleLocationChange} required name="location" id="location" className="form-select">
//                     <option value="">Choose A Location</option>
//                     {locations.map(location => {
//                         return (
//                             <option key={location.href} value={location.href}>
//                                 {location.closet_name} - Section {location.section_number}, Shelf {location.shelf_number}
//                             </option>
//                         );
//                     })}
//                   </select>
//                 </div>
//                 <button className="btn btn-primary">Create</button>
//               </form>
//             </div>
//           </div>
//         </div>
//       );
//     };

//       export default HatsForm;
