import Image from 'next/image'
import { bgFrame, bgWrap, bgText } from '../../styles/styles.module.css'
import MenuDrawer from '../../components/menu/PerstDrawer'


const Landscape = ({ children }) => (
  <div>
    <div className={bgWrap}>
      <Image
        alt="Mountains"
        src="/images/memoriesofpata.jpg"
        layout="fill"
        objectFit="cover"
        quality={70}
      />
    </div>
    <div className="relative py-6 ">
        <div className="flex flex-col max-w-6xl w-full mx-auto">
        {children}
      </div>
    </div>
  </div>
)

export default Landscape