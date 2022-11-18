import * as React from 'react'
import { useState, useEffect, useRef } from 'react'

import Divider from '@mui/material/Divider';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

import ReactTablev7 from '../../components/backpack/ReactTableV7/reacttablev7'
import EditableCell from '../../components/backpack/ReactTableV7/editablecell'
import DropdownCell from '../../components/backpack/ReactTableV7/dropdowncell'
import ImageCell from '../../components/backpack/ReactTableV7/imagecell'

import Image from "next/image";

import { ReactSearchAutocomplete } from 'react-search-autocomplete'

export default function ItemsTable(props) {
	const [bpName, setBpName] = useState("Your equipment name here ...");
	console.log("Re render Items table with", props.tableData)
	// console.log("Models ", props.itemModels)

	const updateMyData = (rowIndex, columnId, value) => {
		// We also turn on the flag to not reset the page
		console.log("updateMyData ! ", columnId, value)
	  props.setTableData(old =>
		old.map((row, index) => {
			if (index === rowIndex) {
				if(columnId == "Model") {
					if(props.itemModels[row.Type]) {
					    var item = props.itemModels[row.Type].find(item => item.Model === value);
					    Object.assign(row,item)
					} else { console.log("no models available for this item type")}
				}
				if(columnId == "Image") {
					console.log("DEBUG IMAGE", rowIndex, columnId, value)
					let newRow={}
					newRow.Image = value
					
					// Manage here to update the state ....

				}
				if(columnId == "Type") {
					if(props.itemModels[row.Type]) {
						var item = props.itemModels[value][0]
						Object.assign(row,item)
					} else { console.log("no models available for this item type")}
				}
				var teub = {
					...old[rowIndex],
					[columnId]: value,
				} 
				console.log("BILAN", teub)
				return {
					...old[rowIndex],
					[columnId]: value,
				}
			}
				return row
			})
		)
	}

	const typeOptions = [
		{label: "Backpack",value: "backpack",},
		{label: "Bag",value: "sleepingbag",},
		{label: "Pad",value: "sleepingmat",},
		{label: "Pillows",value: "pillow",},
		{label: "Custom",value: "custom",}  
	];

  const columns = React.useMemo(
      () => [
      	{
          Header: 'Image',
          accessor: 'Image',
          Cell: ({value, row, column}) => <ImageCell height={60} width={60}  value={value} matosUrl={row.original.ManufacturerURL} options={typeOptions} row={row} column={column} updateMyData={updateMyData}/>

        },
        {
          Header: 'Type',
          accessor: 'Type',
          Cell: ({value, row,column}) => <DropdownCell value={value} options={typeOptions} row={row} column={column} updateMyData={updateMyData}/>
        },
        {
          Header: 'Model',
          accessor: 'Model',
	        Cell: ({value, row,column}) => row.original.Type == "custom" ? <EditableCell value={value} size="max-w-[220px]" row={row} column={column} updateMyData={updateMyData}/> : <DropdownCell value={value} size="max-w-[300px]" options={props.itemModels[row.original.Type]} row={row} column={column} updateMyData={updateMyData}/>
        },	
        {
          Header: 'Size',
          accessor: 'ManufacturerURL',
          show: false,
	        Cell: ({value, row,column}) => <span>{value}</span>
        },
        {
          Header: 'Link',
          accessor: 'Size',
          show: false,
	        Cell: ({value, row,column}) => <span>{value}</span>
        },
        {
          Header: 'Qty',
          accessor: 'quantity',
          Cell: ({value, row,column}) => <EditableCell value={value} size="max-w-[40px]" type="number" row={row} column={column} updateMyData={updateMyData}/>
        },
        {
          Header: 'Weight (g)',
          accessor: 'Weight (Metric)',
          Cell: ({value, row,column}) => {
          	if(row.original.Type != "custom") {
          	  let weight= parseInt(row.original.quantity)*parseFloat(value)
	            return weight?weight:0
          	}
          	else {
          		return <EditableCell value={value} size="max-w-[50px]" row={row} column={column} updateMyData={updateMyData}/>
          	}
          }
        }
      ],
      []
    )

return (
 	<div className="{classes.container}  p-2 md:first:rounded-t-lg lg:last:rounded-b-lg backdrop-blur-lg bg-pata-100/0 hover:bg-gray/30 transition border border-pata-500 dark:border-white border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0">		 
	    <ReactTablev7 
	    	columns={columns} 
	    	data={props.tableData} 
	    	updateMyData={updateMyData} 
	    />
	    <Divider />
	    <AddOutlinedIcon style={{ color: "#28384f" }} className="hover:cursor-pointer hover:bg-pata-500" onClick={() => props.setTableData([...props.tableData,{ _id: "", Image: "", Model: "", Size: "custom", Color: "", Type: "custom", quantity: "1" }])} />
	    <RemoveOutlinedIcon style={{ color: "#28384f" }} className="hover:cursor-pointer hover:bg-pata-500" onClick={() => props.setTableData(props.tableData.slice(0,-1))  } />
{/*	    <SaveOutlinedIcon style={{ color: "#28384f" }} className="hover:cursor-pointer hover:bg-pata-500 ml-5" onClick={handleSubmit} />
*/}	</div>
 );
}	