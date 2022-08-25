import Link from 'next/link';
import Image from "next/image";
import { getPosts } from '../utils/mdx-utils';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';
import StartingPageContent from '../components/starting-page/starting-page';
import Layout from '../components/Layout';
import Landscape from '../components/landscape/landscape'


export default function Index({ posts, globalData }) {
  return (
    <Landscape>
      <SEO title={globalData.name} description={globalData.blogTitle} /> 
      <main className="">
         
        
        <h1 className="text-3xl lg:text-5xl text-center">
          {globalData.blogTitle}
        </h1>
        <h2 className="text-2xl text-center mb-12">{globalData.blogSubtitle}</h2>
        {/*<StartingPageContent />*/}
      </main>
    </Landscape>
  );
}

export function getStaticProps() {
  const posts = getPosts();
  const globalData = getGlobalData();

  return { props: { posts, globalData } };
}
