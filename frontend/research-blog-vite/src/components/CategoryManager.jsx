import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const allCategories = [
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

export default function CategoryManager({isLoggedIn}) {
  const [subscribed, setSubscribed] = useState([]);
  const [unsubscribed, setUnsubscribed] = useState(allCategories);
  const navigate = useNavigate();
  useEffect(() => {
    const getsubs = async () =>{
      const resp = await fetch(localStorage.getItem('spring-url')+'/user/subscribed-categories',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
      });

      if(resp.status === 200){
        const data = await resp.json();
        console.log(data);
        setSubscribed(data.body);
        const notsubs = allCategories.filter((cat) => !data.body.includes(cat));
        setUnsubscribed(notsubs);
      }
      else{
        console.log("Error in loading subs :", resp.status);
        setSubscribed([]);
        setUnsubscribed(allCategories);
      }
    };
    getsubs();
  },[isLoggedIn]);

  const subscribe = async (category) => {
    const response = await fetch(localStorage.getItem('spring-url')+`/user/subscribe/${category}`,{
      method: 'GET',
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    });

    if(response.status === 201){
      setSubscribed([...subscribed, category]);
      setUnsubscribed(unsubscribed.filter((c) => c !== category));
    }
    else{
      console.log("Error in subscribing.",response.status);
      navigate('/signin');
    }
  };

  const unsubscribe = async (category) => {
    const response = await fetch(localStorage.getItem('spring-url')+`/user/unsubscribe/${category}`,{
      method: 'GET',
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    });

    if(response.status === 200){
      setUnsubscribed([...unsubscribed, category]);
      setSubscribed(subscribed.filter((c) => c !== category));
    }
    else{
      console.log("Error in unsubscribing.",response.status);
      navigate('/signin');
    }
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
                className="bg-[#d90429] text-white text-xs px-3 py-1 rounded-full hover:bg-[#ef233c] transition hover:cursor-pointer"
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
                className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full hover:bg-gray-200 transition hover:cursor-pointer"
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
