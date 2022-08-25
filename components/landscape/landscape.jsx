/*import Image from 'next/image'

function Landscape({children}) {
	return(
		<div className="m-8 overflow-hidden w-full h-full">
	     
		        <Image
		         	src="/images/memoriesofpata.jpg"
		         	alt="pata like landscape"
		         	layout="intrinsic"
		         	objectFit="cover"
		         	quality="100"
	         	/>
	        	{children}

    	</div>
	)
}

export default Landscape;*/


import Image from 'next/image'
import { bgFrame, bgWrap, bgText } from '../../styles/styles.module.css'

const Landscape = ({ children }) => (
  <div>
    <div className={bgWrap}>
      <Image
        alt="Mountains"
        src="/images/memoriesofpata.jpg"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
    </div>
    <div className="relative p-24 overflow-hidden">
        <div className="flex flex-col items-center max-w-4xl w-full mx-auto">
        {children}
      </div>
    </div>
  </div>
)

export default Landscape