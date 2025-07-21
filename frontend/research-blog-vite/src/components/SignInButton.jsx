import { LogIn } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

function SignInButton() {
  return (
    <NavLink to="/signin">
        <button className="flex items-center px-3 py-2 rounded-sm bg-[#edf2f4] hover:bg-gray-200 transition font-normal text-gray-700 hover:text-gray-900 hover:cursor-pointer">
            <LogIn className="h-4 w-4 mr-1 ml-1 mt-1 mb-1" /> Sign In 
        </button>
    </NavLink>
  )
}

export default SignInButton