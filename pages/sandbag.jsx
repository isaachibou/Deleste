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
        
         <div className="px-10 py-10 md:first:rounded-t-lg lg:last:rounded-b-lg backdrop-blur-lg bg-pata-100/30 hover:bg-gray/30 transition border border-pata-500 dark:border-white border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0">
          <h2 className=" text-2xl md:text-3xl text-pata-400">Authenticate!</h2>
          <StartingPageContent />
          <ArrowIcon className="mt-4" />
        </div>

         <div className="px-10 py-10 md:first:rounded-t-lg lg:last:rounded-b-lg backdrop-blur-lg bg-pata-100/30 hover:bg-gray/30 transition border border-pata-500 dark:border-white border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0">
          <a className=" block focus:outline-none focus:ring-4">
            <h2 className="text-2xl md:text-3xl text-pata-400">et Allez !</h2>
            <p className="mt-3 text-lg opacity-60">
              Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
              eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
              eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
              posuere sollicitudin aliquam ultrices sagittis orci a.
              Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
              eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
              eleifend. 
            </p>
            <p className="mt-3 text-lg opacity-60">
              Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
              eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
              eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
              posuere sollicitudin aliquam ultrices sagittis orci a.
              Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
              eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
              eleifend. 
            </p>
            <ArrowIcon className="mt-4" />
          </a>
        </div>
        
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
