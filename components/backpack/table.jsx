import classes from './table.module.css';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { useState, useEffect, useRef } from 'react'
import Divider from '@mui/material/Divider';



function EquipTable({data}) {

	const [typeOption, setTypeOption] = useState("backpack");
	const [tableData, setTableData] = useState(data);

	return(
		<div>
			<div className="flex flex-row mt-16">
	            <svg xmlns="http://www.w3.org/2000/svg" className="scale-x-[-1] inline-flex align-baseline feather feather-feather" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#28384f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  ><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
	            <input name="EquipmentName" className="min-w-max ml-1 whitespace-nowrap w-52 text-left text-pata-400 text-xl bg-transparent  placeholder:text-pata-400 "  type="text" placeholder="My Equipment1"/>
	        </div>
	        <Divider />
			<ul className="space-y-1">
	        	<li className="flex flex-row flex-end divide-x-1 divide-y-1 ">
					<span className="basis-1/6 text-left">Type</span>
					<span className="basis-3/6 text-center">Item</span>
		        	<span className="basis-1/6 text-right">Qty</span>
		        	<span className="basis-1/6 text-right">Weight</span>
		        	<span className="basis-1/6 text-right">Color</span>
	        	</li>
	          	
	          		 
		           {tableData && (tableData.map((equip) => (
		          	<li className="flex flex-row flex-end space-x-1 text-center ">
		              <select name="types" id="itemTypes" className="basis-1/6 bg-transparent hover:bg-pata-500" value={equip.type}>
		                <option value="backpack" >Backpack</option>
		                <option value="pad">Pad</option>
		                <option value="bag">Bag</option>
		                <option value="stove">Stove</option>
		              </select>
		              <select name="items" id="itemsFetched" className="basis-3/6 bg-transparent hover:bg-pata-500" />
		              <input className="min-w-0 basis-1/6 bg-transparent text-right placeholder:text-pata-400 hover:bg-pata-500"  type="text" placeholder="1" />
		              <input name="weight" className="min-w-0 basis-1/6 bg-transparent text-right placeholder:text-pata-400 hover:bg-pata-500"  type="text" placeholder="1"/> 
		              <input name="color" className="min-w-0 basis-1/6 bg-transparent text-right placeholder:text-pata-400 hover:bg-pata-500"  type="text" placeholder="Black"/>
		            </li>
		          	)))
		      	  }	
		      	  <Divider />
		      	  <AddOutlinedIcon style={{ color: "#28384f" }} className="hover:cursor-pointer hover:bg-pata-500" onClick={() => setTableData([...tableData,{}])	} />
		      	  <RemoveOutlinedIcon style={{ color: "#28384f" }} className="hover:cursor-pointer hover:bg-pata-500" onClick={() => setTableData(tableData.slice(0,-1))	} />
	       	</ul>
	       </div>
	)
}	

export default EquipTable;

