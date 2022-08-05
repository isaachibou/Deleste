import clientPromise from "../utils/mongodb";

import Link from 'next/link';
import Image from 'next/image'

import Footer from '../components/Footer';
import Header2 from '../components/Header2';
import LayoutPage, { GradientBackground } from '../components/Layout-page';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';

export default function Equips({  globalData }) {
  return (
    <LayoutPage>
      <div>
        <SEO title={globalData.name} description={globalData.blogTitle} />
        <Header2 name={globalData.name} title={globalData.blogTitle} />
        <main  className="flex flex-col items-center max-w-4xl w-full mx-auto mt-10">
          <h1 className="text-3xl lg:text-5xl text-center mb-12"> Build your backpack  </h1>
          <div className="w-24 l-24 md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0">
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