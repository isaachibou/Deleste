import clientPromise from "../utils/mongodb";
import { getSession } from 'next-auth/react';
import { getCsrfToken } from "next-auth/react"


import { useState, useEffect, useRef } from 'react'

import Link from 'next/link';
import Image from 'next/image'

import Footer from '../components/Footer';
import Header from '../components/Header';
import Landscape from '../components/landscape/landscape'

import { getGlobalData } from '../utils/global-data';
import { getBackpacks} from './api/backpacks';
import { getAllModels} from './api/matos_2';

import SEO from '../components/SEO';
import EquipTable from "../components/backpack/ZakiTable/table";
import BackpackList from "../components/backpack/ZakiTable/list";

import Divider from '@mui/material/Divider';


export default function Equips({  globalData, currentUser, equips, initTableData, backpacks, itemModels }) {
  
  const [bpSelected, setBpSelected] = useState("");
  const [bpList, setBpList] = useState(backpacks);
  const [bpName, setBpName] = useState("Your equipment name here ...");
  const [tableData, setTableData] = useState(initTableData);

  const emptyTableData = [
    { 
        Type: "backpack",
        Model: "",
        quantity: "1"
    },
    { 
        Type: "sleepingbag",
        Model: "",
        quantity: "1"
    },
    {
        Type: "sleepingmat",
        Model: "",
        quantity: "1"
    }
  ];

  console.log("BpSelected ", bpSelected)

  /* Only run effect when bpSelected changes otherwise we have a infinite loop */
  useEffect(async () => {     
    fetchBackpackMatos()  
  },[bpSelected])

  useEffect(async () => {     
    console.log("tableData update !", ...tableData)
  },[tableData])

  const getUserId = async () => {
    const session = await getSession();
    return session.user.id;
  }
 
  const debug = () => {
    console.log(Debug)
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
    var bptodisplay = backpacks.find(backpack => {return backpack._id === bpSelected})
    console.log("bptodisplay ", bptodisplay)
    if (bptodisplay) {
      let tempdata=[]
      for (const [key, value] of Object.entries(bptodisplay.items)) {
        var responsematos = await fetch('/api/matos_2?usecase=fillTable&id='+value._id, {headers: {'Content-Type': 'application/json'},method: 'GET'})
        var matos = await responsematos.json();
        matos["Type"] = key;
        tempdata.push(matos);      
      }
      var target = Object.assign(tableData,tempdata)
      console.log("fetch backpack items: " ,target)
      setTableData(tempdata)  // And not target because it would not trigger any useeffect
    } else {
      setTableData(emptyTableData)
    }
  }  

  const handleSubmit = async () => {
    var rows = document.querySelectorAll("li")
    var nameselector = document.querySelector("input[name='EquipmentName']");
    let equipName = nameselector.value; 
      
    var backpackObject = {
      owner: await getUserId (),
      name: equipName,
      items: {
      } 
    };

    for(let item of tableData) {
      backpackObject.items[item.Type] = {};
      backpackObject.items[item.Type]._id = item._id
      backpackObject.items[item.Type].quantity = item.quantity
    }

    const JSONdata = JSON.stringify(backpackObject)

    const response = await fetch('/api/backpacks', {
      body: JSONdata,
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const result = await response.json()
    alert(`You have updated ${equipName}`)
    console.log('upsert', JSONdata)

    // Refresh backpack list
    fetchBackpackList()
    console.log("upserted id :", result.success.upsertedId)
    setBpSelected(result.success.upsertedId)
  }
    

  return (
    <Landscape>
        <SEO title={globalData.name} description={globalData.blogTitle} />
        <main  className="flex flex-col max-w-4xl w-full mx-auto ">
          <h1 className="text-center text-pata-400 text-3xl lg:text-5xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 scale-x-[-1] inline-flex align-baseline feather feather-feather" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#28384f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"  ><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
            Build your backpack
          </h1>
          <BackpackList data={bpList} setData={setBpList} state={bpSelected} setState={setBpSelected} bpName={bpName} setBpName={setBpName} refresh={fetchBackpackList}/>
          <EquipTable tableData={tableData} setTableData={setTableData} models={itemModels} bpName={bpName} setBpName={setBpName}/>
          <button className="my-5 mx-auto rounded-full bg-cyan-100 w-1/5 border-2 border-black" type="submit" onClick={handleSubmit}>Submit</button>
          <button className="my-5 mx-auto rounded-full bg-cyan-100 w-1/5 border-2 border-black" type="submit" onClick={debug}>Debug</button>          
        </main>
    </Landscape>
  );
}


export async function getServerSideProps(context) {
  const globalData = getGlobalData();
  const client = await clientPromise;

  const equips = [];

  const initTableData=[
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
  ];

  const session = await getSession(context);
  let currentUser=null;
  if (session) {  currentUser = session.user.id };console.log("feef",session)
  const backpacks = session ? await getBackpacks(currentUser): []

  const itemModels = new Object();
  itemModels.pillow = await getAllModels("pillow");
  itemModels.sleepingbag = await getAllModels("sleepingbag");
  itemModels.sleepingmat = await getAllModels("sleepingmat");
  console.log("sleeping baaags",itemModels)

  return {
    props: {
      globalData,
      currentUser,
      equips,
      initTableData: JSON.parse(JSON.stringify(initTableData)),
      backpacks: JSON.parse(JSON.stringify(backpacks)),
      itemModels: JSON.parse(JSON.stringify(itemModels))
    },
  };
}