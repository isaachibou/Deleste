import * as React from 'react'
import { useState, useEffect, useRef } from 'react'

export default function EditableCell({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData, // This is a custom function that we supplied to our table instance
    size 
  })  
  {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue)

  const onChange = e => {
    setValue(e.target.value)
  }

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value)
  }

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return <input className= {"max-w-["+size+"px] block bg-transparent hover:bg-pata-500 cursor-pointer"} value={value} onChange={onChange} onBlur={onBlur} />
}  

  