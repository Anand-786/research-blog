import React, { use, useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import LogCard from './components/LogCard'
import CategoryManager from './components/CategoryManager'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Layout() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [name, setName] = useState("");
    const [subscat,setSubscat] = useState([]);
    localStorage.setItem('spring-url','http://localhost:8080');

    useEffect(() => {
    const token = localStorage.getItem('jwt');
    setIsLoggedIn(!!token);
  },[]);

  return (
    <>
        <div className='w-full bg-[#FAF9F6] flex flex-col space-y-4'>
            <div>
                <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} uname={name} />
            </div>
            <div className='pt-20 px-72 flex justify-center items-center'>
                <SearchBar />
            </div>
                
            <div className="flex w-full pt-4 px-52">
                <div className="w-3/4 pr-20 border-r border-gray-200">
                    <Outlet context={{isLoggedIn, setIsLoggedIn, setName, subscat, setSubscat}} />
                </div>
                <div className="w-1/4 pl-20">
                <p className="text-gray-500">
                    <CategoryManager isLoggedIn={isLoggedIn} subscat={subscat} setSubscat={setSubscat} />
                </p>
                </div>
            </div>
        </div>
    </>
  )
}

export default Layout