import * as React from 'react'
import { useTable } from 'react-table'

export default function Table({ columns, data, updateMyData }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
    // updateMyData isn't part of the API, but
  	// anything we put into these options will
  	// automatically be available on the instance.
  	// That way we can call this function from our
  	// cell renderer!
  	updateMyData,
  })

  // Render the UI for your table
  return (
    <table className="mx-auto" {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr className="whitespace-nowrap" {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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
                return <td className="min-w-full whitespace-nowrap px-2" {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}