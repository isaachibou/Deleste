import React, { useMemo } from 'react';
import { useState, useEffect, useRef } from 'react'
import { useTable } from 'react-table';
import { COLUMNS } from './columns';

function BasicTable ({ }) {
  const [dataMatos, setDataMatos] = useState([]);

  useEffect(() => {
    (async () => {
      const matos = await fetch('/api/matos_2?type=sleepingmat', {headers: {'Content-Type': 'application/json'},method: 'GET'})
      var response = await matos.json();
      setDataMatos(response)
      console.log(response)
    })()
  }, [])

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => dataMatos, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  });

  return (
    <div className="table-container">
      <h2>Basic Table</h2>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        {/*<tfoot>
          {footerGroups.map(footerGroup => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map(column => (
                <td {...column.getFooterProps()}>{column.render('Footer')} </td>
              ))}
            </tr>
          ))}
        </tfoot>*/}
      </table>
    </div>
  );
} 

export default BasicTable;

