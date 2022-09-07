import classes from './table.module.css';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { useState, useEffect, useRef } from 'react'
import Divider from '@mui/material/Divider';

function equipRow({row,index, models, tableData, setTableData}) {

	const [typeOption, setTypeOption] = useState(row.type);
	const [modelOption, setModelOption] = useState(row._id)
	const [modelOptions, setModelOptions] = useState(models[typeOption])

	const options = [
	  {
	    label: "Backpack",
	    value: "backpack",
	  },
	  {
	    label: "Bag",
	    value: "sleepingBag",
	  },
	  {
	    label: "Pad",
	    value: "sleepingPad",
	  },
	  {
	    label: "None",
	    value: "None",
	  }
	];

	useEffect(async() => {
		console.log("use effect modelOption");
		if(models[typeOption]) {
			var item = models[typeOption].find(item => item._id === modelOption);
			Object.assign(row,item)
		} else { console.log("no models available for this item type")}
		console.log("update", ...tableData)
	},[modelOption])

	useEffect(async() => {
		console.log("use effect  typeOption")

		// Displays the correct list of options upon change of item type
		setModelOptions(models[typeOption])
		console.log(models[typeOption][0]	)
		setModelOption(models[typeOption][0]._id)
		console.log(modelOption)

	},[typeOption])	

	function handleChange(event) {
		console.log("its a change ! ", event.target.value)
    	setTypeOption(event.target.value);
  	}
	/*onChange={(event) =>  setTypeOption(event.target.value)}>*/	
	return(	
		<li className="flex flex-row flex-end space-x-1 text-center ">
	    	<select name="types" id="rowTypes" className="basis-1/6 bg-transparent hover:bg-pata-500" value={typeOption} onChange={handleChange}>
	            {options.map((option) => (
	              <option value={option.value}>{option.label}</option>
	            ))}
			</select>
	      	<select name="rows" id="rowsFetched" className="basis-3/6 bg-transparent hover:bg-pata-500" value={modelOption} onChange={(event) => (setModelOption(event.target.value))}>
	      		{modelOptions?.map((option) => (
					<option value={option._id}>{option.Model} - {option.Size}</option>
				))}
		  </select>
	      <input className="min-w-0 basis-1/6 bg-transparent text-right placeholder:text-pata-400 hover:bg-pata-500"  type="text" placeholder="1" />
	      <input name="weight" value={row["Weight (Metric)"]} className="min-w-0 basis-1/6 bg-transparent text-right placeholder:text-pata-400 hover:bg-pata-500"  type="text" placeholder="1"/> 
	      <input name="color" value={row["Color"]} className="min-w-0 basis-1/6 bg-transparent text-right placeholder:text-pata-400 hover:bg-pata-500"  type="text" placeholder="Black"/>
	    </li>
	)
}	

export default equipRow;

 