import clientPromise from "../utils/mongodb"
import Link from 'next/link';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import * as React from 'react'


import { useState, useEffect, useRef } from 'react'
import { getData, getAllModels } from './api/matos_2'

import SEO from '../components/SEO';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import Landscape from '../components/landscape/landscape'
import Header from '../components/Header'
import SearchBar from "../components/landing-page/searchbar"
import ItemsTable from "../components/landing-page/items-table"


export default function Index(props) {
  const [tableData, setTableData] = useState([]);

 useEffect(async () => {     
    console.log("tableData: updated ", tableData)
  },[tableData])

  return (
    <Landscape>
    
      <SEO title={props.globalData.name} description={props.globalData.blogTitle} />
      <Header name={props.globalData.blogTitle} title={props.globalData.blogSubtitle}/>

      <main className="flex flex-row">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="scale-x-[-1] inline align-baseline feather feather-feather" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#28384f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"  ><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
          <h2 className="text-2xl md:text-2xl text-pata-400 inline-block ml-1 mb-2 text-left">What will you pack first ? </h2>
          <SearchBar items={props.equips} tableData={tableData} setTableData={setTableData} />
        </div>
        <ItemsTable   tableData={tableData} setTableData={setTableData} itemModels={props.itemModels}/>
     
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

  return {
    props: {
      globalData,
      equips: JSON.parse(JSON.stringify(equips)),
      itemModels: JSON.parse(JSON.stringify(itemModels))
    },
  };
}
