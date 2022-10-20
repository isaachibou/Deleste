import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'next-auth/react';


export default function Header({ name, title }) {
  return (
    <header className="flex flex-col min-w-fit items-center mb-8">
      
      <div className="p-3 justify-center">
        <Link href="/">
          <a className="flex flex-row">
            <div className="my-auto">
              <h1 className="inline align-middle text-left text-pata-400 text-xl font-bold lg:text-6xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="scale-x-[-1] inline-flex align-bottom feather feather-feather" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#28384f" strokewidth="2" strokelinecap="round" strokelinejoin="round"  ><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>

                {name}
              </h1> 
              <h2 className="ml-[75px] text-left text-pata-400 text-xl" >{title}
                <a href="https://github.com/isaachibou" className="z-40 underline">Isaac Hibou</a>
              </h2>
            </div>
            
          </a>
        </Link>
      </div>
    </header>
  );
}
