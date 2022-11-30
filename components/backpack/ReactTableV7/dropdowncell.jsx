import * as React from 'react'
import { useState, useEffect, useRef } from 'react'

export default function DropdownCell({
    value: initialValue,
    options: options,
    row: { index },
    column: { id },
    display,
    updateMyData,
    }) {
      // We need to keep and update the state of the cell normally
      const [value, setValue] = React.useState(initialValue)

      const onChange = e => {
        console.log("onChange from dropdowncell ", value)
        setValue(e.target.value)
      }

      const didMountRef = useRef(false);

      useEffect(() => {

        // Are we on he initial render? No! Let's run some code:
        if ( didMountRef.current ) { 
                          updateMyData(index, id, value)

        } else {
          didMountRef.current = true;
        }    

      }, [value]);

     
      // If the initialValue is changed external, sync it up with our state
      React.useLayoutEffect(() => {
        setValue(initialValue)
      }, [initialValue])

      return (
        <select className="min-w-full basis-1/6 bg-transparent hover:bg-pata-500" value={value} onChange={onChange}>
          {options?.map((option,i) => (
              <option key={"dd"+i} value={option.value}>{option.label?option.label:option.Model}</option>
          ))}
        </select>
      )

    }