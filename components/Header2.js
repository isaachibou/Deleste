import Link from 'next/link';
import Image from 'next/image';

export default function Header2({ name, title }) {
  return (
    <header className="flex flex-col max-w-fit">
     	<div className="p-3">
	      	<Link href="/">
	      		<a className="flex flex-row">
	      			<div className="w-20 h-20 relative inline-block rounded-full mx-4 border-2 border-cyan-800">     
		          		<Image
		            		src="/images/profile.jpg"
			            	alt="ma tête à yellowstone" 
			            	layout="fill" // required
				            objectFit="cover" // change to suit your needs
			            	className="rounded-full" // just an example
	          			/>
	       			</div>
			        <div className="my-auto">
			        	<h1 className="text-4xl text-cyan-800 font-bold lg:text-4xl">{name}</h1>
			            <h2 className="text-base text-cyan-900 underline underline-offset-2" >{title}</h2>
			        </div>
	        	</a>
	      	</Link>
    	</div>
    	<ul className="mx-10 flex flex-row pb-4 text-cyan-900 ">
    	 		<Link href="/">
	          <a className="mr-5">Home</a>
	        </Link>
	        <Link href="/matos">
	          <a className="mr-5">Matos</a>
	        </Link>
	        <Link href="/backpack">
	          <a className="mr-5">Backpack</a>
	        </Link>
	        <Link href="/backpack">
	          <a className="mr-5">BP2</a>
	        </Link>
      </ul>
    </header>
  );
}
