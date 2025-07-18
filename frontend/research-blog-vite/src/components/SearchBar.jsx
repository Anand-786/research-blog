import { Search } from 'lucide-react';
import { useState } from 'react';

const categories = [
  'Computer Science - AI/ML',
  'Computer Science - Theoretical',
  'Computer Science - Systems',
  'Electronics/Embedded',
  'Mechanical',
  'Civil',
  'Physics',
  'Biology',
  'Mathematics',
  'Humanities',
];

export default function SearchBar({ onSearch }) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (onSearch) {
      onSearch({ category: selectedCategory, query });
    }
  };

  return (
    <div className="flex items-center rounded-sm overflow-hidden w-full shadow-md">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="px-3 py-2 text-sm outline-none bg-[#2b2d42] text-white items-center"
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
        className="flex items-center px-3 py-2 bg-[#d90429] text-white text-sm hover:bg-[#ef233c] transition"
      >
        <Search className="h-4 w-4 mr-1" />
        Search
      </button>
    </div>
  );
}
