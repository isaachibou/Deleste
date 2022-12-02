import clientPromise from "../../utils/mongodb";
import { getGlobalData } from '../../utils/global-data';
//import { getMatosByID } from '../api/equip'
import { getMatosByID,
         getPrevMatos,
         getNextMatos
} from '../api/matos_2'

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image' 

import ArrowIcon from '../../components/ArrowIcon';

import Header from '../../components/header/Header';
import Landscape from '../../components/landscape/landscape';
import SEO from '../../components/SEO';


export default function PostPage({
  equips,
  globalData,
  prevMatos,
  nextMatos
}) {
  return (
    <Landscape>
      <SEO
        title={`${equips.Model} - ${globalData.name}`}
        description={equips.Size}
      />
      <Header name={globalData.blogTitle} title={globalData.blogSubtitle}/>
      <article className="px-6 md:px-0">
        <header>
          <div className="grid md:grid-cols-2 gap-0 lg:-mx-24 mt-6 my-12">
            {prevMatos && ( prevMatos.map((matos) => (
              <Link key={matos._id} href={`/matos/${matos._id}`}>
                <a className="py-8 px-10 text-center md:text-right first:rounded-t-lg md:first:rounded-tr-none md:first:rounded-l-lg last:rounded-r-lg first last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 last:border-t md:border-r-0 md:last:border-r md:last:rounded-r-none flex flex-col">
                  <p className="uppercase text-gray-500 mb-4 dark:text-white dark:opacity-60">
                    Previous
                  </p>
                  <div className="grid grid-cols-2 place-items-end text-right justify-items-end">
                    <div className="min-w-fit">
                      <h4 className="text-2xl mb-1 text-gray-700 dark:text-white">
                        {matos.Model}
                      </h4>
                      <h4 className="text-xl  mb-6 dark:text-white">
                        {matos.Size}
                      </h4>
                    </div>
                    <div className="max-w-fit max-h-fit">
                      <Image className="rounded-lg "
                        src={matos.Image}
                        alt="Previous item"
                        width={100}
                        height={100}
                      /> 
                    </div>
                  </div>
                  <ArrowIcon className="transform rotate-180 mx-auto md:mr-0 mt-auto" />
                </a>
              </Link>
            )))}
            {nextMatos && ( nextMatos.map((matos) => (
              <Link key={matos._id} href={`/matos/${matos._id}`}>
                <a className="py-8 px-10 text-center md:text-left md:first:rounded-t-lg last:rounded-b-lg first:rounded-l-lg md:last:rounded-bl-none md:last:rounded-r-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-t-0 first:border-t first:rounded-t-lg md:border-t border-b-0 last:border-b flex flex-col">
                 <p className="uppercase text-gray-500 mb-4 dark:text-white dark:opacity-60">
                    Next
                  </p>
                  <div className="grid grid-cols-2 place-items-end text-left justify-items-start">
                  <div className="max-w-fit max-h-fit">
                      <Image className="rounded-lg "
                        src={matos.Image}
                        alt="Previous item"
                        width={100}
                        height={100}
                      /> 
                    </div>
                    <div className="min-w-fit">
                      <h4 className="text-2xl mb-1 text-gray-700 dark:text-white">
                        {matos.Model}
                      </h4>
                      <h4 className="text-xl  mb-6 dark:text-white">
                        {matos.Size}
                      </h4>
                    </div>
                    
                  </div>
                  <ArrowIcon className="mt-auto mx-auto md:ml-0" />
                </a>
              </Link>
            )))}
          </div>
          <h1 className="text-3xl md:text-5xl dark:text-white text-center mb-12">
            {equips.Model}
          </h1>
        </header>
        <main>
          <div className="grid grid-cols-2 gap-12">
            <div className="min-h-max relative border-cyan-800">
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
                  <tbody key={entry[0]}>
                    <th className="text-left" key={index}>{entry[0]}</th>
                    <td  className="text-left pl-5" key={entry[0]}>{entry[1]}</td>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </main>
      </article>
    </Landscape>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const globalData = getGlobalData();

  const prevMatos = await getPrevMatos(context.params.matos);
  const nextMatos = await getNextMatos(context.params.matos);

  const client = await clientPromise;
  const equips = await getMatosByID(context.params.matos)

  var retour = JSON.parse(JSON.stringify(prevMatos))
  console.log(retour)
  return {
    props: {  
      globalData,
      equips: JSON.parse(JSON.stringify(equips)),
      prevMatos: JSON.parse(JSON.stringify(prevMatos)),
      nextMatos: JSON.parse(JSON.stringify(nextMatos))
    },
  };
}

