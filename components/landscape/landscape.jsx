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
        <div className="flex flex-col  max-w-4xl w-full mx-auto">
        {children}
      </div>
    </div>
  </div>
)

export default Landscape