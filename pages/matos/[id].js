/*import clientPromise ,{ ObjectId }  from "../../utils/mongodb";
import { getGlobalData } from '../../utils/global-data';

import { useRouter } from 'next/router'
import Head from 'next/head';
import Link from 'next/link';
import ArrowIcon from '../../components/ArrowIcon';
import CustomLink from '../../components/CustomLink';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout, { GradientBackground } from '../../components/Layout';
import SEO from '../../components/SEO';


export default function Mato({ matos }) {
  return (
  	<div>	
  		<h1 className="text-3xl md:text-5xl dark:text-white text-center mb-12">{matos.Model}</h1>
  		<h4 className="text-2xl text-gray-700 mb-6 dark:text-white">{matos.SKU}</h4>
  		<h4 className="text-2xl text-gray-700 mb-6 dark:text-white">{matos.Color}</h4>
  	</div>

  );
}

export async function getServerSideProps() {
  const router = useRouter()
  const { id } = router.query

  const client = await clientPromise;

  const matos = await client
    .db("ZakIGatsbyProject")
    .collection("SleepingPads")
    .find({
      "_id": {id},
    })
    .sort({ SKU: -1 })
    .toArray();

  return {
    props: {
      matos: JSON.parse(JSON.stringify(matos)),
    },
  };
}
*/

