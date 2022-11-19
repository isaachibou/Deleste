import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import Image from "next/image"
import Link from 'next/link';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import CustomItemForm from '../../landing-page/custom-item-form'

// var cl = new cloudinary.Cloudinary({cloud_name: "dgebu7ez3", secure: true});
 
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

      const onChange = e => {
      	console.log("IMAGE CELL change", e.target.value)
		  	setValue(String(e.target.value))
		  }

      React.useEffect(() => {
        console.log("re render after load iamge")
        updateMyData(index, id, value)
      },[value])
      
      // If the initialValue is changed external, sync it up with our state
      React.useEffect(() => {
        setValue(initialValue)
      }, [initialValue])

      const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
          const i = event.target.files[0];

        }
      };

      const uploadToServer = async (event) => {
        const body = new FormData();
        body.append("file", image);
        const response = await fetch("/api/file", {
          method: "POST",
          body
        });
      };

      if(original.Type != "custom" && matosUrl) {
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
        if(!value) {
          return ( 
            <div>
              <label for="file-input">
               <CustomItemForm url={value} setUrl={setValue}/>
             </label>
            </div>
          )
  		  }
         else {
          return (
            <Link href={value}> 
              <a target="_blank">
                <img className="min-w-fit mx-auto w-[60px] h-[60px] rounded-lg border-2 border-pata-500"
                  src={value}
                  alt="Picture of the matos"
                    />   
              </a>
            </Link>
          )
        }

        // return <AddPhotoAlternateOutlinedIcon style={{ color: "#28384f" }} className="max-w-min hover:cursor-pointer hover:bg-pata-500" onClick={() => console.log("mon cul")} />
	  	}
	}
