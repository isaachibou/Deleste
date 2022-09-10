import clientPromise from "../utils/mongodb";

import { useState, useEffect, useRef } from 'react'
import { getSession } from "next-auth/react"

import Link from 'next/link';
import Image from 'next/image'

import Footer from '../components/Footer';
import Header from '../components/Header';
import Landscape from '../components/landscape/landscape'

import { getGlobalData } from '../utils/global-data';
import { getBackpacks} from './api/backpacks';
import { getAllModels} from './api/matos_2';

import SEO from '../components/SEO';
import EquipTable from "../components/backpack/table";
import BackpackList from "../components/backpack/list";

import Divider from '@mui/material/Divider';


export default function Equips({  globalData, currentUser, equips, initTableData, backpacks, itemModels }) {
  
  const [bpSelected, setBpSelected] = useState("");
  const [bpList, setBpList] = useState(backpacks);
  const [bpName, setBpName] = useState("Your equipment name");
  const [tableData, setTableData] = useState(initTableData);


  console.log("BpSelected ", bpSelected)

  /* Only run effect when bpSelected changes otherwise we have a infinite loop */
  useEffect(async () => {     
    fetchBackpackMatos()  
  },[bpSelected])

  useEffect(async () => {     
    console.log("tableData update !"/*, ...tableData*/)
  },[tableData])

  const getUserId = async () => {
    const session = await getSession();
    return session.additionnalUserInfos._id;
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
    if (bptodisplay) {
      let tempdata=[]
      for (const [key, value] of Object.entries(bptodisplay.items)) {
          if(key == "sleepingBag") {
            var responsebag= await fetch('/api/matos_2?usecase=fillTable&collection=SleepingBags&id='+value._id, {headers: {'Content-Type': 'application/json'},method: 'GET'})
            var bag = await responsebag.json();
            bag["type"] = key;  
            tempdata.push(bag);
        }

        if(key == "sleepingPad") {
          var responsepad = await fetch('/api/matos_2?usecase=fillTable&collection=SleepingPads&id='+value._id, {headers: {'Content-Type': 'application/json'},method: 'GET'})
          var pad = await responsepad.json();
          pad["type"] = key;
          tempdata.push(pad);
        }           
      }
      var target = Object.assign(tableData,tempdata)
      setTableData(tempdata)  
    }
  }  

  const handleSubmit = async () => {
    var rows = document.querySelectorAll("li")
    var nameselector = document.querySelector("input[name='EquipmentName']");
    let equipName = nameselector.value; 
    console.debug(equipName)

    var responsepad = await fetch('/api/oneitem?type=pad&model=Matelas NeoAir® XLite™', {headers: {'Content-Type': 'application/json'},method: 'GET'})
    var responsebag= await fetch('/api/oneitem?type=bag&model=Sac de couchage Parsec™ 20F/-6C', {headers: {'Content-Type': 'application/json'},method: 'GET'})
    
    var pad = await responsepad.json()
    var bag = await responsebag.json()
    
    var backpackObject = {
      owner: await getUserId(),
      name: equipName,
      items: {
      } 
    };

    for(let item of tableData) {
      backpackObject.items[item.type] = {};
      backpackObject.items[item.type]._id = item._id
      backpackObject.items[item.type].quantity = item.quantity
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
  }
    

  return (
    <Landscape>
        <SEO title={globalData.name} description={globalData.blogTitle} />
        <main  className="flex flex-col max-w-4xl w-full mx-auto ">
          <h1 className="text-center text-pata-400 text-3xl lg:text-5xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 scale-x-[-1] inline-flex align-baseline feather feather-feather" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#28384f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  ><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
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
        type: "sleepingPad",
        quantity: "1"
    },
    {
        _id: "62bc46091baf30a4a46d8732",
        Model: "Couverture Juno™",
        Size: "No size",
        Color: "Warp Speed Print, Fun Guy Print, Deep Pacific, Tidepool Print",
        "Weight (Metric)": "0.38 kg",
        type: "sleepingBag",
        quantity: "1"
    }
  ];

  const session = await getSession(context);
  let currentUser=null;
  if (session) {  currentUser = session.user.id };console.log("feef",session)
  const backpacks = session ? await getBackpacks(currentUser): []

  const itemModels = new Object();
  itemModels.sleepingBag = await getAllModels("SleepingBags");
  itemModels.sleepingPad = await getAllModels("SleepingPads");

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