import { useState } from 'react';

export default function UserIcon() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    console.log('Logged out!');
    // Add your logout logic here
    setMenuOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Avatar Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white text-lg font-semibold"
      >
        A
      </button>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md z-10">
          <button
            onClick={() => {
              console.log('Navigate to My Logs');
              setMenuOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            My Logs
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
