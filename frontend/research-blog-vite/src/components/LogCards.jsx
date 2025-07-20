import React from 'react'
import LogCard from './LogCard'

function LogCards({logs = []}) {
    if(logs.length === 0){
        return (<p className='text-normal text-black'>No logs found.</p>)
    }
  return (
    <div className='space-y-10'>
        {logs.map((log,idx) => (
            <LogCard key={idx} {...log}/>
        ))}
    </div>
  )
}

export default LogCards