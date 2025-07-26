import { Headphones} from 'lucide-react'
import React, { useEffect, useState } from 'react'

function WebSpeech({logid}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [voices, setVoices] = useState([]);
    const [text, setText] = useState("This is a test.");

    useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    const fetchLog = async () => {
        const response = await fetch(localStorage.getItem('spring-url')+`/public/fetch-log/${logid}`,{
            method: 'GET',
            headers: {'Content-Type': 'application/json',},
        });

        if(response.status === 200){
            const data = await response.json();
            setText(`This is a log titled, ${data.title}, by author, ${data.author}.It belongs to category of ${data.category}. The log goes as follows. ${data.mainbody}`);
        }
        else{
            console.log("error :",response.status);
        }
    };
    fetchLog();
  }, []);
    const handleFetchAudio = (text) => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.90;
        utterance.pitch = 1;
        utterance.volume = 1;
        const preferredVoice = voices.find(voice => 
        voice.name.includes('Google UK English Female') || 
        voice.name.includes('Google') && voice.lang === 'en-GB'
        ) || voices.find(voice => voice.lang.startsWith('en-GB'))
        || voices.find(voice => voice.lang.startsWith('en'));
        
        if (preferredVoice) {
        utterance.voice = preferredVoice;
        }

        utterance.onstart = () => setIsPlaying(true);
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);
        window.speechSynthesis.speak(utterance);
    };
  return (
    <div className="mt-4">
        <button
            disabled={isPlaying}
          onClick={() => handleFetchAudio(text)}
          className="flex items-center bg-[#edf2f4] hover:bg-gray-200 hover:cursor-pointer text-gray-800 px-3 py-2 rounded-lg"
        >
          <Headphones className="h-5 w-5 mr-2" />
          Listen
        </button>
    </div>
  )
}

export default WebSpeech