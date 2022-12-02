import clientPromise from "../utils/mongodb"
import Link from 'next/link';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import * as React from 'react'
import { getSession } from 'next-auth/react'

import { useState, useEffect, useRef } from 'react'
import { getData, getAllModels } from './api/matos_2'

import SEO from '../components/SEO';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import Landscape from '../components/landscape/landscape'
import Header from '../components/header/Header'
import SearchBar from "../components/landing-page/searchbar"
import ItemsTable from "../components/landing-page/items-table"
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

export default function Index(props) {
  const [tableData, setTableData] = useState([]);
  const [display, setDisplay] = useState("hidden");
  const [title, setTitle] = useState("What will you pack first ? ");
  const [shareUrl, setShareUrl] = useState(null)
  const [bpName, setBpName] = useState();
 
  useEffect(async () => {     
    console.log("tableData: updated ", tableData)
    if(tableData.length != 0) {
      setDisplay("")
      setTitle("OK ! What next ?")
    } else { 
      setDisplay("hidden")
      setTitle("What will you pack first ?")
    }
  },[tableData])

  const getUserId = async () => {
    console.log("loading userid")
    const session = await getSession();
    if(session) return session.user.id;
  }

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
    //    alert(`You have upsertedId ${matos.Model}`)

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

  return (
    <Landscape>
    
      <SEO title={props.globalData.name} description={props.globalData.blogTitle} />
      <Header name={props.globalData.blogTitle} title={props.globalData.blogSubtitle} shareUrl={shareUrl}/>

      <main className="flex flex-col grid-col-2 gap-x-2">
        <div className="mt-8 mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="scale-x-[-1] inline align-baseline feather feather-feather" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#28384f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"  ><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
          <h2 className="text-4xl md:text-4xl text-pata-400 inline-block ml-1 mb-2 text-left">{title}</h2>
          <SearchBar items={props.equips} tableData={tableData} setTableData={setTableData} />
        </div>
        <div className={`mx-auto col-span-2 my-12 max-w-fit ${display}`}>
          <div className="flex flex-row mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="scale-x-[-1] inline-flex align-baseline feather feather-feather" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#28384f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"  ><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
            <input name="EquipmentName" className="min-w-max ml-1 whitespace-nowrap w-52 text-left text-pata-400 text-xl bg-transparent  placeholder:text-pata-400" value={bpName} onChange={((e) => setBpName(e.target.value))} type="text" placeholder="Your equipment name here ..."/>
          </div>
          <ItemsTable tableData={tableData} setTableData={setTableData} itemModels={props.itemModels}/>
        </div>
    {/*     <Link href={{
          pathname: '/backpack',
          query: JSON.stringify(tableData)
        }}>
            <button className={`mx-auto col-span-2 max-w-fit ${display}`} onClick={handleSubmit}> Keep Going ! </button>
        </Link>*/}
        <button className={`mx-auto col-span-2 max-w-fit ${display}`} onClick={handleSubmit}> Keep Going ! </button>
        {/* this is Short circuit */}
        
      </main>
    </Landscape>
  );
}

export async function getServerSideProps(context) {
  const globalData = getGlobalData();
  const client = await clientPromise;
  const equips = await getData()
  
  const itemModels = new Object();
  itemModels.pillow = await getAllModels("pillow");
  itemModels.sleepingbag = await getAllModels("sleepingbag");
  itemModels.sleepingmat = await getAllModels("sleepingmat");
  itemModels.custom = await getAllModels("sleepingmat");


  return {
    props: {
      globalData,
      equips: JSON.parse(JSON.stringify(equips)),
      itemModels: JSON.parse(JSON.stringify(itemModels))
    },
  };
}
