import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import VideoItems from './components/VideoItems/VideoItems';
// import path from 'path';

function App() {
  const youtubeAPIkey = process.env.REACT_APP_KEY;
  const [videos, setVideos] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchVideos = async (inputValue) => {
    setSearchValue(inputValue);
    console.log(searchValue, inputValue);
  }

  const getHotVideos = async (searchItem) => {
    let url;
    if(searchItem){
      url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&maxResults=25&q=${searchItem}&key=${youtubeAPIkey}`
    } else {
      url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=${youtubeAPIkey}`
    }
    await fetch(url)
      .then(res => res.json())
      .then((data) => setVideos(data.items))
      .catch((err) => {
        console.log('get hot videos err: ', err);
      })
  }

  const initVideos = async () => {
    getHotVideos();
  }

  useEffect(() => {
    getHotVideos();
  }, []);

  useEffect(() => {
    getHotVideos(searchValue);
  }, [searchValue])

  return (
    <div className="App">
      <Header
        handleSearchVideos={handleSearchVideos}
        initVideos={initVideos}
      />
      <VideoItems
        videoItems={videos}
      />
    </div>
  );
}

export default App;
