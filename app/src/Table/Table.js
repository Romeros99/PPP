import React from 'react';
import './Table.css';

const Table = ({theadData, tbodyData}) => {
  return (
    <table>
      <thead>
        <tr>
          {theadData.map(heading => {
           return <th key={heading}>{heading}</th>
          })}
        </tr>
      </thead>
      <tbody>
        {tbodyData.map((row, index) => {
          return <tr key={index} onClick={() => console.log({index})}>
            {theadData.map((key, index) => {
              return <td key={row[key]}>{row[key]}</td>
            })}
          </tr>;
        })}
      </tbody>
    </table>
  )    
}

export default Table;