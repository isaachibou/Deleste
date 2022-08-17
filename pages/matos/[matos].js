import clientPromise from "../../utils/mongodb";
import { getGlobalData } from '../../utils/global-data';
//import { getMatosByID } from '../api/equip'
import { getMatosByID } from '../api/matos_2'

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image' 

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout, { GradientBackground } from '../../components/Layout';
import SEO from '../../components/SEO';


export default function PostPage({
  equips,
  globalData,

}) {
  return (
    <Layout>
      <SEO
        title={`${equips.Model} - ${globalData.name}`}
        description={equips.Size}
      />
      <Header name={globalData.name} />
      <article className="px-6 md:px-0">
        <header>
          <h1 className="text-3xl md:text-5xl dark:text-white text-center mb-12">
            {equips.Model}
          </h1>
        </header>
        <main>
          <div className="grid grid-cols-2 gap-12">
            <div className="min-h-max relative ">
              <Image className="rounded-lg "
                src={equips.Image}
                alt="Picture of the matos"
                width={700}
                height={700}
                layout="fill"
              /> 
            </div>
            <div>
              <table className="">
                {Object.entries(equips).slice(0,-1).map((entry,index) => (
                  <tbody>
                    <th className="text-left" key={index}>{entry[0]}</th>
                    <td  className="text-left pl-5" key={entry[0]}>{entry[1]}</td>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
          {/*<article className="prose dark:prose-dark">
            
            {Object.entries(equips).slice(0,-1).map((entry,index) => (
              <span key={index}>{entry[0]} : {entry[1]}</span>
            ))}
          </article>*/}
          {/*<div className="max-w-fit max-h-fit ml-32 mb-3 ">
            <Image className="rounded-lg  "
                    src={equips.Image}
                    alt="Picture of the matos"
                    width={600}
                    height={600}
             /> 
          </div>
          <table className="ml-32">
              {Object.entries(equips).slice(0,-1).map((entry,index) => (
                <tbody>
                  <th className="text-left" key={index}>{entry[0]}</th>
                  <td  className="text-left pl-5" key={entry[0]}>{entry[1]}</td>
                </tbody>
              ))}
          </table>*/}
           
        </main>
      </article>
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

export async function getServerSideProps(context) {
  const { id } = context.query;
  const globalData = getGlobalData();

  const client = await clientPromise;
  const equips = await getMatosByID(context.params.matos)

  return {
    props: {  
      globalData,
      equips: JSON.parse(JSON.stringify(equips))
    },
  };
}

