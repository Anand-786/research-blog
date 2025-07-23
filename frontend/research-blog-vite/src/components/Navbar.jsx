import { LogIn, PlusIcon } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import UserIcon from './UserIcon';
import { useEffect, useState } from 'react';
import SignInButton from './SignInButton';

export default function Navbar({isLoggedIn , setIsLoggedIn, uname}) {

  return (
    <nav className="w-full h-14 flex items-center justify-between px-8 shadow-sm bg-[#edf2f4] fixed top-0 left-0">
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
         <NavLink to={isLoggedIn?'/signedin':'/'} style={{ color: '#2b2d42' ,
            fontFamily: 'Raleway, sans-serif'
         }} className="font-semibold text-2xl no-underline">
            ResearchLog
         </NavLink>
      </div>

      <div className="flex-1"></div>

      <div className="flex space-x-2">
        <NavLink to={isLoggedIn?`/add-log?id=${null}`:"/signin"}>
          <button className="flex items-center px-3 py-2 rounded-sm bg-[#edf2f4] hover:bg-gray-200 transition font-normal text-gray-700 hover:text-gray-900 hover:cursor-pointer">
            <PlusIcon className="h-4 w-4 mr-1 ml-1 mt-1 mb-1" /> Add New Log
          </button>
        </NavLink>
        <div>
          {isLoggedIn && (
            <div className='flex items-center px-3 py-2 rounded-sm bg-[#edf2f4] text-gray-700 font-semibold'>Hi {localStorage.getItem('name')}!</div>
          )}
        </div>
        {isLoggedIn? <UserIcon setIsLoggedIn={setIsLoggedIn} />: <SignInButton />}
      </div>
    </nav>
  );
}

