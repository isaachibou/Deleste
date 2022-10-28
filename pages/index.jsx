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

      <main className="">
        <h2 className="text-3xl md:text-3xl text-pata-400">What will you pack first ? </h2>
        <SearchBar items={props.equips} tableData={tableData} setTableData={setTableData} />
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
