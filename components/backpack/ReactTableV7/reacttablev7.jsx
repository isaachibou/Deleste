import * as React from 'react'
import { useTable } from 'react-table'



export default function Table({ columns, data, updateMyData }) {
  
  console.log("data", data)
  // Use the state and functions returned from useTable to build your UI  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    //defaultColumn,
    data,
    initialState: {
        hiddenColumns: columns.map(column => {
            if (column.show === false) return column.accessor || column.id;
        }),
    },
    // updateMyData isn't part of the API, but
  	// anything we put into these options will
  	// automatically be available on the instance.
  	// That way we can call this function from our
  	// cell renderer!
  	updateMyData,
  })

  // Render the UI for your table
  return (
    <table className="text-pata-400 my-3 " {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr className=" whitespace-nowrap text-center " {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th className="py-2 font-semibold underline-offset-3 " {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}

      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td className="min-w-fit whitespace-nowrap px-2" {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}