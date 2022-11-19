import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import Divider from '@mui/material/Divider';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';




export default function Header(props) {

  return (
    <header className="flex flex-row min-w-fit items-left mb-8">
      <div className="p-3 justify-center">
        <Link href="/">
          <a className="flex flex-row">
            <div className="my-auto">
              <h1 className="inline align-middle text-left text-pata-400 text-5xl font-bold lg:text-5xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="scale-x-[-1] inline-flex align-bottom feather feather-feather" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#28384f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"  ><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
                {props.name}
              </h1> 
              <h2 className="ml-[63px] leading-[1rem] text-left text-pata-400 text-xl" >{props.title}
                <a href="https://github.com/isaachibou" className="z-40 underline">Isaac Hibou</a>
              </h2>
            </div>        
          </a>
        </Link>
      </div>
      <div className="p-5">
      { props.shareUrl &&
        <Link
          as={`/b/${props.shareUrl}`}
          href={`/b/[backpack]`}
        > 
          <a>
            < ShareOutlinedIcon style={{ color: "#28384f" }} className="hover:cursor-pointer hover:bg-pata-500" />
            <span className="text-center text-pata-400 text-xl"> Share: </span>  {process.env.NEXT_PUBLIC_URL}b/{props.shareUrl} 
          </a>         
        </Link>
        }
      </div>
      <Divider className="border-pata-500"/>
    </header>
  );
}
