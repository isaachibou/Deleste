import { useState, useEffect, useRef } from 'react'
import Divider from '@mui/material/Divider';
import classes from './table.module.css';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';


function BackpackList({data, setData, state, setState, bpName, setBpName, refresh }) {

	const deleteBackpack = async (id) => {
		console.log("delete", id)
	    const response = await fetch('/api/backpacks?&_id='+id, {headers: {'Content-Type': 'application/json'},method: 'DELETE'})
	    const result = await response.json()
    	
    	alert(`You have deleted ${id}`)
    	console.log('delete', result)
    	refresh()
    	setState("")
    	return result
	}

   
	return(
		<div className="mt-10">
			<p className="whitespace-nowrap text-left text-pata-400 text-xl bg-transparent   ">
		        <svg xmlns="http://www.w3.org/2000/svg" className="scale-x-[-1] mr-1 inline-flex align-top feather feather-feather" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#28384f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"  ><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
	            My Backpacks
	        </p>
	        <Divider />
	        <ul className="px-10 py-3 ">	
	        { data && (data.map((backpack) => (
	        	<li key={backpack._id} className= {`hover:cursor-pointer  max-w-min whitespace-nowrap ${backpack._id == state? classes.active : "teub "}`}
	        	 onClick={() => {setState(backpack._id); setBpName(backpack.name)}}>	        	      	  		
	        		<RemoveOutlinedIcon style={{ color: "#28384f" }} className="hover:cursor-pointer" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) deleteBackpack(backpack._id) }}  /*onClick={() => deleteBackpack(backpack._id)} *//>
					<span className="hover:bg-pata-500 px-2 " >{backpack.name}</span>
				</li>
	        )))}
	        	<li className= {`hover:cursor-pointer  max-w-min whitespace-nowrap ${ state == "" ? classes.active : "teub "}`}
	        	 onClick={() => {setState(''); setBpName("")}}>	       	      	  		
	        		<AddOutlinedIcon style={{ color: "#28384f"}} className="hover:cursor-pointer"  /*onClick={() => setState("")}*/ />
					<span className="hover:bg-pata-500 px-2" >New Backpack</span>
				</li>	
	       	</ul>
        </div>
	)
}

export default BackpackList;