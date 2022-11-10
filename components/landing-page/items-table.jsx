import * as React from 'react'
import { useState, useEffect, useRef } from 'react'

import Divider from '@mui/material/Divider';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

import ReactTablev7 from '../../components/backpack/ReactTableV7/reacttablev7'
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
	    row: { index, original },
	    column: { id },
	    display,
	    updateMyData,
	    }) => {
		      // We need to keep and update the state of the cell normally
		      const [value, setValue] = React.useState(initialValue)
		      const onChange = e => {
		        setValue(e.target.value)
		      }

		      

		      React.useEffect(() => {
		      	console.log("updating ", index, id , value)
		        updateMyData(index, id, value)
		      },[value])

		      // If the initialValue is changed external, sync it up with our state
		      React.useLayoutEffect(() => {
		      	console.log("resetting to" , initialValue)
		        setValue(initialValue)
		      }, [initialValue])

	      return (
	        <select className="min-w-full basis-1/6 bg-transparent hover:bg-pata-500" value={value} onChange={onChange}>
	          {options?.map((option) => (
	              <option key={props.index} value={option.value}>{option.label?option.label:option.Model+" - "+original.Size}</option>
	          ))}
	        </select>
	      )

    		}
  
  const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData, // This is a custom function that we supplied to our table instance
    size
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

      return <input className= {`${size} block bg-transparent hover:bg-pata-500 cursor-pointer`} value={value} onChange={onChange} onBlur={onBlur} />
    }

  const ImageCell = ({
    value: initialValue,
    row: { index, original },
    column: { id },
    updateMyData, // This is a custom function that we supplied to our table instance
    }) => {
      // We need to keep and update the state of the cell normally
      const [value, setValue] = React.useState(initialValue)
     // const [imageLoaded, setImageLoaed] = React.useState(initialValue)

      const onChange = e => {
      	console.log(e.target.value)
		  	setValue(String(e.target.value))
		  }

			React.useEffect(() => {
        console.log("re render after load iamge")
      }, [value])
      // If the initialValue is changed external, sync it up with our state
      React.useEffect(() => {
        setValue(initialValue)
      }, [initialValue])

/*      if(value || original.Type != "custom") {
*/				return <Image className="min-w-fit mx-auto rounded-lg border-2 border-pata-500"
		      src={value}
		      alt="Picture of the matos"
		      width={60}
		      height={60}
		    />    
	  	/*} else {
	  		return <input type="file" multiple accept="public/images/*" onChange={onChange} />
	  	}*/
	}

    

    const columns = React.useMemo(
      () => [
      	{
          Header: 'Image',
          accessor: 'Image',
          Cell: ({value, row, column}) => <ImageCell value={value} options={typeOptions} row={row} column={column} updateMyData={updateMyData}/>

        },
        {
          Header: 'Type',
          accessor: 'Type',
          Cell: ({value, row,column}) => <DropdownCell value={value} options={typeOptions} row={row} column={column} updateMyData={updateMyData}/>
        },
        {
          Header: 'Model',
          accessor: 'Model',
	        Cell: ({value, row,column}) => row.original.Type == "custom" ? <EditableCell value={value} size="max-w-[300px]" row={row} column={column} updateMyData={updateMyData}/> : <DropdownCell value={value} options={props.itemModels[row.original.Type]} row={row} column={column} updateMyData={updateMyData}/>
        },	
         {
          Header: 'Size',
          accessor: 'Size',
          show: false,
	        Cell: ({value, row,column}) => <span>{value}</span>
        },
        {
          Header: 'Qty',
          accessor: 'quantity',
          Cell: ({value, row,column}) => <EditableCell value={value} size="max-w-[30px]" row={row} column={column} updateMyData={updateMyData}/>
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
          		return <EditableCell value={value} size={50} row={row} column={column} updateMyData={updateMyData}/>
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
	    	bpName={bpName} 
	    	setBpName={setBpName} />
	    <Divider />
	    <AddOutlinedIcon style={{ color: "#28384f" }} className="hover:cursor-pointer hover:bg-pata-500" onClick={() => props.setTableData([...props.tableData,{ _id: "", Image: "", Model: "", Size: "custom", Color: "", "": "", Type: "custom", quantity: "1" }])} />
	    <RemoveOutlinedIcon style={{ color: "#28384f" }} className="hover:cursor-pointer hover:bg-pata-500" onClick={() => props.setTableData(props.tableData.slice(0,-1))  } />
{/*	    <SaveOutlinedIcon style={{ color: "#28384f" }} className="hover:cursor-pointer hover:bg-pata-500 ml-5" onClick={handleSubmit} />
*/}	</div>
 );
}	