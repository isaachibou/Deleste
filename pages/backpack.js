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
        <Header2 name={globalData.name} title={globalData.blogTitle} />{/*
        <main className="w-max">
          <h1 className="text-3xl lg:text-5xl text-center mb-12"> Build your backpack  </h1>
          <div className="w-24 l-24 md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0">
          </div>

        </main>
        <Footer copyrightText={globalData.footerText} />*/}
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

  const uniques = await client
  .db("ZakIGatsbyProject")
  .collection("SleepingPads")
  .aggregate([
    {
      $group: {
          _id: '$Model',
          detail: { $first: '$$ROOT' }
        },
    },
    { "$out": "newcollection" }
  ]);

  const equips = await client
  .db("ZakIGatsbyProject")
  .collection("newcollection")
  .find({
         _id: {$ne: null}
  })
  .sort({ SKU: -1 })
  .toArray();

  return {
    props: {
      equips: JSON.parse(JSON.stringify(equips)),
      globalData
    },
  };
}