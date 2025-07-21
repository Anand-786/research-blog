import React, { useEffect, useState } from 'react'
import LogCards from './LogCards';
import { useOutletContext, useSearchParams } from 'react-router-dom';

export default function SearchLogs() {
    const [searchParams] = useSearchParams();
    const [searchLogs, setSearchLogs] = useState();

    useEffect(() => {
      const fetchSearch = async () =>{
        try{
          const query = searchParams.get('query');
          const category = searchParams.get('category');
          console.log(query);
          console.log(category);
          const response = await fetch(localStorage.getItem('spring-url')+`/public/search/${category}`,{
            method: 'POST',
            headers: {
              'Content-Type':'application/json',
            },
            body: JSON.stringify({
              text: query, 
            }),
          });

          if(response.status === 200){
            const data = await response.json();
            setSearchLogs(data);
          }
          else{
            console.log("error in searching tags!");
          }
        }catch(error){
          console.log(error);
        }
    }
    fetchSearch();
  });

  return (
    <LogCards logs={searchLogs}/>
  )
}
