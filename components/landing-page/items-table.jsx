import * as React from 'react'
import { useState, useEffect, useRef } from 'react'

import Divider from '@mui/material/Divider';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

import ReactTablev7 from '../../components/backpack/ReactTableV7/reacttablev7'

import { ReactSearchAutocomplete } from 'react-search-autocomplete'

export default function ItemsTable(props) {
	const [bpName, setBpName] = useState("Your equipment name here ...");
	console.log("ItemsTable !", props.tableData)
	// console.log("Models ", props.itemModels)

	const updateMyData = (rowIndex, columnId, value) => {
		// We also turn on the flag to not reset the page
		console.log("updateMyData !")
	    props.setTableData(old =>
		old.map((row, index) => {
			if (index === rowIndex) {
				if(columnId == "Model") {
					if(props.itemModels[row.Type]) {
					    var item = props.itemModels[row.Type].find(item => item._id === value);
					    Object.assign(row,item)
					} else { console.log("no models available for this item type")}
				}
				if(columnId == "Type") {
					console.log("value")
					if(props.itemModels[row.Type]) {
						var item = props.itemModels[value][0]
						Object.assign(row,item)
					} else { console.log("no models available for this item type")}
				}

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

  	const DropdownCell = ({
	    value: initialValue,
	    options: options,
	    row: { index },
	    column: { id },
	    display,
	    updateMyData,
	    }) => {
		      // We need to keep and update the state of the cell normally
		      const [value, setValue] = React.useState(initialValue)

		      const onChange = e => {
		        console.log("onChange from dropdowncell ", value)
		        setValue(e.target.value)
		      }

		      React.useEffect(() => {
		        updateMyData(index, id, value)
		      },[value])

		      // If the initialValue is changed external, sync it up with our state
		      React.useLayoutEffect(() => {
		        setValue(initialValue)
		      }, [initialValue])

	      return (
	        <select className="min-w-full basis-1/6 bg-transparent hover:bg-pata-500" value={value} onChange={onChange}>
	          {options?.map((option) => (
	              <option key={props.index} value={option._id?option._id:option.value}>{option.label?option.label:option.Model}</option>
	          ))}
	        </select>
	      )

    		}
  
  const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData, // This is a custom function that we supplied to our table instance
    }) => {
      // We need to keep and update the state of the cell normally
      const [value, setValue] = React.useState(initialValue)

      const onChange = e => {
        setValue(e.target.value)
      }

      // We'll only update the external data when the input is blurred
      const onBlur = () => {
        updateMyData(index, id, value)
      }		

      // If the initialValue is changed external, sync it up with our state
      React.useEffect(() => {
        setValue(initialValue)
      }, [initialValue])

      return <input className="max-w-[50px] block bg-transparent hover:bg-pata-500 cursor-pointer" value={value} onChange={onChange} onBlur={onBlur} />
    }

    

    const columns = React.useMemo(
      () => [
        {
          Header: 'Type',
          accessor: 'Type',
          Cell: ({value, row,column}) => <DropdownCell value={value} options={typeOptions} row={row} column={column} updateMyData={updateMyData}/>

        },
        {
          Header: 'Model',
          accessor: 'Model',
/*          Cell: ({value, row,column}) => <DropdownCell value={value} options={props.itemModels[row.original.Type]} row={row} column={column} updateMyData={updateMyData}/>
*/          Cell: ({value, row,column}) => <span>{value}</span>,
		},
        {
          Header: 'Qty',
          accessor: 'quantity',
          Cell: ({value, row,column}) => <EditableCell value={value} row={row} column={column} updateMyData={updateMyData}/>
        },
        {
          Header: 'Weight (g)',
          accessor: 'Weight (Metric)',
          Cell: ({value, row,column}) => {
            let weight= parseInt(row.original.quantity)*parseFloat(value)*1000
            return weight?weight:0
          }
        },
        {
          Header: 'Color',
          accessor: 'Color',
        }
      ],
      []
    )

return (
 	<div className="{classes.container} p-2 md:first:rounded-t-lg lg:last:rounded-b-lg backdrop-blur-lg bg-pata-100/0 hover:bg-gray/30 transition border border-pata-500 dark:border-white border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0">
	    <div className="flex flex-row">
	      <svg xmlns="http://www.w3.org/2000/svg" className="scale-x-[-1] inline-flex align-baseline feather feather-feather" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#28384f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"  ><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
	    </div>
	    <Divider />
	    <ReactTablev7 
	    	columns={columns} 
	    	data={props.tableData} 
	    	updateMyData={updateMyData} 
	    	bpName={bpName} 
	    	setBpName={setBpName} />
	    <Divider />
	    <AddOutlinedIcon style={{ color: "#28384f" }} className="hover:cursor-pointer hover:bg-pata-500" onClick={() => props.setTableData([...props.tableData,{ _id: "", Model: "", Size: "", Color: "", "": "", type: "custom", quantity: "1" }])} />
	    <RemoveOutlinedIcon style={{ color: "#28384f" }} className="hover:cursor-pointer hover:bg-pata-500" onClick={() => props.setTableData(props.tableData.slice(0,-1))  } />
{/*	    <SaveOutlinedIcon style={{ color: "#28384f" }} className="hover:cursor-pointer hover:bg-pata-500 ml-5" onClick={handleSubmit} />
*/}	</div>
 );
}	