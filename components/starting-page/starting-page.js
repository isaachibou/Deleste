import classes from './starting-page.module.css';
import Link from 'next/link';

function StartingPageContent() {
  // Show Link to Login page if NOT auth
  return (
    <section className={classes.starting}>
      <Link
                as={`/auth`}
                href={`/auth`}
              > 
              LOGGE TOI !!!!
      </Link>
    </section>
  );
  /*return (
    <section className={classes.starting}>
      <h1>Welcome on Board!</h1>
    </section>
  );*/
}

export default StartingPageContent;
