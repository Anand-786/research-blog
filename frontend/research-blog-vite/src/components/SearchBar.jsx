import { Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  'ComputerScience-AI-ML',
  'ComputerScience-Theoretical',
  'ComputerScience-Systems',
  'Electronics',
  'Mechanical',
  'Civil',
  'Physics',
  'Biology',
  'Mathematics',
  'Humanities',
];

export default function SearchBar() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [query, setQuery] = useState('');
  const [searchLogs, setSearchLogs] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (e) =>{
    e.preventDefault();
    navigate(`/search?query=${query}&category=${selectedCategory}`);
  };

  return (
    <div className="flex items-center rounded-sm overflow-hidden w-full shadow-md">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="px-3 py-2 text-sm outline-none bg-[#8D99AE] text-white items-center hover:cursor-pointer"
      >
        {categories.map((cat, idx) => (
          <option key={idx} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="flex-1 px-4 py-2 text-sm outline-none"
      />

      <button
        onClick={handleSearch}
        className="flex items-center px-3 py-2 bg-[#d90429] text-white text-sm hover:bg-[#ef233c] transition hover:cursor-pointer"
      >
        <Search className="h-4 w-4 mr-1" />
        Search
      </button>
    </div>
  );
}
