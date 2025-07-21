import { useState } from 'react';
import {useNavigate} from 'react-router-dom';

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

const statuses = [
    'Ongoing',
    'Completed',
];


export default function LogForm() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState('');
  const [body, setBody] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [references, setReferences] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const isValid = title.trim() !== '' && category.trim() !== '' && status.trim() !== '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    const formData = {
      title: title,
      category: category,
      tags: tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      status: (status === "Ongoing")?true:false,
      mainbody: body,
      imgUrl: imageUrl,
      refs: references.split(',').map((link) => link.trim()).filter(Boolean),
    };
    try{
      const response = await fetch(localStorage.getItem('spring-url')+'/logs/create-log',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify(formData),
      });

      if(response.status === 201){
        setShowModal(true);
      }else{
        console.log("Error creating log :",response.status);
      }
    }catch(error){
      console.log(error);
    }
  };

  const handleModalClose = (e) => {
    e.preventDefault();
    setShowModal(false);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full p-5 rounded-sm shadow-sm">
        <div className='flex items-center justify-center text-2xl font-semibold'>
            Add Log Data
        </div>
      <div>
        <label className="block text-md font-semibold">Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-sm px-2 py-2 text-md"
          required
        />
      </div>

      <div>
        <label className="block text-md font-semibold">Category *</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded-sm px-2 py-2 text-md"
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-md font-semibold">Tags (comma-separated)</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full border rounded-sm px-2 py-2 text-md"
        />
      </div>

      <div>
        <label className="block text-md font-semibold">Status *</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border rounded-sm px-2 py-2 text-md"
          required
        >
          <option value="">Select status</option>
          {statuses.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-md font-semibold">Body</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full border rounded-sm px-2 py-2 text-md"
          rows="4"
        />
      </div>

      <div>
        <label className="block text-md font-semibold">Image URL  
            <p className='text-gray-400'>(should be public)</p></label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full border rounded-sm px-2 py-2 text-md"
        />
      </div>

      <div>
        <label className="block text-md font-semibold">Reference Links (comma-separated)</label>
        <input
          type="text"
          value={references}
          onChange={(e) => setReferences(e.target.value)}
          className="w-full border rounded-sm px-2 py-2 text-md"
        />
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className={`w-full py-2 rounded-sm text-white text-md ${
          isValid ? 'bg-[#D90429] hover:bg-[#EF233C]' : 'bg-[#8D99AE] cursor-not-allowed'
        }`}
      >
        Submit
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-[#EDF2F4] px-8 py-4 rounded-sm text-center space-y-5">
            <p className="text-[#2b2d42] font-semibold text-md">Log Created.</p>
            <button
              onClick={handleModalClose}
              className="px-4 py-1 bg-[#D90429] text-white rounded-sm hover:bg-[#EF233C] text-md hover:cursor-pointer"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
