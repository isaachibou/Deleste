import Link from 'next/link';
import Image from 'next/image';

export default function Header({ name }) {
  return (
    <header className="pt-20 pb-12">
      <div className="w-24 h-24 relative rounded-full block mx-auto border-2 border-cyan-100">
        <Image
          src="/images/profile.jpg"
          alt="ma tête à yellowstone" 
          layout="fill" // required
          objectFit="cover" // change to suit your needs
          className="rounded-full" // just an example
        />
      </div>
      <p className="text-2xl dark:text-white text-center">
        <Link href="/">
          <a>{name}</a>
        </Link>
      </p>
    </header>
  );
}
