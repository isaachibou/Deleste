import clientPromise from "../utils/mongodb";

import Link from 'next/link';
import Image from 'next/image'

import Footer from '../components/Footer';
import Header from '../components/Header';
import Landscape from '../components/landscape/landscape'

import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';
import EquipTable from "../components/table/table";
import Divider from '@mui/material/Divider';


export default function Equips({  globalData, equips }) {
  
  const onItemTypeSelection = async (event) => {
    const data = event.target.value; 
    
    if(data=="pad" || data =="bag") {
      console.debug(`You have chosen type: ${data}`);

      const response = await fetch('/api/allitems?type='+data, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'GET'
      })

      const items = await response.json()
      console.debug(`I have retrieved this: `+JSON.stringify(items));

      var option, select = event.target.parentElement.querySelector("li select[name='items']");
      select.options.length = 0;
      for(let item in items) {
        console.debug(items[item])
        option = document.createElement("option");
        option.text = items[item].Model + " - " + items[item].Size
        option.value = items[item]
        select.appendChild(option);
      }

      var weight = event.target.parentElement.querySelector("li input[name='weight']");

      weight.value= items[select.selectedIndex]["Weight (Metric)"]

      var color = event.target.parentElement.querySelector("li input[name='color']");
      color.value=items[select.selectedIndex].Color  
    }
  }

  const onItemSelection = async (event) => {
    const target = event.target;
    const model = target.options[target.selectedIndex].text.split(" - ")[0]
    console.debug(model)
    

    var type = event.target.parentElement.querySelector("li select[name='types']").value;
      
    const response = await fetch('/api/oneitem?type='+type+"&model="+model, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'GET'
    });

    const item = await response.json()
    console.debug("item " + item)
    
    var weight = event.target.parentElement.querySelector("li input[name='weight']");
    console.debug("weight " +weight)
    weight.value= item["Weight (Metric)"];

    var color = event.target.parentElement.querySelector("li input[name='color']");
    color.value= item.Color;
  }

  const handleSubmit = async (event) => {
    var rows = document.querySelectorAll("li")
    var nameselector = document.querySelector("input[name='EquipmentName']");
    let equipName = nameselector.value; 
    console.debug(equipName)
    
    let backpackObject = {
      owner: await getUserId(),
      name: equipName
    }; 

    for(let row of rows) {
      if(row.children[name="types"]) {
        var indexType = row.children[name="types"].selectedIndex
        var type = row.children[name="types"].options[indexType].value
        var indexItem = row.children[name="items"].selectedIndex
        var item = row.children[name="items"].options[indexItem].text
        var weight = row.children[name="weight"].value
        var color = row.children[name="color"].value
        console.debug(item)
       
        let itemObject = {
          brand:"",
          model: String(item).split(" - ")[0],
          volume:"",
          weight: weight,
          color: color
        };
        switch(type) {
          case "pad":
            backpackObject["spleepingPad"] = itemObject;
            break;
          case "bag":
            backpackObject.spleepingBad = itemObject;
            break;
          default:
            break;
        }
      } 
    }
      console.debug(backpackObject)

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
  }

  const getUserId = async (req) => {
    const session = await getSession({ req });
    const userEmail = session.user.email;

    const response = await fetch('/api/auth/users?email='+userEmail, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'GET'
    });
   
    const result = await response.json()
      
    return result._id;
  }
  
  const debug = () => {
    var rows = document.querySelectorAll("li")
    var nameselector = document.querySelector("input[name='EquipmentName']");
    let equipName = nameselector.value; 
    console.debug(equipName)
    
     let backpackObject = {name: equipName}; 

    for(let row of rows) {
      if(row.children[name="types"]) {
        var indexType = row.children[name="types"].selectedIndex
        var type = row.children[name="types"].options[indexType].value
        var indexItem = row.children[name="items"].selectedIndex
        var item = row.children[name="items"].options[indexItem].text
        var weight = row.children[name="weight"].value
        var color = row.children[name="color"].value
        console.debug(item)
       
        let itemObject = {
          model: String(item).split(" - ")[0],
          weight: weight,
          color: color
        };
        switch(type) {
          case "pad":
            backpackObject["spleepingPad"] = itemObject;
            break;
          case "bag":
            backpackObject.spleepingBad = itemObject;
            break;
          default:
            break;
        }
      } 
    }
      console.debug(backpackObject)
  }

  return (
    <Landscape>
        <SEO title={globalData.name} description={globalData.blogTitle} />
{/*             <Header name={globalData.blogTitle} title={globalData.blogSubtitle}/>
*/}
        <main  className="flex flex-col max-w-4xl w-full mx-auto ">
           <h1 className="text-center text-pata-400 text-3xl lg:text-5xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 scale-x-[-1] inline-flex align-baseline feather feather-feather" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#28384f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  ><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
                  Build your backpack
              </h1>
          <div className="flex flex-row mt-16">
            <svg xmlns="http://www.w3.org/2000/svg" className="scale-x-[-1] inline-flex align-baseline feather feather-feather" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#28384f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  ><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
            <input name="EquipmentName" className="min-w-max ml-1 whitespace-nowrap w-52 text-left text-pata-400 text-xl bg-transparent  placeholder:text-pata-400 "  type="text" placeholder="My Equipment1"/>
          </div>
          {/*<ul className="space-y-1">
            <li className="flex flex-row flex-end divide-x-1 divide-y-1">
             <span className="basis-1/6 ">Type</span>
             <span className="basis-3/6 ">Item</span>
             <span className="basis-1/6">Qté</span>
             <span className="basis-1/6">Poids</span>
             <span className="basis-1/6">Couleur</span>
            </li>
            <li className="flex flex-row flex-end text-right space-x-1">
              <select name="types" id="itemTypes" className="basis-1/6 bg-transparent" onChange={onItemTypeSelection}>
                <option value="backpack"  >Backpack</option>
                <option value="pad">Pad</option>
                <option value="bag">Bag</option>
                <option value="stove">Stove</option>
              </select>
              <select name="items" id="itemsFetched" className="basis-3/6 bg-transparent" onChange={onItemSelection}>
              </select>
              <input className="min-w-0 basis-1/6 bg-transparent text-right placeholder:text-pata-400"  type="text" placeholder="1" />
              <input name="weight" className="min-w-0 basis-1/6 bg-transparent text-right placeholder:text-pata-400"  type="text" placeholder="1"/> 
              <input name="color" className="min-w-0 basis-1/6 bg-transparent text-right placeholder:text-pata-400"  type="text" placeholder="Black"/>
            </li>
            <li className="flex flex-row flex-end text-right space-x-1">
              <select name="types" id="itemTypes" className="basis-1/6 bg-transparent" onChange={onItemTypeSelection}>
                <option value="backpack"  >Backpack</option>
                <option value="pad">Pad</option>
                <option value="bag">Bag</option>
                <option value="stove">Stove</option>
              </select>
              <select name="items" id="itemsFetched" className="basis-3/6 bg-transparent" onChange={onItemSelection}/>
              <input className="min-w-0 basis-1/6 bg-transparent text-right placeholder:text-pata-400"  type="text" placeholder="1" />
              <input name="weight" className="min-w-0 basis-1/6 bg-transparent text-right placeholder:text-pata-400"  type="text" placeholder="1"/> 
              <input name="color" className="min-w-0 basis-1/6 bg-transparent text-right placeholder:text-pata-400"  type="text" placeholder="Black"/>
            </li>
            <br/><br/>

          </ul>*/}

          <Divider />
          
          <EquipTable data={equips}/>
          <button className="my-5 mx-auto rounded-full bg-cyan-100 w-1/5 border-2 border-black" type="submit" onClick={handleSubmit}>Submit</button>
          <button className="my-5 mx-auto rounded-full bg-cyan-100 w-1/5 border-2 border-black" type="submit" onClick={debug}>Debug</button>          
        </main>
    </Landscape>
    

    
  );
}


export async function getServerSideProps() {
  const globalData = getGlobalData();
  const client = await clientPromise;
  const equips = [];
  
  return {
    props: {
      globalData,
      equips
    },
  };
}