import clientPromise from "../utils/mongodb";

import { getData, getAllBrands } from './api/matos_2'

import { useState, useEffect, useRef } from 'react'

import Link from 'next/link';
import Image from 'next/image'

import Footer from '../components/Footer';
import Header from '../components/Header';
import Landscape from '../components/landscape/landscape'
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';

export default function Equips({ brands, equips, globalData }) {

  const isInitialMount = useRef(true);
  let setEquips="";
   
  [equips, setEquips] = useState(equips);

  const options = [
    {
      label: "All",
      value: "all"
    },
    {
      label: "Backpack",
      value: "backpack"
    },
    {
      label: "Bag",
      value: "sleepingbag"
    },
    {
      label: "Pad",
      value: "sleepingmat"
    },
    {
      label: "Pillows",
      value: "pillow"
    },
    {
      label: "Custom",
      value: "custom"
    }
  ];


  // API fetch function
  const fetchMatos = async () => {  
    console.log("This is client side fetching")
    const type = document.querySelector("#itemTypes").value
    const brand = document.querySelector("#itemBrands").value
    const response = await fetch('/api/matos_2?type='+type+"&brand="+brand, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })
    const items = await response.json()
    console.log(items)
    setEquips(items)
  }   

  // Do not instantiate with client fetch, but with ServerSideProps     
    useEffect(async () => {    
      if (!isInitialMount.current) {
        isInitialMount.current = false;
        console.log("not InitialMount")
        fetchMatos()
      } else {
        console.log("InitialMount")
      }
    })


  return (
    <Landscape>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.blogTitle} title={globalData.blogSubtitle}/>
      <main className="flex flex-col items-center max-w-4xl w-full mx-auto">
        <h1 className="text-3xl lg:text-5xl text-center ">Everything we have in the books</h1>
        <p className="text-2xl text-center md:text-3xl mb-10">
          <small>(Scrapped straight from the source)</small>
        </p>
        <div>
          <select name="types" id="itemTypes" className="basis-1/6 bg-transparent" onChange={fetchMatos}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
          </select>
          <select name="brands" id="itemBrands" className="basis-1/6 bg-transparent" onChange={fetchMatos}>
            {brands.map((brand) => (
                <option key={brand}value={brand}>{brand}</option>
              ))}
          </select>
          
        </div>
        
         <ul className="grid grid-cols-3 whitespace-nowrap ">
          {equips.map((equip) => (
            <li key={equip._id} className="min-w-full d:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0">
              <Link
                as={`/matos/${equip._id}`}
                href={`/matos/[matos]`}
              > 
                <a className=" text-center py-6 lg:py-10 px-6 lg:px-4 block focus:outline-none focus:ring-4">
                   <span className="flex flex-row p-2  text-pata-500 text-xl font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 scale-x-[-1] inline-flex align-top feather feather-feather" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d3a38f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-feather"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
                    {equip["Weight (Metric)"]} 
                  </span>
                 
                  <Image className="mx-auto rounded-lg"
                    src={equip.Image}
                    alt="Picture of the matos"
                    width={200}
                    height={200}
                  />
                  <h2 className="text-center">{equip.Brand}</h2>
                  <h2 className="text-center">{String(equip.Model).replace("Matelas","")}</h2>
                  <div className="text-left pl-5 pt-5 ">
                    <h3><span className="font-bold">Size: </span>{equip.Size}</h3>
                    <h3><span className="font-bold">R-value : </span>{equip["R-Value"]}</h3>
                    <h3><span className="font-bold">Color :</span> {equip.Color}</h3>
                  </div>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </Landscape>
  );
}

export async function getServerSideProps(context) {
  const globalData = getGlobalData();
  const client = await clientPromise;
  const equips = await getData("sleepingbag", "All");console.log("résultat seuqips ",equips)
  let brands = await getAllBrands()
  brands.unshift("All")

  return {
    props: {
      globalData,
      equips: JSON.parse(JSON.stringify(equips)),
      brands: brands
    },
  };
}