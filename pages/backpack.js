import clientPromise from "../utils/mongodb";

import Link from 'next/link';
import Image from 'next/image'

import Footer from '../components/Footer';
import Header2 from '../components/Header2';
import LayoutPage, { GradientBackground } from '../components/Layout-page';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';

export default function Equips({  globalData }) {
  // Handle the submit event on form submit.
  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    // Get data from the form.
    const data = event.target.backpack.value;
    const JSONdata = JSON.stringify(data)

    // Send the form data to our API and get a response.
    const response = await fetch('/api/backpack', {
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
        <main  className="flex flex-col items-center max-w-4xl w-full mx-auto mt-10">
          <h1 className="text-3xl lg:text-5xl text-center mb-12"> Build your backpack  </h1>
         
         <div>
          <form onSubmit={handleSubmit}>
          <label htmlFor="Backpack JSON">Bacpack</label>
          <input type="text" id="backpack" name="first" size="50" height = "50" required />
         

        <button type="submit">Submit</button>
        </form>
      </div>
        </main>
        <Footer copyrightText={globalData.footerText} />
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
  const result = await backpackCollection.insertOne(backpack);

  return {
    props: {
      globalData
    },
  };
}