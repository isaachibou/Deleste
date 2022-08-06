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
    const JSONdata = JSON.stringify(data)
    
    if(data=="pad") {
      alert(`You have chosen type: ${data}`);

      const response = await fetch('/api/onesleepingpad', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'GET'
      })

      const result = await response.json()
      alert(`I have retrieved this: ${result.Model}`)
    }

  }

  // Handle the submit event on form submit.
  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    // Get data from the form.
    const data = event.target.backpack.value; 
    const JSONdata = JSON.stringify(data)

    // Send the form data to our API and get a response.
    const response = await fetch('/api/backpacks', {
      // Body of the request is the JSON data we created above.
      body: JSONdata,

      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // The method is POST because we are sending data.
      method: 'POST',
    })

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
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
          <div className="flex flex-col mb-5">
              <label htmlFor="Backpack JSON">Backpack:</label>
              {/*<input type="text" id="backpack" rows = "5" name="first" size="50" height = "50" required />*/}
              <textarea id ="backpack"  cols="40" rows="4" className="bg-cyan-100  border-2 border-black"></textarea>
              <button className="my-2 mx-auto rounded-full bg-cyan-100 w-1/5 border-2 border-black" type="submit">Envoyer le JSON</button>
          </div>
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
                <option value="backpack">Backpack</option>
                <option value="pad">Pad</option>
                <option value="bag">Bag</option>
                <option value="stove">Stove</option>
              </select>
              <select name="items" id="itemsFetched" className="basis-3/6 bg-inherit">>
                {/*{items.map((items) => (
                  <option value="backpack">Backpack</option>
                ))}*/}<option value="backpack"></option>
              </select>
              <input className="min-w-0 basis-1/6 bg-inherit text-right"  type="text" placeholder="0" />
              <input className="min-w-0 basis-1/6 bg-inherit text-right"  type="text" placeholder="0"/> 
              <input className="min-w-0 basis-1/6 bg-inherit text-right"  type="text" placeholder="Black"/>
            </li>
          </ul>
          <form className="flex flex-col space-y-4 mt-10" onSubmit={handleSubmit}>
            <select name="cars" id="cars">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>

              
            </form>
          
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
  /*
  var backpack= {
  "name": "Equipement d'hiver Isaac",
  "backpack": [{
    "brand": "Deuter",
    "model": "Aircontact Pro",
    "volume": "70+15L", 
    "weight": "2.8",
    "color": "lava"
  }],
  "sleepingpad": {
    "brand": "Therm-a-rest",
    "model": "Matelas NeoAir XT MAX",
    "volume": "28 cm x 11 cm",  
    "weight": "0.71",
    "r-value": "6.9",
    "color": "vapor"
  },
  "sleepingbag": {
    "brand": "Therm-a-rest",
    "model": "Sac de couchage Questar 0F/-18C",
    "volume": "20 x 25 cm", 
    "weight": "1.38",
    "color": "Balsam"
  },
  "stove": {
    "model": "MSR",
    "volume": "0.5L", 
    "weight": "0.5",
  }
};

  const backpackCollection = await client.db("ZakIGatsbyProject").collection("Backpacks");
  const result = await backpackCollection.insertOne(backpack);*/

  return {
    props: {
      globalData
    },
  };
}