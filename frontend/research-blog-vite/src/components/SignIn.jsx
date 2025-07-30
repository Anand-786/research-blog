import { useEffect, useState } from 'react';
import {useOutletContext, useNavigate, NavLink} from 'react-router-dom';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const {setIsLoggedIn, setName} = useOutletContext();

  const isValid = username.trim() !== '' && password.trim() !== '';

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    // JWT token

    try{
      const response = await fetch(localStorage.getItem('spring-url')+'/public/login',
        {
          method: 'POST',
          headers: 
          {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {
              userName: username,
              password: password,
            }
          ),
        }
      );

      if(response.status === 201){
        const jwtToken = await response.text();
        localStorage.setItem('jwt',jwtToken);
        setIsLoggedIn(true);
        setName(username);
        localStorage.setItem('name',username);

        setUsername('');
        setPassword('');

        navigate('/signedin');
      }
      else{
        console.log("Login failed with status : ", response.status);
        setShowError(true);
      }
    }catch(error){
      console.log("Error caught :",error);
    }
  };

  return (
    <div className='flex justify-center items-center'>
    <form onSubmit={handleSignIn} className="space-y-6 w-full max-w-md p-8 rounded-sm shadow-xl">
        <p className='flex justify-center text-2xl font-semibold text-black'>Enter Details to Sign In</p>
      <div>
        <label className="block text-md font-semibold">Username *</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border rounded-sm px-3 py-2 text-md"
          required 
        />
      </div>

      <div>
        <label className="block text-md font-semibold">Password *</label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            WebkitTextSecurity: 'disc',
            textSecurity: 'disc'
          }}
          className="w-full border rounded-sm px-3 py-2 text-md"
          required 
        />
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className={`w-full py-2 rounded-sm text-white text-md ${
          isValid ? 'bg-[#D90429] hover:bg-[#EF233C] hover:cursor-pointer' : 'bg-[#8D99AE] cursor-not-allowed'
        }`}
      >
        Sign In
      </button>

      {showError && (
        <p className="text-[#EF233C] text-md text-center">User not found.</p>
      )}

      <p className="text-md text-center">
        Don't have an account?{' '}
        <NavLink to="/signup" className="text-blue-500 hover:underline">
          Sign Up
        </NavLink>
      </p>
    </form>
    </div>
  );
}