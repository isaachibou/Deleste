import clientPromise from "../utils/mongodb"
import Link from 'next/link';
import Image from "next/image";
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import { getData } from './api/matos_2'

import SEO from '../components/SEO';
import StartingPageContent from '../components/starting-page/starting-page';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import SearchBar from "../components/landing-page/searchbar"
import MenuDrawer from '../components/menu/PerstDrawer'
import Landscape from '../components/landscape/landscape'
import Header from '../components/Header'


export default function Index(props) {

  return (
    <Landscape>
    
      <SEO title={props.globalData.name} description={props.globalData.blogTitle} />
      <Header name={props.globalData.blogTitle} title={props.globalData.blogSubtitle}/>

      <main className="">
        <h2 className="text-2xl md:text-2xl text-pata-400">What will you pack first ? </h2>
        <SearchBar items={props.equips} />
      </main>
    </Landscape>
  );
}

export async function getServerSideProps(context) {
  const globalData = getGlobalData();
  const client = await clientPromise;
  const equips = await getData()

  return {
    props: {
      globalData,
      equips: JSON.parse(JSON.stringify(equips)),
    },
  };
}
