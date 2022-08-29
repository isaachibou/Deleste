import clientPromise from "../utils/mongodb";

import { useState, useEffect, useRef } from 'react'
import { getSession } from "next-auth/react"

import Link from 'next/link';
import Image from 'next/image'

import Footer from '../components/Footer';
import Header from '../components/Header';
import Landscape from '../components/landscape/landscape'

import { getGlobalData } from '../utils/global-data';
import { getBackpacks } from './api/backpacks';

import SEO from '../components/SEO';
import EquipTable from "../components/backpack/table";
import BackpackList from "../components/backpack/list";

import Divider from '@mui/material/Divider';


export default function Equips({  globalData, equips, tableData, backpacks }) {
  
  const [bpSelected, setBpSelected] = useState("");
  console.log("BpSelected ", bpSelected)

  useEffect(async () => {     
    fetchBackpackMatos()
  })

  const getUserId = async () => {
    const session = await getSession();
    return session.additionnalUserInfos._id;
  }
  
  const debug = () => {
    console.log(Debug)

  }

  const fetchBackpackMatos = async () => {  
    /*backpacks contains all bp from the logged in user
    bpSelected is the id of the backpack I clicked on in the list */

    var bptodisplay = backpacks.find(backpack => {return backpack._id === bpSelected})
    if (bptodisplay) {
      const tempdata=[]
      for(const item in bptodisplay.items) {
        switch(item) {
          case 'spleepingBag': 
            tempdata.push()
            break;
          case 'spleepingPad':
          tempdata.push()
            break;
        }
      }
    }
  }  

  const handleSubmit = async () => {
    // TODO: its hardcoded right now !
    console.log("submit backpack new way");
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
      name: "Backpack N°1",
      items: {
        spleepingPad: pad._id,  
        spleepingBad: bag._id
      } 
    };

    const JSONdata = JSON.stringify(backpackObject)
    console.log(JSONdata)

    const response = await fetch('/api/backpacks', {
      body: JSONdata,
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const result = await response.json()
    alert(`You have updated ${equipName}`)
    console.log("result ", result)
  }
    

  return (
    <Landscape>
        <SEO title={globalData.name} description={globalData.blogTitle} />
        <main  className="flex flex-col max-w-4xl w-full mx-auto ">
          <h1 className="text-center text-pata-400 text-3xl lg:text-5xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 scale-x-[-1] inline-flex align-baseline feather feather-feather" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#28384f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  ><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
            Build your backpack
          </h1>
          <BackpackList data={backpacks} state={bpSelected} setState={setBpSelected}/>
          <EquipTable data={tableData} state={bpSelected} setState={setBpSelected}/>
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
  const tableData=[
    { type: "backpack"},
    { type: "pad"},
    { type: "bag"}
  ];

  const session = await getSession(context);
  const backpacks = await getBackpacks(session.additionnalUserInfos._id);
  console.log("SERVER BP", backpacks)

  return {
    props: {
      globalData,
      equips,
      tableData,
      backpacks: JSON.parse(JSON.stringify(backpacks))
    },
  };
}