import clientPromise from "../utils/mongodb";

import Link from 'next/link';
import Image from 'next/image'

import Footer from '../components/Footer';
import Header2 from '../components/Header2';
import LayoutPage, { GradientBackground } from '../components/Layout-page';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';

export default function Equips({  globalData }) {

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
        option.text = items[item].Model
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
    const model = target.options[target.selectedIndex].text
    

    var type = event.target.parentElement.querySelector("li select[name='types']");

    const response = await fetch('/api/oneitem?type='+type+"&model="+model, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'GET'
    });

    const item = await response.json()
    console.debug(item.Model)
    
    var weight = event.target.parentElement.querySelector("li input[name='weight']");
    weight.value= item["Weight (Metric)"];

    var color = event.target.parentElement.querySelector("li input[name='color']");
    color.value= item.Color;
  }

  const handleSubmit = async (event) => {
    const data = event.target.backpack.value; 
    const JSONdata = JSON.stringify(data)

    const response = await fetch('/api/backpacks', {
      body: JSONdata,
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const result = await response.json()
    alert(`Is this your full name: ${result.data}`)
  }

  return (
    <LayoutPage>
      <div>
        <SEO title={globalData.name} description={globalData.blogTitle} />
        <Header2 name={globalData.name} title={globalData.blogTitle} />
        <main  className="flex flex-col max-w-4xl w-full mx-auto ">
          <h1 className="text-3xl lg:text-5xl text-center mb-12"> Build your backpack  </h1>
          {/*<div className="flex flex-col mb-5">
              <label htmlFor="Backpack JSON">Backpack:</label>
              <textarea id ="backpack"  cols="40" rows="4" className="bg-cyan-100  border-2 border-black"></textarea>
              <button className="my-2 mx-auto rounded-full bg-cyan-100 w-1/5 border-2 border-black" type="submit">Envoyer le JSON</button>
          </div>*/}
          <ul className="space-y-1">
            <li className="flex flex-row flex-end divide-x-1 divide-y-1">
             <span className="basis-1/6 ">Type</span>
             <span className="basis-3/6 ">Item</span>
             <span className="basis-1/6">Qté</span>
             <span className="basis-1/6">Poids</span>
             <span className="basis-1/6">Couleur</span>
            </li>
            <li className="flex flex-row flex-end text-right space-x-1">
              <select name="types" id="itemTypes" className="basis-1/6 bg-inherit" onChange={onItemTypeSelection}>
                <option value="backpack"  >Backpack</option>
                <option value="pad">Pad</option>
                <option value="bag">Bag</option>
                <option value="stove">Stove</option>
              </select>
              <select name="items" id="itemsFetched" className="basis-3/6 bg-inherit" onChange={onItemSelection}>
                {/*{items.map((items) => (
                  <option value="backpack">Backpack</option>
                ))}*/}
              </select>
              <input className="min-w-0 basis-1/6 bg-inherit text-right"  type="text" placeholder="1" />
              <input name="weight" className="min-w-0 basis-1/6 bg-inherit text-right"  type="text" placeholder="1"/> 
              <input name="color" className="min-w-0 basis-1/6 bg-inherit text-right"  type="text" placeholder="Black"/>
            </li>
          </ul>
          <button className="my-5 mx-auto rounded-full bg-cyan-100 w-1/5 border-2 border-black" type="submit">Submit</button>

        </main>
        <GradientBackground
          variant="large"
          className="fixed top-20 opacity-40 dark:opacity-60"
        />
      </div>
    </LayoutPage>
    

    
  );
}


export async function getServerSideProps() {
  const globalData = getGlobalData();
  const client = await clientPromise;
  
  /*const backpackCollection = await client.db("ZakIGatsbyProject").collection("Backpacks");
  const result = await backpackCollection.insertOne(backpack);*/

  return {
    props: {
      globalData
    },
  };
}