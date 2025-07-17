import { useState } from 'react';
import { ThumbsUp, ThumbsDown , Brain} from 'lucide-react';

export default function LogCard({
  title="How I Solved My Research Problem",
  author="Anand Singh",
  date="2025-07-16",
  category="AI Research",
  tags=['Machine Learning', 'Transformer', 'Optimization'],
  status="Open for Feedback",
  body="In this blog, I explain how I tackled model optimization for transformers...",
  imageUrl="https://via.placeholder.com/400x200",
  referenceLinks=[
    'https://openai.com',
    'https://arxiv.org/abs/1234.5678'
  ],
  likes = 0,
  dislikes = 0,
}) {
  const [showReferences, setShowReferences] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [dislikeCount, setDislikeCount] = useState(dislikes);

  return (
    <div className="w-full bg-gray-50 rounded-xs shadow-sm p-6 space-y-3 text-[#2b2d42]">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-semibold">{title}</h2>
          <p className="text-sm text-[#8d99ae]">
            {author} • {new Date(date).toLocaleDateString()}
          </p>
        </div>
      </div>

      <p className="text-md">
        <span className="font-semibold">Category : </span> {category}
      </p>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-[#d90429] text-xs font-normal px-2 py-1 rounded-full text-white"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="text-md">
        <span className="font-semibold">Status: </span> {status}
      </p>

      <div className="text-gray-800 text-sm space-y-2">
        <p>{body}</p>
        {imageUrl && (
          <img
            src="/graph.png"
            alt="Blog Visual"
            className="w-full h-auto rounded-sm"
          />
        )}
      </div>

      <div className="flex justify-between items-center pt-2">
        <button className="px-2 py-1 bg-[#d90429] text-white text-md rounded-sm hover:bg-[#ef233c] flex items-center">
          Get AI Summary <Brain className="h-4 w-4 mr-1 ml-1 mt-1" />
        </button>
        <button
          onClick={() => setShowReferences(!showReferences)}
          className="text-sm text-blue-500 hover:underline"
        >
          {showReferences ? 'Hide References' : 'Show References'}
        </button>
      </div>

      {showReferences && (
        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
          {referenceLinks.map((link, idx) => (
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

      <div className="flex items-center space-x-4 pt-2">
        <button
          onClick={() => setLikeCount(likeCount + 1)}
          className="flex items-center text-[#588157] hover:underline text-md"
        >
          <ThumbsUp className="h-4 w-4 mr-1" />
          {likeCount}
        </button>
        <button
          onClick={() => setDislikeCount(dislikeCount + 1)}
          className="flex items-center text-[#c1121f] hover:underline text-md"
        >
          <ThumbsDown className="h-4 w-4 mr-1" />
          {dislikeCount}
        </button>
      </div>
    </div>
  );
}
