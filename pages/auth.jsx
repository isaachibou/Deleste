import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import AuthForm from '../components/auth/auth-form';
import Header from '../components/Header';
import Landscape from '../components/landscape/landscape'
import Layout, { GradientBackground } from '../components/Layout';
import { getGlobalData } from '../utils/global-data';

import SEO from '../components/SEO';


function AuthPage({globalData}) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace('/');
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }	

  return (
	 <Landscape>
	      <SEO title={globalData.name} description={globalData.blogTitle} />
	      <Header name={globalData.blogTitle} title={globalData.blogSubtitle}/>
	      <main className="w-full">
	        <h1 className="text-3xl lg:text-5xl text-center mb-12">
	          {globalData.blogTitle}
	        </h1>
	        <AuthForm />
	      </main>
	  </Landscape>
  );
}

export default AuthPage;

export async function getServerSideProps(context) {
  const globalData = getGlobalData();
   
  return {
    props: {
      globalData,												
    },
  };
}
