import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import Image from "next/image"
import Link from 'next/link';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';

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
      const [image, setImage] = useState(null);
      const [createObjectURL, setCreateObjectURL] = useState(null);

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

      const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
          const i = event.target.files[0];

          setImage(i);
          setCreateObjectURL(URL.createObjectURL(i));
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

      if(value || original.Type != "custom") {
        console.log("valueeeee", value)
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
        if(!image) {
          return ( 
            <div>
              <label for="file-input">
                <AddPhotoAlternateOutlinedIcon style={{ margin: "auto",height: "60px", width:"60px",color: "#28384f" }} className="max-w-min hover:cursor-pointer hover:bg-pata-500" onChange={uploadToClient}/>
{/*                <input type="file" name="file" id="file" multiple accept="public/images/*" className=""  />
*/}            <input className="hidden" id="file-input" type="file" multiple accept="public/images/*" onChange={uploadToClient} />
 
             </label>
            </div>
          )
  		  }
         else {
          return (
                <Image className="min-w-fit mx-auto rounded-lg border-2 border-pata-500"
                  src={createObjectURL}
                  alt="Picture of the matos"
                  width={width}
                  height={height}
                />   
          )
        }

        // return <AddPhotoAlternateOutlinedIcon style={{ color: "#28384f" }} className="max-w-min hover:cursor-pointer hover:bg-pata-500" onClick={() => console.log("mon cul")} />
	  	}
	}
