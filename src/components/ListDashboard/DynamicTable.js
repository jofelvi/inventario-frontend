import React from 'react';

const DynamicTable = ({ headers, data }) => {
  return (
    <div className="overflow-x-auto h-40">
      <label>Titulo Tabla</label>
      <table className="table table-xs table-pin-cols">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(row).map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default DynamicTable;