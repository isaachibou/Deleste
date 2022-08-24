import classes from './starting-page.module.css';
import Typography from '@mui/material/Typography';
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
      <br/><br/>
      <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>

    </section>
  );
}

export default StartingPageContent;
