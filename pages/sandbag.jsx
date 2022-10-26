import * as React from 'react'
import clientPromise from "../utils/mongodb"
import { getSession } from 'next-auth/react'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from "next/image"
import { getGlobalData } from '../utils/global-data'
import { getBackpacks} from './api/backpacks'
import { getData, getAllModels } from './api/matos_2'
import SEO from '../components/SEO'
import MenuDrawer from '../components/menu/PerstDrawer'
import BackpackList from "../components/backpack/ZakiTable/list";

import ReactTablev8 from '../components/backpack/ReactTableV8/reacttablev8'
import ReactTablev7 from '../components/backpack/ReactTableV7/reacttablev7'
import classes from '../components/backpack/table.module.css'
import Landscape from '../components/landscape/landscape'
import Header from '../components/Header'


export default function Equips(props/*{ globalData, data, backpacks, itemModels }*/) {

  const [bpSelected, setBpSelected] = useState("");
  const [bpList, setBpList] = useState(props.backpacks);
  const [bpName, setBpName] = useState("Your equipment name here ...");
  const [tableData, setTableData] = useState([
    { 
        _id: "62bc45991baf30a4a46d86e5",
        Model: "Matelas NeoAir® XLite™",
        Size: "Regular",
        Color: "Lemon Curry",
        "Weight (Metric)": "0.36 kg",
        Type: "sleepingmat",
        quantity: "1"
    },
    {
        _id: "62bc46091baf30a4a46d8732",
        Model: "Couverture Juno™",
        Size: "No size",
        Color: "Warp Speed Print, Fun Guy Print, Deep Pacific, Tidepool Print",
        "Weight (Metric)": "0.38 kg",
        Type: "sleepingbag",
        quantity: "1"
    }
  ]);

  useEffect(async () => {     
    fetchBackpackMatos()  
  },[bpSelected])

  useEffect(async () => {     
    console.log("tableData updated", ...tableData) 
  },[tableData])

  const getUserId = async () => {
    const session = await getSession();
    return session.user.id;
  }

  const fetchBackpackList = async () => {
    console.log("fetch bp list")
    /*[TRY INSTEAD]
    const sessions = await getSession({ req })*/
    const bps = await fetch('/api/backpacks?&owner='+currentUser, {headers: {'Content-Type': 'application/json'},method: 'GET'})
    var response = await bps.json();
    console.log("refresh bp list with", response)
    setBpList(response)
  }

  /* backpacks contains all bp from the logged in user
   * bpSelected is the id of the backpack I clicked 
   * on in the list */  
  const fetchBackpackMatos = async () => {  
    var bptodisplay = props.backpacks.find(backpack => {return backpack._id === bpSelected})
    console.log("bptodisplay ", bptodisplay)
    if (bptodisplay) {
      let tempdata=[]
      for (const [key, value] of Object.entries(bptodisplay.items)) {
        var responsematos = await fetch('/api/matos_2?usecase=fillTable&id='+value._id, {headers: {'Content-Type': 'application/json'},method: 'GET'})
        var matos = await responsematos.json();
        matos["Type"] = key;
        matos["quantity"]=value.quantity
        tempdata.push(matos);      
      }
      var target = Object.assign(tableData,tempdata)
      console.log("fetch backpack items: " ,target)
      setTableData(tempdata)  // And not target because it would not trigger any useeffect
    } else {
      //setTableData()
    }
    console.log("fetched table data is ", tableData)
  } 

  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    console.log(tableData)
        setTableData(old =>
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
          Cell: ({value, row,column}) => <DropdownCell value={value} options={props.itemModels[row.original.Type]} row={row} column={column} updateMyData={updateMyData}/>
        },
        {
          Header: 'Qty',
          accessor: 'quantity',
          Cell: ({value, row,column}) => <EditableCell value={value} row={row} column={column} updateMyData={updateMyData}/>
        },
        {
          Header: 'Weight (g)',
          accessor: 'Weight (Metric)',

        },
        {
          Header: 'Color',
          accessor: 'Color',
        }
      ],
      []
    )
  
  return (
    <Landscape>
    
      <SEO title={props.globalData.name} description={props.globalData.blogTitle} /> 
      <main  className="flex flex-col max-w-4xl w-full mx-auto ">
        <h1 className="text-center text-pata-400 text-3xl lg:text-5xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 scale-x-[-1] inline-flex align-baseline feather feather-feather" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#28384f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"  ><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
          Build your backpack
        </h1>

        <div className="{classes.container} px-10 py-5 mb-5 md:first:rounded-t-lg lg:last:rounded-b-lg backdrop-blur-lg bg-pata-100/30 hover:bg-gray/30 transition border border-pata-500 dark:border-white border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0">
          <BackpackList data={bpList} setData={setBpList} state={bpSelected} setState={setBpSelected} bpName={bpName} setBpName={setBpName} refresh={fetchBackpackList}/>
        </div>

        <div className="{classes.container} px-10 py-5 md:first:rounded-t-lg lg:last:rounded-b-lg backdrop-blur-lg bg-pata-100/30 hover:bg-gray/30 transition border border-pata-500 dark:border-white border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0">
          <ReactTablev7 columns={columns} data={tableData} updateMyData={updateMyData} />
        </div>*
        

        {/*
        // V8 beta too soon<div className="{classes.container} px-10 py-5 md:first:rounded-t-lg lg:last:rounded-b-lg backdrop-blur-lg bg-pata-100/30 hover:bg-gray/30 transition border border-pata-500 dark:border-white border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0">
          <ReactTablev8 parentData={tableData} models={props.itemModels} bpName={bpName} setBpName={setBpName}/>
        </div>*/}
         
        
        
      </main>
    </Landscape>
  );
}

export async function getServerSideProps(context) {
  const globalData = getGlobalData();
  const client = await clientPromise;

  const data = await getData("sleepingmat")

  const session = await getSession(context);
  let currentUser=null;
  if (session) {  currentUser = session.user.id };
  const backpacks = session ? await getBackpacks(currentUser): []

  const itemModels = new Object();
  itemModels.pillow = await getAllModels("pillow");
  itemModels.sleepingbag = await getAllModels("sleepingbag");
  itemModels.sleepingmat = await getAllModels("sleepingmat");
  
  return {
    props: {
      globalData,
      data: JSON.parse(JSON.stringify(data)),
      backpacks: JSON.parse(JSON.stringify(backpacks)),
      itemModels: JSON.parse(JSON.stringify(itemModels))

    },
  };

}
