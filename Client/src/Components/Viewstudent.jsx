// import React from 'react'

import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import React from 'react';
import { Bar } from 'react-chartjs-2';
import BarChart from "./BarChart";

const Viewstudent = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { students, courseid} = state || {};
  console.log(students);
  console.log(courseid);
  const [marks, setMarks] = useState();

  useEffect(()=>{
    const fetchMarks = async()=>{
      console.log(courseid, "inside fetch");
      const response = await axios.post('http://localhost:3003/getsinglemarks', {usn:students.usn, courseid});
      console.log(response.data, "response view student");
      setMarks(response.data);
    }
    fetchMarks();
  },[])

  return (
    <>
    <h3>View Student</h3>
    <h2>{students?.usn}</h2>
    <BarChart marks={marks}/>
    </>
  )
}

export default Viewstudent