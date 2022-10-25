import * as React from 'react'
import { useState, useEffect, useRef } from 'react'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

export function ReactTable({data}) {

  /*const [dataMatos, setDataMatos] = useState([]);

  useEffect(() => {
    (async () => {
      const matos = await fetch('/api/matos_2?type=sleepingmat', {headers: {'Content-Type': 'application/json'},method: 'GET'})
      var response = await matos.json();
      setDataMatos(response)
    })()
  }, [])*/

  const Backpack = [
    //"_id",
    "Name",
    //"Owner"
  ]

  const columnHelper = createColumnHelper(Backpack)

  const columns = [
    /*columnHelper.accessor(row => row._id, {
      id: '_id',
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span>ID</span>,
      enableHiding: true
    }),*/
    columnHelper.accessor(row => row.name, {
      id: 'name',
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span>Name</span>,
    }),
    /*columnHelper.accessor(row => row.owner, {
      id: 'owner',
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span>Owner</span>,
    })
*/     
  ]

 

const rerender = React.useReducer(() => ({}), {})[1]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="p-2 mx-auto">
      <p className="whitespace-nowrap text-left text-pata-400 text-xl bg-transparent   ">
        <svg xmlns="http://www.w3.org/2000/svg" className="scale-x-[-1] mr-1 inline-flex align-top feather feather-feather" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#28384f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"  ><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
        My Backpacks
      </p>
      <table className="">
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
