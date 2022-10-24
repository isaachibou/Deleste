import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import Divider from '@mui/material/Divider';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

export function ReactTable({bpName, setBpName, refresh}) {

  const [dataMatos, setDataMatos] = useState([]);

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
    "Weight (Metric)",
    "Color",
  ]

  const defaultData = [
    {
      Type: 'tanner',
      Model: 'linsley',
      "Weight (Metric)": 24,
      Color: 100
    },
    {
      Type: 'tandy',
      Model: 'miller',
      "Weight (Metric)": 40,
      Color: 40
    },
    {
      Type: 'joe',
      Model: 'dirte',
      "Weight (Metric)": 45,
      Color: 20
    },
  ]

  const columnHelper = createColumnHelper(Matos)

  const columns = [
    columnHelper.accessor(row => row.Type, {
      id: 'Type',
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span>Type</span>,
    }),
    columnHelper.accessor(row => row.Model, {
      id: 'Model',
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span>Model</span>,
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
     
  ]

  /*const [data, setData] = React.useState(() => [...defaultData])*/
const rerender = React.useReducer(() => ({}), {})[1]
  let data = dataMatos 
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="p-2">
      <div className="flex flex-row">
        <svg xmlns="http://www.w3.org/2000/svg" className="scale-x-[-1] inline-flex align-baseline feather feather-feather" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#28384f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"  ><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
        <input name="EquipmentName" className="min-w-max ml-1 whitespace-nowrap w-52 text-left text-pata-400 text-xl bg-transparent  placeholder:text-pata-400" value={bpName} /* onChange={handleChange}*/ type="text" placeholder="Your equipment name here ..."/>
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
