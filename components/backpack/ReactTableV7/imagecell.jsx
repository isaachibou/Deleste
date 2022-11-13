import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import Image from "next/image"
import Link from 'next/link';


export default function ImageCell({
    width,
    height,
    matosUrl,
    value: initialValue,
    row: { index, original },
    column: { id },
    updateMyData, // This is a custom function that we supplied to our table instance
    }) {
      // We need to keep and update the state of the cell normally
      const [value, setValue] = React.useState(initialValue)
      // const [imageLoaded, setImageLoaded] = React.useState(initialValue)

      const onChange = e => {
      	console.log(e.target.value)
		  	setValue(String(e.target.value))
		  }

			React.useEffect(() => {
        console.log("re render after load iamge")
      }, [value])
      // If the initialValue is changed external, sync it up with our state
      React.useEffect(() => {
        setValue(initialValue)
      }, [initialValue])

      if(value || original.Type != "custom") {
			return (
        <Link href={matosUrl}> 
          <a target="_blank">
            <Image className="min-w-fit mx-auto rounded-lg border-2 border-pata-500"
    		      src={value}
    		      alt="Picture of the matos"
    		      width={width}
    		      height={height}
    		    />   
          </a>
        </Link> )
	  	} else {
/*	  		return <input type="file" multiple accept="public/images/*" onChange={onChange} />
*/	  		return <span>{value}</span>
	  	}
	}
