import React, { useState } from "react";
import { Sparkles, Brain, Bot} from 'lucide-react';

const QnASection = ({logid}) => {
  const [qnaList, setQnaList] = useState([
    { question: "", answer: "", isSubmitted: false }
  ]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (index, value) => {
    const updated = [...qnaList];
    updated[index].question = value;
    setQnaList(updated);
  };

  const handleSubmit = async (index) => {
    setLoading(true);
    const updated = [...qnaList];
    const question = updated[index].question;

    const response = await fetch(localStorage.getItem('spring-url')+'/ai-qna/ask',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: logid,
        ques: question,
      }),
    });
    const data = await response.json();
    const Answer = data.answer;

    updated[index].answer = Answer;
    updated[index].isSubmitted = true;
    updated.push({ question: "", answer: "", isSubmitted: false });
    setQnaList(updated);
    setLoading(false);
  };

  return (
    <div className="p-4 mt-4 rounded-sm bg-gray-50 border border-gray-200 shadow-xs shadow-gray-400">
      <h3 className="text-lg font-semibold mb-1">Ask Follow-up Questions Below</h3>
      <p className="text-sm text-gray-500 mb-5">Powered by Google Gemini QnA</p>

      {qnaList.map((item, index) => (
        <div key={index} className="mb-4">
          {item.isSubmitted ? (
            <div className="bg-white p-4 rounded-sm shadow-xs shadow-[#ff686b]">
              <p className="text-gray-700 font-semibold">Ques: {item.question}</p>
              <p className="text-gray-700 mt-2 font-normal">Ans: {item.answer}</p>
            </div>
          ) : (
            <div className="flex gap-2 items-start">
              <input
                type="text"
                value={item.question}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="flex-1 p-2 rounded-sm shadow-xs shadow-gray-400"
                placeholder="Ask your question..."
              />
              <button
                onClick={() => handleSubmit(index)}
                className="bg-[#D90429] hover:bg-[#EF233C] text-[#fff9ec] px-4 py-2 rounded-sm hover:cursor-pointer flex items-center shadow-xs shadow-red-900"
              >
                {loading?'...':'Ask Question'}
                {!loading && (<Sparkles className="h-4 w-4 ml-1" />)}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default QnASection;
