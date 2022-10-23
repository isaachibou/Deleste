import { useState, useEffect, useRef } from 'react'


function EquipTable({ }) {

	const [data, setData] = useState([]);

	useEffect(() => {
		(async () => {
			const matos = await fetch('/api/matos_2?type=sleepingmat', {headers: {'Content-Type': 'application/json'},method: 'GET'})
			var response = await matos.json();
			setData(response)
			console.log(response)
		})()
	}, [])


	return(
		 <div className="App"></div>
	)
}	

export default EquipTable;

 