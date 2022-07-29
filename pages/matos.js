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
      <main className="w-full">
        <h1 className="text-3xl lg:text-5xl text-center ">Everything Therm-a-rest</h1>
        <p className="text-2xl text-center md:text-3xl mb-10">
          <small>(Scrapped straight from the source)</small>
        </p>
        <ul>
          {equips.map((equip) => (
            <li  className="mb-5">
             <Image className="rounded-lg"
                src={equip.detail.Image}
                alt="Picture of the author"
                width={200}
                height={200}
              />
              <h2 className="text-2xl ">{equip.detail.Model}</h2>
              <h3>R-value : {equip.detail["R-Value"]}</h3>
              <h3>Color : {equip.detail.Color}</h3>
              <h3>Image : {equip.detail.Image}</h3>
            </li>
          ))}
        </ul>
      </main>
      <Footer copyrightText={globalData.footerText} />
      <GradientBackground
        variant="large"
        className="absolute -top-32 opacity-30 dark:opacity-50"
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