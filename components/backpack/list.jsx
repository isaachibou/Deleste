import { useState, useEffect, useRef } from 'react'
import Divider from '@mui/material/Divider';

function BackpackList({data, state, setState, bpName, setBpName }) {
	return(
		<div className="mt-10">
			<p className="whitespace-nowrap text-left text-pata-400 text-xl bg-transparent   ">
		        <svg xmlns="http://www.w3.org/2000/svg" className="scale-x-[-1] mr-1 inline-flex align-top feather feather-feather" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#28384f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  ><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
	            My Backpacks
	        </p>
	        <Divider />
	        <ul className="px-10 py-3 list-disc">
	        { data && (data.map((backpack) => (
	        	<li className="hover:cursor-pointer hover:bg-pata-500 max-w-min whitespace-nowrap" onClick={() => {setState(backpack._id); setBpName(backpack.name)}}>{backpack.name}</li>
	        )))}
	       	</ul>
        </div>
	)
}

export default BackpackList;