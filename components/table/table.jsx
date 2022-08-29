import classes from './table.module.css';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useState, useEffect, useRef } from 'react'


function EquipTable({data}) {

	const [typeOption, setTypeOption] = useState("backpack");
	const [tableData, setTableData] = useState([
		{ type: "backpack" },
		{ type: "pad"},
		{ type: "bag"}
	]);
	
	console.log("initial data")
	console.log(data);  

	return(	
		<ul className="mt-4 space-y-1">
        	<li className="flex flex-row flex-end divide-x-1 divide-y-1">
				<span className="basis-1/6">Type</span>
				<span className="basis-3/6">Item</span>
	        	<span className="basis-1/6">Qté</span>
	        	<span className="basis-1/6">Poids</span>
	        	<span className="basis-1/6">Couleur</span>
        	</li>
          	
          		 
	           {tableData && (tableData.map((equip) => (
	          	<li className="flex flex-row flex-end text-right space-x-1">
	              <select name="types" id="itemTypes" className="basis-1/6 bg-transparent" value={equip.type}>
	                <option value="backpack" >Backpack</option>
	                <option value="pad">Pad</option>
	                <option value="bag">Bag</option>
	                <option value="stove">Stove</option>
	              </select>
	              <select name="items" id="itemsFetched" className="basis-3/6 bg-transparent" />
	              <input className="min-w-0 basis-1/6 bg-transparent text-right placeholder:text-pata-400"  type="text" placeholder="1" />
	              <input name="weight" className="min-w-0 basis-1/6 bg-transparent text-right placeholder:text-pata-400"  type="text" placeholder="1"/> 
	              <input name="color" className="min-w-0 basis-1/6 bg-transparent text-right placeholder:text-pata-400"  type="text" placeholder="Black"/>
	            </li>
	          	)))
	      	  }	
	      	  <AddOutlinedIcon className="" onClick={() => setTableData([...tableData,{}])	} />
       	</ul>
	)
}	

export default EquipTable;
