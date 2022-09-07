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
        <Link
                  as={`/auth`}
                  href={`/auth`}
                > 
                <button className="my-5 mx-auto rounded-full bg-cyan-100 w-1/5 border-2 border-black">Login</button>

        </Link>
      </section>
    );
  }
  return (
    <section className="">
    <div className="md:first:rounded-t-lg lg:last:rounded-b-lg backdrop-blur-lg bg-pata-100/30 hover:bg-gray/30 transition border border-pata-500 dark:border-white border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0">
      <a className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
        <h2 className="text-2xl md:text-3xl text-pata-400">Welcome !</h2>
        <p className="mt-3 text-lg opacity-60">Feel free to navigate in this website, It is a summer project I am still working on.<br/>
        Here you can explore all the equipments and their characteristics that I gathered, build a backpack or several and visualize them.
        <br/>Soon a feature about food packing will be there as well !</p>
        <ArrowIcon className="mt-4" />
      </a>
      </div>
      <div className="md:first:rounded-t-lg lg:last:rounded-b-lg backdrop-blur-lg bg-pata-100/30 hover:bg-gray/30 transition border border-pata-500 dark:border-white border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0">
        <a className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
          <h2 className="text-2xl md:text-3xl text-pata-400">Allez !</h2>
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

    </section>
  );
}

export default StartingPageContent;
