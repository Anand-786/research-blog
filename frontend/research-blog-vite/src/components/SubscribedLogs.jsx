import React, { useEffect, useState } from 'react'
import LogCards from './LogCards';
import { useOutletContext } from 'react-router-dom';

export default function RandomLogs() {
    const { subscat, setSubscat } = useOutletContext();
  const [myLogsArray, setMyLogsArray] = useState([]);
useEffect(() => {
  const handleRandomLogs = async () => {
    try{
      const response = await fetch(localStorage.getItem('spring-url')+'/user/subscribed-logs',
        {
          method: 'GET',
          headers: 
          {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
          },
        });

      if(response.status === 200){
        const data = await response.json();
        setMyLogsArray(data.body);
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
},[subscat]);
  return (
    <LogCards logs={myLogsArray}/>
  )
}
