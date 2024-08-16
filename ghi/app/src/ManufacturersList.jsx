function ManufacturersList(props) {
    return (
		<>
		<h1>Manufacturers</h1>
			<table className="table table-striped">
				<thead>
					<tr>
						<th>Name</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{props.manufacturers.map(manufacturer => {
						return (
						<tr key={manufacturer.href}>
							<td>{ manufacturer.name }</td>
							<td>
                                <button onClick={() => deleteCustomers(customers.id)} className='btn btn-outline-danger'>Delete</button>
                            </td>
						</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
}
export default ManufacturersList;
