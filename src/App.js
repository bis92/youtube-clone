import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import VideoItems from './components/VideoItems/VideoItems';
// import path from 'path';

function App() {
  const youtubeAPIkey = process.env.REACT_APP_KEY;
  const [videos, setVideos] = useState([]);

  const getHotVideos = async () => {
    await fetch('data/hotVideos.json')
    // await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=${youtubeAPIkey}`)
      .then(res => res.json())
      .then((data) => setVideos(data.items))
      .catch((err) => {
        console.log('get hot videos err: ', err);
      })
  }

  useEffect(() => {
    getHotVideos();
  }, []);

  return (
    <div className="App">
      <Header/>
      <VideoItems
        videoItems={videos}
      />
    </div>
  );
}

export default App;
