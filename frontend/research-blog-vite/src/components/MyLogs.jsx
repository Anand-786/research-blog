import React, { useEffect, useState } from 'react'
import LogCards from './LogCards';
import { useNavigate } from 'react-router-dom';

export default function RandomLogs() {
  const [myLogsArray, setMyLogsArray] = useState([]);
  const navigate = useNavigate();
useEffect(() => {
  const handleMyLogs = async () => {
    try{
      const response = await fetch(localStorage.getItem('spring-url')+'/user/my-logs',
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
        console.log("Unable to fetch my logs.");
        navigate('/');
      }
    }
    catch(error){
      console.log("Error ",error);
    }
  };
  handleMyLogs();
},[]);
  return (
    <LogCards logs={myLogsArray} editPermission={true}/>
  )
}
