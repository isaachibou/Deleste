import Link from 'next/link';
import Image from 'next/image';

export default function Header({ name }) {
  return (
    <header className="pt-20 pb-12 flex-row">
      <div className="w-24 h-24 relative block rounded-full mx-auto border-2 border-cyan-100">
      <Link href="/">
        <a>
          <Image
            src="/images/profile.jpg"
            alt="ma tête à yellowstone" 
            layout="fill" // required
            objectFit="cover" // change to suit your needs
            className="rounded-full" // just an example
          />
        </a>
      </Link>
        
      </div>
      <p className="text-2xl dark:text-white text-center">
        <Link href="/">
          <a>{name}</a>
        </Link>
      </p>
      <ul>
        <Link href="/">
          <a className="mr-4">Home</a>
        </Link>
        <Link href="/matos">
          <a className="mr-4">Matos</a>
        </Link>
        <Link href="/backpack">
          <a className="mr-4">Backpack</a>
        </Link>
      </ul>
    </header>
  );
}
