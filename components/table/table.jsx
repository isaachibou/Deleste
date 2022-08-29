import classes from './table.module.css';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { useState, useEffect, useRef } from 'react'


function EquipTable({data}) {
	
	const [typeOption, setTypeOption] = useState("backpack");
	const [tableData, setTableData] = useState(data);
	console.log(tableData)

	return(	
		<ul className="mt-4 space-y-1">
        	<li className="flex flex-row flex-end divide-x-1 divide-y-1 ">
				<span className="basis-1/6 text-left">Type</span>
				<span className="basis-3/6 text-center">Item</span>
	        	<span className="basis-1/6 text-right">Qty</span>
	        	<span className="basis-1/6 text-right">Weight</span>
	        	<span className="basis-1/6 text-right">Color</span>
        	</li>
          	
          		 
	           {tableData && (tableData.map((equip) => (
	          	<li className="flex flex-row flex-end space-x-1 text-center">
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
	      	  <AddOutlinedIcon className="hover:cursor-pointer" onClick={() => setTableData([...tableData,{}])	} />
	      	  <RemoveOutlinedIcon className="hover:cursor-pointer" onClick={() => setTableData(tableData.slice(0,-1))	} />
       	</ul>
	)
}	

export default EquipTable;

