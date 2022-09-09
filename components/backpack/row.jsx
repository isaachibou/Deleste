import classes from './table.module.css';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { useState, useEffect, useRef } from 'react'
import Divider from '@mui/material/Divider';

function equipRow({row,index, models, tableData, setTableData}) {

	const [typeOption, setTypeOption] = useState(row.type);
	const [modelOption, setModelOption] = useState(row._id)
	const [modelOptions, setModelOptions] = useState(models[typeOption])
	const [qty, setQty] = useState(row.quantity)

/*	console.log(row)*/
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
/*		console.log("row updated")
*/		setTypeOption(row.type)
		setModelOption(row._id)
	},[row])

	useEffect(async() => {
		console.log("use effect modelOption");
		if(models[typeOption]) {
			var item = models[typeOption].find(item => item._id === modelOption);
			Object.assign(row,item)
		} else { console.log("no models available for this item type")}
	},[modelOption])

	useEffect(async() => {
		console.log("use effect qty");
		if(models[typeOption]) {
			var item = models[typeOption].find(item => item._id === modelOption);
			item.quantity = qty;
			Object.assign(row,item)
			console.log(item)
		} else { console.log("no models available for this item type")}
	},[qty])


	useEffect(async() => {
		console.log("use effect  typeOption")

		// Displays the correct list of options upon change of item type
		setModelOptions(models[typeOption])
		setModelOption(models[typeOption][0]._id)
		
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
	      <input className="min-w-0 basis-1/6 bg-transparent text-right placeholder:text-pata-400 hover:bg-pata-500"  type="text" placeholder="1" value={qty} onChange={(event) => (setQty(event.target.value))}/>
	      <input name="weight" value={qty*parseFloat(row["Weight (Metric)"])} className="min-w-0 basis-1/6 bg-transparent text-right placeholder:text-pata-400 hover:bg-pata-500"  type="text" placeholder="1"/> 
	      <input name="color" value={row["Color"]} className="min-w-0 basis-1/6 bg-transparent text-right placeholder:text-pata-400 hover:bg-pata-500"  type="text" placeholder="Black"/>
	    </li>
	)
}	

export default equipRow;

 