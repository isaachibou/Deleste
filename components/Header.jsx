import Link from 'next/link';
import Image from 'next/image';

import { signOut } from 'next-auth/react';


export default function Header({ name, title }) {
  return (
    <header className="flex flex-col min-w-fit items-center mb-8">
      <div className="p-3 justify-center">
        <Link href="/">
          <a className="flex flex-row">
            <div className="w-24 h-24 relative inline-block rounded-full mx-4 border-2 border-pata-200">     
              <Image
                src="/images/profile.jpg"
                alt="ma tête à yellowstone" 
                layout="fill" // required
                objectFit="cover" // change to suit your needs
                className="rounded-full" // just an example
              />
            </div>
            <div className="my-auto">
              <h1 className="text-left text-pata-400 text-xl font-bold lg:text-5xl">{name}</h1>
              <h2 className="text-left text-pata-400 text-xl" >{title}
                <a href="https://github.com/isaachibou" className="z-40 underline">Isaac Hibou</a>
              </h2>
            </div>
          </a>
        </Link>
      </div>
    </header>
  );
}
