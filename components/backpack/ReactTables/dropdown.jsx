import * as React from 'react'
import { useState, useEffect, useRef } from 'react'

function DropdownCell(props) {
	const [option, setOption] = useState(props.data);

	function handleChange(event) {
		console.log("its a change ! ", event.target.value)
    	setOption(event.target.value);
  	}

	return (
		 
		<select id="props.id" className="min-w-full basis-1/6 bg-transparent hover:bg-pata-500" value={option} onChange={handleChange}>
        	{props.options?.map((option) => (
          		<option key={props.index} value={option.value}>{option[props.display]}</option>
        	))}
     	</select>
     	 
	)
}


export default DropdownCell;
