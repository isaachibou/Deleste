import { getSession } from 'next-auth/react';
import { getGlobalData } from '../utils/global-data';

import UserProfile from '../components/profile/user-profile';
import MenuDrawer from '../components/menu/PerstDrawer'
import Landscape from '../components/landscape/landscape'
import Header from '../components/Header'
import SEO from '../components/SEO';

function ProfilePage({globalData}) {
  return (
    <Landscape>
      <SEO title={globalData.name} description={globalData.blogTitle} /> 
      <Header name={globalData.blogTitle} title={globalData.blogSubtitle}/>

       <main className="">
         <UserProfile />
      </main>
    </Landscape>
  );
}

export async function getServerSideProps(context) {
  const globalData = getGlobalData();
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: { 
      session,
      globalData
    },
  };
}

export default ProfilePage;
