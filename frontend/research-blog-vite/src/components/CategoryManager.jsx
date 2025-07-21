import { useState } from 'react';

const allCategories = [
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

export default function CategoryManager() {
  const [subscribed, setSubscribed] = useState([]);
  const [unsubscribed, setUnsubscribed] = useState(allCategories);

  const subscribe = async (category) => {
    console.log(localStorage.getItem('jwt'));
    const response = await fetch(localStorage.getItem('spring-url')+`/user/subscribe/${category}`,{
      method: 'GET',
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    });

    if(response.status === 200){
      setSubscribed([...subscribed, category]);
      setUnsubscribed(unsubscribed.filter((c) => c !== category));
    }
    else{
      console.log("Error in subscribing.");
    }
  };

  const unsubscribe = (category) => {
    setUnsubscribed([...unsubscribed, category]);
    setSubscribed(subscribed.filter((c) => c !== category));
  };

  return (
    <div className="space-y-4 text-[#2b2d42]">
      <div>
        <h3 className="text-md font-semibold mb-2">Subscribed Categories</h3>
        {subscribed.length === 0 ? (
          <p className="text-gray-400 text-sm">No categories subscribed yet.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {subscribed.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => unsubscribe(cat)}
                className="bg-[#d90429] text-white text-xs px-3 py-1 rounded-full hover:bg-[#ef233c] transition"
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="text-md font-semibold mb-2">Available Categories</h3>
        {unsubscribed.length === 0 ? (
          <p className="text-gray-400 text-sm">All categories subscribed.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {unsubscribed.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => subscribe(cat)}
                className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full hover:bg-gray-200 transition"
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
