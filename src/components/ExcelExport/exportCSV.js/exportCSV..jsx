import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import axios from "axios";

const ExportCSV = (props) => {
    const fileName = "users-detail";
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);

    const headers = [
        { label: "Id", key: "id" },
        { label: "Name", key: "name" },
        { label: "Email", key: "email" },
        { label: "Phone", key: "phone" }
    ];

    return (
        <div className='container'>
            <button
                color="primary"
                className='export-btn'
            >
                <CSVLink
                    headers={props.headers}
                    data={props.dataExcel}
                    filename={props.fileName}
                    style={{ "textDecoration": "none", "color": "#fff" }}
                />

            </button>

        </div>
    );
}

export default ExportCSV;