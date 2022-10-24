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
import BackpackListReact from '../components/backpack/ReactTables/backpacklist'
import BackpackList from "../components/backpack/ZakiTable/list";

import TanStackTable from '../components/backpack/ReactTables/reacttable'
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

  return (
    <Landscape>
    
      <SEO title={props.globalData.name} description={props.globalData.blogTitle} /> 
{/*      <Header name={globalData.blogTitle} title={globalData.blogSubtitle}/>
*/}
      <main  className="flex flex-col max-w-4xl w-full mx-auto ">

        <h1 className="text-center text-pata-400 text-3xl lg:text-5xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 scale-x-[-1] inline-flex align-baseline feather feather-feather" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#28384f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"  ><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
          Build your backpack
        </h1>

        <div className="{classes.container} px-10 py-5 mb-5 md:first:rounded-t-lg lg:last:rounded-b-lg backdrop-blur-lg bg-pata-100/30 hover:bg-gray/30 transition border border-pata-500 dark:border-white border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0">
          <BackpackList data={bpList} setData={setBpList} state={bpSelected} setState={setBpSelected} bpName={bpName} setBpName={setBpName} refresh={fetchBackpackList}/>
        </div>
        
        <div className="{classes.container} px-10 py-5 md:first:rounded-t-lg lg:last:rounded-b-lg backdrop-blur-lg bg-pata-100/30 hover:bg-gray/30 transition border border-pata-500 dark:border-white border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0">
          <TanStackTable parentData={tableData} models={props.itemModels} bpName={bpName} setBpName={setBpName}/>
        </div>
         
         {/*<div className="px-10 py-10 md:first:rounded-t-lg lg:last:rounded-b-lg backdrop-blur-lg bg-pata-100/30 hover:bg-gray/30 transition border border-pata-500 dark:border-white border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0">
          <h2 className=" text-2xl md:text-3xl text-pata-400">Authenticate!</h2>
          <StartingPageContent />
          <ArrowIcon className="mt-4" />
        </div>

         <div className="px-10 py-10 md:first:rounded-t-lg lg:last:rounded-b-lg backdrop-blur-lg bg-pata-100/30 hover:bg-gray/30 transition border border-pata-500 dark:border-white border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0">
          <a className=" block focus:outline-none focus:ring-4">
            <h2 className="text-2xl md:text-3xl text-pata-400">et Allez !</h2>
            <p className="mt-3 text-lg opacity-60">
              Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
              eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
              eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
              posuere sollicitudin aliquam ultrices sagittis orci a.
              Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
              eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
              eleifend. 
            </p>
            <p className="mt-3 text-lg opacity-60">
              Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
              eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
              eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
              posuere sollicitudin aliquam ultrices sagittis orci a.
              Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
              eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
              eleifend. 
            </p>
            <ArrowIcon className="mt-4" />
          </a>
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
