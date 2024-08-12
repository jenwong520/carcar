function ManufacturersList(props) {
	// const [manufacturers, setManufacturers] = useState([]);

	// const fetchManufacturers = async () => {
	// 	const url = 'http://localhost:8100/api/manufacturers/';
	// 	const response = await fetch(url);
	// 	if (response.ok) {
	// 		const data = await response.json();
	// 		setManufacturers(data.manufacturers);
	// 	}
	// };

    // const deleteShoes = async (shoesId) => {
    //     const url = `http://localhost:8080/api/shoes/${shoesId}/`;
    //     const response = await fetch(url, { method: "DELETE" });
    //     if (response.ok) {
    //         setShoes(shoes.filter(shoes => shoes.id !== shoesId));
    //     }
    // };

	// useEffect(() => {
	// 	fetchShoes();
	// }, []);

    return (
		<>
			<table className="table table-striped">
				<thead>
					<tr>
						<th>Name</th>
					</tr>
				</thead>
				<tbody>
					{props.manufacturers.map(manufacturer => {
						return (
						<tr key={manufacturer.href}>
							<td>{ manufacturer.name }</td>
						</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
}

export default ManufacturersList;
