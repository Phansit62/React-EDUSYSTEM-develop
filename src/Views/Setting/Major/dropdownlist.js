import React from 'react'
import { useState, useEffect } from "react";
import { GetFacultysList } from "../../../services/major.service";

export default function Dropdownlist(props) {
 
    const [data, setData] = useState([]);

    useEffect(fetchData);

    async function fetchData() {
        const res = await GetFacultysList()
        setData(res.data);
        // console.log(data.json);
    }
  
    return (
        <>
            <select  onChange={props.getValue} className="form-select" name="facultyCode" aria-label="Default select example">
                <option selected>Open this select menu</option>
                {data.map((value,index) => (
                    <option  value={value.facultyCode}>{value.facultyName}</option>
                ))}
            </select>
        </>
    )

}