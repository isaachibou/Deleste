import classes from './starting-page.module.css';
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
      <h2 className="text-2xl">Welcome !</h2>
      <p>Feel free to navigate in this website, It is a summer project I am still working on.</p>
      <p>Here you can explore all the equipments and their characteristics that I gathered, build a backpack or several and visualize them.
      <br/>Soon a feature about food packing will be there as well !</p>

    </section>
  );
}

export default StartingPageContent;
