import { Headphones, Pause, Play } from 'lucide-react';
import React, { useRef, useState } from 'react'

function AudioPlayer({logid}) {
    const [showListenButton, setShowListenButton] = useState(true);
    const [audioUrl, setAudioUrl] = useState(null);
    const [audioBlob, setAUdioBlob] = useState(null);
    const audioRef = useRef(null);

    const handleFetchAudio = async () => {
        try{
            const response = await fetch(localStorage.getItem('spring-url')+`/ai-voice/get/${logid}`,{
                method: 'GET',
            });

            if(response.status === 200){
                const data = await response.arrayBuffer();
                const blob = new Blob([data], {'type': 'audio/mpeg'});
                const url = URL.createObjectURL(blob);
                setAUdioBlob(blob);
                setAudioUrl(url);
                setShowListenButton(false);
            }
            else{
                console.log("Error in fecthing audio :",response.status);
            }
        }catch(error){
            console.log(error);
        }
    };

    const handlePlay = () => {
        audioRef.current.play();
    };

    const handlePause = () => {
        audioRef.current.pause();
    };

  return (
    <div className="mt-4">
      {showListenButton && (
        <button
          onClick={handleFetchAudio}
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
        >
          <Headphones className="h-5 w-5 mr-2" />
          Listen to Log
        </button>
      )}

      {!showListenButton && (
        <div className="flex items-center space-x-4 mt-2">
          <audio ref={audioRef} src={audioUrl} />
          <button
            onClick={handlePlay}
            className="flex items-center bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
          >
            <Play className="h-5 w-5 mr-1" />
            Play
          </button>
          <button
            onClick={handlePause}
            className="flex items-center bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
          >
            <Pause className="h-5 w-5 mr-1" />
            Pause
          </button>
        </div>
      )}
    </div>
  )
}

export default AudioPlayer