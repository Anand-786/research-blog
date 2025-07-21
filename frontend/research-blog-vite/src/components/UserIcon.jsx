import { LucideUserCircle, Settings, UserCircle, UserCircle2, UserCircle2Icon, UserCircleIcon } from 'lucide-react';
import { use, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserIcon({firstLetter = "A", setIsLoggedIn}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logged out!');
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setMenuOpen(false);
    navigate('/')
  };

  const handleMyLogs = () => {
    console.log('Going to my logs!');
    navigate('/my-logs');
    setMenuOpen(false);
  };

  return (
    <div className="pl-4 pr-2 relative inline-block text-left">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-[#D90429] text-white text-lg font-semibold hover:cursor-pointer hover:bg-[#EF233C]"
      >
        <Settings className='w-5 h-5'/>
      </button>

      {menuOpen && (
        <div className="absolute right-2 mt-2 w-32 bg-white rounded-sm shadow-md z-10">
          <button
            onClick={handleMyLogs}
            className="w-full text-left px-6 py-2 text-normal hover:bg-gray-100 hover:cursor-pointer"
          >
            My Logs
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left px-6 py-2 text-normal hover:bg-gray-100 hover:cursor-pointer"
          >
            Signout
          </button>
        </div>
      )}
    </div>
  );
}
