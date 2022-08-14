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
          <article className="prose dark:prose-dark">
         {Object.entries(equips).map((entry,index) => (
            /*switch({entry[0]}) {
              case "Image":
                <Image className="mx-auto rounded-lg"
                    src={equip.Image}
                    alt="Picture of the matos"
                    width={200}
                    height={200}
                  />;
                  break;
              case "_id":
                 null;
                break;
              default:
                 <p>{entry[0]} : {entry[1]}</p>;
            }      
                      */    
            <p>{entry[0]} : {entry[1]}</p>
         ))}

      
          </article>
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

