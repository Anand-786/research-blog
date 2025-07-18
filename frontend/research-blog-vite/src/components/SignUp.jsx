import { useState } from 'react';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showMismatchError, setShowMismatchError] = useState(false);

  const isValid =
    username.trim() !== '' &&
    password.trim() !== '' &&
    confirmPassword.trim() !== '';

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!isValid) return;
    if (password !== confirmPassword) {
      setShowMismatchError(true);
    } else {
      setShowMismatchError(false);
      // Proceed with signup logic here
    }
  };

  return (
    <div className='flex justify-center items-center'>
    <form onSubmit={handleSignUp} className="space-y-6 w-full max-w-md p-8 rounded-sm shadow-xl">
        <p className='flex justify-center text-2xl font-semibold text-black'>Sign Up</p>
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
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-sm px-3 py-2 text-md"
          required
        />
      </div>

      <div>
        <label className="block text-md font-semibold">Confirm Password *</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border rounded-sm px-3 py-2 text-md"
          required
        />
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className={`w-full py-2 rounded-sm text-white text-md ${
          isValid ? 'bg-[#D90429] hover:bg-[#EF233C]' : 'bg-[#8D99AE] cursor-not-allowed'
        }`}
      >
        Sign Up
      </button>

      {showMismatchError && (
        <p className="text-[#EF233C] text-md text-center">Passwords do not match.</p>
      )}
    </form>
    </div>
  );
}
