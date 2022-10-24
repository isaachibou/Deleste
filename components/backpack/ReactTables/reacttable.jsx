import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import Divider from '@mui/material/Divider';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

export function ReactTable(props/*{parentData, bpName, models, setBpName, refresh}*/) {

  console.log("models", props.models)
  console.log("parentData", props.parentData)

  const [dataMatos, setDataMatos] = useState([props.parentData]);
  const [typeOption, setTypeOption] = useState("backpack");
  console.log("typeOption", typeOption)

  useEffect(() => {
    (async () => {
      const matos = await fetch('/api/matos_2?type=sleepingmat', {headers: {'Content-Type': 'application/json'},method: 'GET'})
      var response = await matos.json();
      setDataMatos(response)
    })()
  }, [])

  const Matos = [
    "Type",
    "Model",
    "Quantity",
    "Weight (Metric)",
    "Color",
    "Test"
  ]

  const columnHelper = createColumnHelper(Matos)

  const typeOptions = [
    {
      label: "Backpack",
      value: "backpack",
    },
    {
      label: "Bag",
      value: "sleepingbag",
    },
    {
      label: "Pad",
      value: "sleepingmat",
    },
    {
      label: "Pillows",
      value: "pillow",
    },
    {
      label: "Custom",
      value: "custom",
    }
  ];
/*
  function handleTypeChange(event) {
    console.log("its a change ! ", event.target.value)
    console.log("test ", event.target)

  }
*/
  const columns = [
    columnHelper.accessor(row => row.Type, {
      id: 'Type',
      cell: info => //<i>{info.row.index}</i>,
      <select name="types" id="rowTypes" className="basis-1/6 bg-transparent hover:bg-pata-500" value={info.getValue()}/* onChange={handleTypeChange}*/>
        {typeOptions?.map((option) => (
          <option key={info.row.index} value={option.value}>{option.label}</option>
        ))}
      </select>,
      header: () => <span>Type</span>,
    }),
    columnHelper.accessor(row => row.Model, {
      id: 'Model',
      cell: info => 
      <select name="rows" id="rowsFetched" className="basis-3/6 bg-transparent hover:bg-pata-500" value={info.getValue()} /*onChange={(event) => (setModelOption(event.target.value))}*/>
        {props.models[info.row.getValue("Type")]?.map((option) => (
        <option key={info.row.index} value={option.Model}> {option.Model} - {option.Size}</option>
        ))}

      </select>,
      header: () => <span>Model</span>,
    }),
    columnHelper.accessor(row => row.quantity, {
      id: 'Quantity',
      cell: info => 1,
      header: () => <span>Qty</span>,
    }),
    columnHelper.accessor(row => row["Weight (Metric)"], {
      id: 'Weight (Metric)',
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span>Weight (g)</span>,
    }),
    columnHelper.accessor(row => row.Color, {
      id: 'Color',
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span>Color</span>,
    }),
    columnHelper.accessor(row => row.Model, {
      id: 'Test',
      cell: info => <i>{info.row.getValue("Type")}</i>,
      header: () => <span>Test</span>,
    }),
     
  ]

  /*const [data, setData] = React.useState(() => [...defaultData])*/
const rerender = React.useReducer(() => ({}), {})[1]
  let data = props.parentData 
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="p-2">
      <div className="flex flex-row">
        <svg xmlns="http://www.w3.org/2000/svg" className="scale-x-[-1] inline-flex align-baseline feather feather-feather" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#28384f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"  ><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
        <input name="EquipmentName" className="min-w-max ml-1 whitespace-nowrap w-52 text-left text-pata-400 text-xl bg-transparent  placeholder:text-pata-400" value={props.bpName} /* onChange={handleChange}*/ type="text" placeholder="Your equipment name here ..."/>
      </div>
       <Divider />
      <table className="mx-auto">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-4" />
      <button onClick={() => rerender()} className="border p-2">
        Rerender
      </button>
    </div>
  )
}

export default ReactTable;
