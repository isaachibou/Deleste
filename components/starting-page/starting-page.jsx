import classes from './starting-page.module.css';
import Typography from '@mui/material/Typography';
import ArrowIcon from '../../components/ArrowIcon';

import Link from 'next/link';

import { useSession, getSession } from "next-auth/react"

function StartingPageContent() {

  const { data: session, status } = useSession()

  if (status === "loading") {
    return <p>Loading...</p>
  }
  
  if (status === "unauthenticated") {
    return (
      <section className={classes.starting}>
        <Link as={`/auth`}  href={`/auth`}> 
          <button className="my-5 mx-auto rounded-full bg-cyan-100 w-1/5 border-2 border-black">Login</button>
        </Link>
      </section>
    );
  }
  return (
    <section className="">
    <div className="md:first:rounded-t-lg lg:last:rounded-b-lg backdrop-blur-lg bg-pata-100/30 hover:bg-gray/30 transition border border-pata-500 dark:border-white border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0">
     <Link href="https://www.pinterest.fr/pascalpiat/landing-page-inspiration/" >
      <a className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
        <h2 className="text-2xl md:text-3xl text-pata-400">Inspiration pour la Landing Page !</h2>
        <p className="mt-3 text-lg opacity-60">https://www.pinterest.fr/pascalpiat/landing-page-inspiration/</p>
        <ArrowIcon className="mt-4" />
      </a>
      </Link>
   </div>
     

    </section>
  );
}

export default StartingPageContent;
