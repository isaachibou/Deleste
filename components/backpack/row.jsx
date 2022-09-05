import classes from './table.module.css';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { useState, useEffect, useRef } from 'react'
import Divider from '@mui/material/Divider';

function equipRow({}) {

	const [typeOption, setTypeOption] = useState("backpack");

	const options = [
	  {
	    label: "Backpack",
	    value: "backpack",
	  },
	  {
	    label: "Sleeping Bag",
	    value: "sleepingBag",
	  },
	  {
	    label: "Sleeping Pad",
	    value: "sleepingPad",
	  }
	];

	 															
	 
 
	return(	
	  	<li className="flex flex-row flex-end space-x-1 text-center ">
	    	<select name="types" id="itemTypes" className="basis-1/6 bg-transparent hover:bg-pata-500" value={typeOption}>
	            {options.map((option) => (
	              <option value={option.value}>{option.label}</option>
	            ))}
				</select>
	      <select name="items" id="itemsFetched" className="basis-3/6 bg-transparent hover:bg-pata-500" value={item.Model}>
	             
		  </select>
	      <input className="min-w-0 basis-1/6 bg-transparent text-right placeholder:text-pata-400 hover:bg-pata-500"  type="text" placeholder="1" />
	      <input name="weight" value={item["Weight (Metric)"]} className="min-w-0 basis-1/6 bg-transparent text-right placeholder:text-pata-400 hover:bg-pata-500"  type="text" placeholder="1"/> 
	      <input name="color" value={item["Color"]} className="min-w-0 basis-1/6 bg-transparent text-right placeholder:text-pata-400 hover:bg-pata-500"  type="text" placeholder="Black"/>
	    </li>
	)
}	

export default equipRow;

 