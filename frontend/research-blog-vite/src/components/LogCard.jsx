import { useEffect, useState } from 'react';
import { ThumbsUp, ThumbsDown , Brain, Trash2, Edit} from 'lucide-react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import AudioPlayer from './AudioPlayer';

export default function LogCard({
  id,
  title="How I Solved My Research Problem",
  author="Anand Singh",
  date="2025-07-16",
  category="AI Research",
  tags=['Machine Learning', 'Transformer', 'Optimization'],
  status=false,
  mainbody="In this blog, I explain how I tackled model optimization for transformers...",
  imgUrl,
  refs=[
    'https://openai.com',
    'https://arxiv.org/abs/1234.5678'
  ],
  likes = 0,
  dislikes = 0,
  editPermission = false,}) {
  const [showReferences, setShowReferences] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likecount, setLikeCount] = useState(likes);
  const [dislikeCount, setDislikeCount] = useState(dislikes);
  const [aisummary, setAisummary] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const navigate = useNavigate();

  const handleLike = async () => {
    if(!liked){
      const response = await fetch(localStorage.getItem('spring-url')+`/user/like-log/${id}`,{
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
      });

      if(response.status === 200){
        setLiked(!liked);
        setLikeCount(likecount+1);
      }
      else{
        console.log("Could not like log :", response.status);
        navigate('/signin');
      }
    }else{
      const response = await fetch(localStorage.getItem('spring-url')+`/user/unlike-log/${id}`,{
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
      });

      if(response.status === 200){
        setLiked(!liked);
        setLikeCount(likecount-1);
      }
      else{
        console.log("Could not unlike log :", response.status);
        navigate('/signin');
      }
    }
  };

  const handleDisLike = async () => {
    if(!disliked){
      const response = await fetch(localStorage.getItem('spring-url')+`/user/dislike-log/${id}`,{
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
      });

      if(response.status === 200){
        setDisliked(!disliked);
        setDislikeCount(dislikeCount+1);
      }
      else{
        console.log("Could not dislike log :", response.status);
        navigate('/signin');
      }
    }else{
      const response = await fetch(localStorage.getItem('spring-url')+`/user/undislike-log/${id}`,{
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
      });

      if(response.status === 200){
        setDisliked(!disliked);
        setDislikeCount(dislikeCount-1);
      }
      else{
        console.log("Could not undislike log :", response.status);
        navigate('/signin');
      }
    }
  };

  const handleTagClick = async (tag) => {
    navigate(`/search?query=${tag}&category=${category}`);
  };

  const handleAISummary = async () => {
    setLoadingSummary(true);
    const response = await fetch(localStorage.getItem('spring-url')+'/ai-summary/get',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: `Summarize the following. Title : ${title}. ${mainbody}`,
      }),
    });

    if(response.status === 200){
      const data = await response.json();
      setAisummary(data.summary);
      setShowSummary(true);
      setLoadingSummary(false);
    }
    else{
      console.log('error occoured :',response.status);
    }
  };

  const handleEdit = async () => {
    navigate(`/add-log?id=${id}`);
  };

  const handleDelete = async () => {
    try{
      const response = await fetch(localStorage.getItem('spring-url')+`/logs/del-log/${id}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
      });

      if(response.status === 200){
        console.log('Log deleted');
        window.location.href='/my-logs';
      }
      else{
        console.log('Error in deleting',response.status);
      }
    }
    catch(error){
      console.log(error);
    }
  };

  return (
    <div className="w-full bg-gray-50 rounded-xs shadow-sm p-6 space-y-3 text-[#2b2d42]">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-semibold">{title}</h2>
          <p className="text-sm text-[#8d99ae]">
            {author} • {new Date(date).toLocaleDateString()}
          </p>
        </div>
        <AudioPlayer logid={id}/>
      </div>

      <p className="text-md">
        <span className="font-semibold">Category : </span> {category}
      </p>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <button
            onClick={() => handleTagClick(tag)}
            key={index}
            className="bg-[#d90429] text-xs font-normal px-2 py-1 rounded-full text-white hover:cursor-pointer hover:bg-[#EF233C]"
          >
            {tag}
          </button>
        ))}
      </div>

      <p className="text-md">
        <span className="font-semibold">Status: </span> {(status === true)?"Ongoing":"Completed"}
      </p>

      <div className="text-gray-800 text-sm space-y-2">
        <p>- {mainbody}</p>
        {imgUrl && (
          <img
            src={imgUrl}
            alt="Blog Visual"
            className="w-full h-auto rounded-sm"
          />
        )}
      </div>

      <div className="flex justify-between items-center pt-2">
        <button onClick={handleAISummary} 
        className="px-3 py-1 bg-[#2B2D42] text-[#fff9ec] text-md rounded-full hover:bg-[#ef233c] flex items-center hover:cursor-pointer shadow-sm shadow-[#D90429]">
          Summarize with AI <Brain className="h-4 w-4 mr-0 ml-1.5 mt-0.5" />
        </button>
        <button
          onClick={() => setShowReferences(!showReferences)}
          className="text-sm text-blue-500 hover:underline"
        >
          {showReferences ? 'Hide References' : 'Show References'}
        </button>
      </div>

      {loadingSummary && <p className="text-[#8d99ae] mt-2">Fetching summary...</p>}

      {showSummary && (
        <div className="mt-2 p-4 bg-[#f5f3f4] rounded-lg shadow-sm shadow-[#D90429] text-[#2B2D42] italic">
          <p className="font-semibold mb-2 text-md">Facebook/bart-large-cnn :</p>
          <p className='text-md'>{aisummary}</p>
        </div>
      )}

      {showReferences && (
        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
          {refs.map((link, idx) => (
            <li key={idx}>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      )}

      <div className='flex items-center justify-between pt-2'>
        <div className="flex items-center space-x-4 pt-2">
          <button
            onClick={handleLike}
            className="flex items-center text-[#588157] hover:text-green-500 text-lg hover:cursor-pointer"
          >
            <ThumbsUp className="h-5 w-5 mr-1" />
            {likecount}
          </button>
          <button
            onClick={handleDisLike} 
            className="flex items-center text-[#c1121f] hover:text-red-500 text-lg hover:cursor-pointer"
          >
            <ThumbsDown className="h-5 w-5 mr-1" />
            {dislikeCount}
          </button>
        </div>

        {editPermission && (
            <div className="flex items-center space-x-3">
              <button onClick={handleEdit} className="bg-[#669bbc] hover:bg-[#003049] text-md font-normal py-2 px-2 text-[#EDF2F4] hover:cursor-pointer rounded-lg flex items-center shadow-sm">
                Edit<Edit className='h-5 w-5 ml-1'/>
              </button>
              <button onClick={handleDelete} className="bg-[#EF233C] hover:bg-[#D90429] text-md font-normal py-2 px-2 text-[#EDF2F4] hover:cursor-pointer rounded-lg flex items-center shadow-sm">
                Delete<Trash2 className='h-5 w-5 ml-1'/>
              </button>
            </div>
        )}
      </div>
    </div>
  );
}
