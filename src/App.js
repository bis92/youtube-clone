import React, { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Link
} from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import VideoDetail from './components/videoDetail/VideoDetail';
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
      // url = './data/hotVideos.json'
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


  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className='App'>
          <Header
            handleSearchVideos={handleSearchVideos}
            initVideos={initVideos}
          />
          <VideoItems
            videoItems={videos}
          />
        </div>
      )
    },
    {
      path: "/video/:videoId",
      element: (
        <div className='App'>
          <Header
            initVideos={initVideos}
            handleSearchVideos={handleSearchVideos}
            videoDetail
          />
          <VideoDetail 
            videoItems={videos}
          />
        </div>
      )
    }
  ])

  return (
    <RouterProvider
      router={router}
    >
    </RouterProvider>
  );
}

export default App;
