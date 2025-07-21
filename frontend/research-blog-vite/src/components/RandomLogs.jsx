import React, { useEffect, useState } from 'react'
import LogCards from './LogCards';

export default function RandomLogs() {
  const [myLogsArray, setMyLogsArray] = useState([]);
useEffect(() => {
  const handleRandomLogs = async () => {
    try{
      const response = await fetch(localStorage.getItem('spring-url')+'/public/random-logs',
        {
          method: 'GET',
          headers: 
          {
            'Content-Type': 'application/json',
          },
        });

      if(response.status === 200){
        const data = await response.json();
        setMyLogsArray(data);
      }
      else{
        console.log("Unable to fetch random logs.")
      }
    }
    catch(error){
      console.log("Error ",error);
    }
  };
  handleRandomLogs();
},[]);
  return (
    <LogCards logs={myLogsArray}/>
  )
}
