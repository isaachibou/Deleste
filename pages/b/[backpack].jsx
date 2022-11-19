import * as React from 'react'
import clientPromise from "../../utils/mongodb";
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import { useState, useEffect, useRef } from 'react'
import { getBackpackById } from '../api/backpacks'
import { getAllModels, getMatosByID }  from '../api/matos_2'
import { getGlobalData } from '../../utils/global-data';
import SEO from '../../components/SEO'
import MenuDrawer from '../../components/menu/PerstDrawer'
import BackpackList from "../../components/backpack/list"
import ReactTablev7 from '../../components/backpack/ReactTableV7/reacttablev7'
import DropdownCell from '../../components/backpack/ReactTableV7/dropdowncell'
import EditableCell from '../../components/backpack/ReactTableV7/editablecell'
import ImageCell from '../../components/backpack/ReactTableV7/imagecell'
import classes from '../../components/backpack/table.module.css'
import Landscape from '../../components/landscape/landscape'
import Header from '../../components/Header'
import Divider from '@mui/material/Divider';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image' 

export default function Backpack(props)	{
  const [bpName, setBpName] = useState(props.backpack[0].name);
  const [tableData, setTableData] = useState(props.initialTableData)
  const [totalWeight, setTotalWeight] = useState(0);
  const [display, setDisplay] = useState("hidden");
  const [shareUrl, setShareUrl] = useState(null)



  /*console.log("Selected backpack", props.backpack[0])
  console.log("Initial matos", props.initialTableData)
  console.log("instanciate", tableData)*/


  const typeOptions = [
    {label: "Backpack",value: "backpack",},
    {label: "Bag",value: "sleepingbag",},
    {label: "Pad",value: "sleepingmat",},
    {label: "Pillows",value: "pillow",},
    {label: "Custom",value: "custom",}  
  ];  
  
  const entry = {
    "Size": "",
    "Type": "",
    "Brand": "",
    "Model": "",
    "Image": "",
    "ManufacturerURL": "",
    "SKU": "",
    "Color": "",
    "R-Value": "",
    "Weight (Standard)": "",
    "Weight (Metric)": "",
    "Width (Standard)": "",
    "Width (Metric)": "",
    "Length (Standard)": "",
    "Length (Metric)": "",
    "Height (Standard)": "",
    "Height (Metric)": "",
    "Thickness (Standard)": "",
    "Thickness (Metric)": "",
    "Packed dimension (Standard)": "",
    "Packed dimension (Metric)": "",
    "Top fabric type": "",
    "Bottom fabric type": "",
    "What's Included": "",
  }

  useEffect(async () => {     
    console.log("tableData updated", ...tableData)
    computeTotalWeight()
  },[tableData])

  const computeTotalWeight = () => {
     let w = 0 
    for(let item of tableData) {
      var p =  parseFloat(item["Weight (Metric)"])*parseInt(item.quantity) 
      w+=p     
    }
    console.log("totalWeight ", totalWeight)
    setTotalWeight(w)
  }

  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
      console.log("updateMyData !")
      setTableData(old =>
        old.map((row, index) => {
          if (index === rowIndex) {
            if(columnId == "Model") {
              if(props.itemModels[row.Type]) {
                  var item = props.itemModels[row.Type].find(item => item.Model === value);
                  if(item) {
                    Object.assign(row,item)
                  }
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

  const getUserId = async () => {
    console.log("loading userid")
    const session = await getSession();
    if(session) return session.user.id;
  }

  const handleSubmit = async () => {
    let equipName=bpName

    var backpackObject = {
      owner: await getUserId (),
      name: equipName,
      items: {
      } 
    };

    var items=[]
    for(let item of tableData) {
      if(item.Type == "custom") {
        console.log("ITEM CUSTOM ", item)
        var matos = Object.assign(entry,item)
        
        // let mongodb handle _id
        console.log("id", matos._id)
        if(matos._id == '') {
          console.log("delete id")
          delete matos._id;
          console.log("matos", matos)
        }

        const JSONdata = JSON.stringify(matos)
        const response = await fetch('/api/matos_2', {
          body: JSONdata,
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })

        const result = await response.json()
        alert(`You have upsertedId ${matos.Model}`)

        console.log(matos)

        console.log("upsertedId id :", result.success)
        if(result.success) {
          if(result.success.upsertedId) {
            item._id = result.success.upsertedId
          }
        }  

          Object.assign(matos,item)
        console.log("avant depush" ,item)
        

      }

      items.push({ 
        type: item.Type,
        _id: item._id,
        quantity: item.quantity
      })
    }

  backpackObject.items = [...items]
  
  const JSONdata = JSON.stringify(backpackObject)
  const response = await fetch('/api/backpacks', {
    body: JSONdata,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })

 // embeddd
 //  const r = await client.db(dbName).collection(collName).findOneAndUpdate(objFilter, { $push: { ts: getDateStandardWithSeconds(), ...objToUpdateOrInsert } }, { upsert: true, returnOriginal: false });

  const result = await response.json()
  alert(`You have updated ${equipName}`)
  console.log('upsert', JSONdata)

  // Share Url of new backpack
  console.log("upserted id :", result)
  if(result.success.upsertedId) { setShareUrl(result.success.upsertedId) }
  

  // UseEffect on Set BpSelected will rerender bpList and fetch its matos
} 

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
          Header: 'Size',
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
    <Landscape>
      <SEO title={props.globalData.name} description={props.globalData.blogTitle} /> 
      <Header name={props.globalData.blogTitle} title={props.globalData.blogSubtitle}/>

        <main  className="flex flex-col max-w-4xl w-full mx-auto ">      
      
        <div className="{classes.container} max-w-fit p-2 md:first:rounded-t-lg lg:last:rounded-b-lg backdrop-blur-lg bg-pata-100/0 hover:bg-gray/30 transition border border-pata-500 dark:border-white border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0">
            <div className="flex flex-row">
              <svg xmlns="http://www.w3.org/2000/svg" className="scale-x-[-1] inline-flex align-baseline feather feather-feather" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#28384f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"  ><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
              <input name="EquipmentName" className=" font-bold min-w-max ml-1 whitespace-nowrap w-52 text-left text-pata-400 text-xl bg-transparent  placeholder:text-pata-400" value={bpName} onChange={((e) => setBpName(e.target.value))} type="text" placeholder="Your equipment name here ..."/>
            </div>
            <Divider />
            <ReactTablev7 
              columns={columns} 
              data={tableData} 
              updateMyData={updateMyData} 
            />
            <Divider />
            <AddOutlinedIcon style={{ color: "#28384f" }} className="hover:cursor-pointer hover:bg-pata-500" onClick={() => setTableData([...tableData,{ _id: "", Image:"", Model: "", Size: "", Color: "", "": "", type: "custom", quantity: "1" }])} />
            <RemoveOutlinedIcon style={{ color: "#28384f" }} className="hover:cursor-pointer hover:bg-pata-500" onClick={() => setTableData(tableData.slice(0,-1))  } />
            <SaveOutlinedIcon style={{ color: "#28384f" }} className="hover:cursor-pointer hover:bg-pata-500 ml-5" onClick={handleSubmit} />
        </div>
        <div className="mt-8 flex flex-row"> 
          <span className="basis-3/6 text-right"></span>
          <div className="p-2 border-pata-500 border-b-2 text-pata-500 text-2xl font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 scale-x-[-1] inline-flex align-top feather feather-feather" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#d3a38f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
            <span className="">{totalWeight<10000?totalWeight+" g":totalWeight/1000+" kg"} </span>
          </div>
        </div>    
        <button className={`mx-auto col-span-2 max-w-fit ${display}`} onClick={handleSubmit}> Keep Going ! </button>
        {/* this is Short circuit */}
        { shareUrl &&
        <Link
          as={`/b/${shareUrl}`}
          href={`/b/[backpack]`}
        > 
          <a>
            < ShareOutlinedIcon style={{ color: "#28384f" }} className="hover:cursor-pointer hover:bg-pata-500" />
            <span className="text-center text-pata-400"> Share: <span className="text-pata-500">{shareUrl}</span> </span>
          </a>         
        </Link>}
      </main>
    </Landscape>
  );
}

export async function getServerSideProps(context) {
  const globalData = getGlobalData();

  const session = await getSession(context);
  
  const client = await clientPromise;
  let bpid = context.resolvedUrl.split("/").pop()
  const backpack = await getBackpackById(bpid)
  
  console.log("--backpack", backpack[0])
  let initialTableData=[]
  for (const [key, value] of Object.entries(backpack[0].items)) {
    console.log("fetching "+value._id+" of matos " + key)
    var matos = await getMatosByID(value._id)
    
    if(matos) {
      console.log("BEN ALOOORS", matos)
      matos["Type"] = value.type;
      matos["quantity"]=value.quantity
      initialTableData.push(matos);   
    }
  }

/*  console.log("sending this as initial", initialTableData)
*/
  const itemModels = new Object();
  itemModels.pillow = await getAllModels("pillow");
  itemModels.sleepingbag = await getAllModels("sleepingbag");
  itemModels.sleepingmat = await getAllModels("sleepingmat");
  itemModels.custom = await getAllModels("custom");
  
  return {
    props: {
      globalData,
      backpack: JSON.parse(JSON.stringify(backpack)),
      itemModels: JSON.parse(JSON.stringify(itemModels)),
      initialTableData: JSON.parse(JSON.stringify(initialTableData))
    },
  };

}
