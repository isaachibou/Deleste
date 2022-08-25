import Link from 'next/link';
import Image from "next/image";
import { getPosts } from '../utils/mdx-utils';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';
import StartingPageContent from '../components/starting-page/starting-page';
import MenuDrawer from '../components/menu/PerstDrawer'
import Landscape from '../components/landscape/landscape'
import Header from '../components/Header'


export default function Index({ posts, globalData }) {
  return (
    <Landscape>
    
      <SEO title={globalData.name} description={globalData.blogTitle} /> 
      <Header name={globalData.blogTitle} title={globalData.blogSubtitle}/>

       <main className="">
         
        <StartingPageContent />
      </main>
    </Landscape>
  );
}

export function getStaticProps() {
  const posts = getPosts();
  const globalData = getGlobalData();
  console.log(globalData)
  return { props: { posts, globalData } };
}
