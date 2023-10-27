import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import {DownloadIcon} from "@heroicons/react/solid";

const ExportCSV = ({headers, data, nameFile}) => {

    return (
              <CSVLink
                headers={headers}
                data={data}
                filename={nameFile}
                style={{ textDecoration: 'none', color: '#fff' }}
                className="btn btn-primary"
              >
                Descargar <DownloadIcon className="w-5 h-5 mr-2 inline-block" />

              </CSVLink>
    );
}

export default ExportCSV;