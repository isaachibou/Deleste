import * as React from 'react'
import { useState, useEffect, useRef } from 'react'

function DropdownTypeCell(props) {
	const [option, setOption] = useState(props.data);

	function handleChange(event) {
		console.log("its a change ! "+ event.target.value + " on row " + props.index)
    	setOption(event.target.value);
    	
  	}

  	useEffect(async () => {     
   		var tempTableData = props.tableData
    	tempTableData[props.index].Type = option
    	props.setTableData(tempTableData)
    	console.log("Table updated from dropdown Types !")
  	},[option])

	return (
		<select id="types" className="min-w-full basis-1/6 bg-transparent hover:bg-pata-500" value={option} onChange={handleChange}>
        	{props.options?.map((option) => (
          		<option key={props.index} value={option.value}>{option.label}</option>
        	))}
     	</select>
     	 
	)
}


export default DropdownTypeCell;
