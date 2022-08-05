import clientPromise from "../utils/mongodb";

import Link from 'next/link';
import Image from 'next/image'

import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';

export default function Equips({ equips, globalData }) {
  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.name} />
      <main className="w-max">
        <h1 className="text-3xl lg:text-5xl text-center ">Everything Therm-a-rest</h1>
        <p className="text-2xl text-center md:text-3xl mb-10">
          <small>(Scrapped straight from the source)</small>
        </p>
         <ul className="w-full text-center justify-items-start grid grid-cols-2 gap-2 grid-auto-columns: 1fr; ">
          {equips.map((equip) => (
            <li className="min-w-max md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0">
             <a className="py-6 lg:py-10 px-6 lg:px-4 block focus:outline-none focus:ring-4">
               <Image className="rounded-lg"
                  src={equip.Image}
                  alt="Picture of the matos"
                  width={200}
                  height={200}
                />
                <h2 className="text-xl ">{equip.Model}</h2>
                <h3>Size : {equip.size}</h3>
                <h3>R-value : {equip["R-Value"]}</h3>
                <h3>Color : {equip.Color}</h3>
              </a>
            </li>
          ))}
        </ul>
      </main>
      <Footer copyrightText={globalData.footerText} />
       <GradientBackground
        variant="large"
        className="fixed top-20 opacity-40 dark:opacity-60"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
    
  );
}

export async function getServerSideProps() {
  const globalData = getGlobalData();
   const client = await clientPromise;
   const equips = await client
    .db("ZakIGatsbyProject")
    .collection("SleepingPads")
    .find({Image: {$ne: null}})
    
    .sort({ SKU: -1 })
    .limit(20)
    .toArray();

   // ne marche plus depuis que j'ai delete la new collection 
   /*
  const uniques = await client
  .db("ZakIGatsbyProject")
  .collection("SleepingPads")
  .aggregate([
    {
      $group: {
          _id: '$Model',
         : { $first: '$$ROOT' }
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
*/
  return {
    props: {
      equips: JSON.parse(JSON.stringify(equips)),
      globalData
    },
  };
}