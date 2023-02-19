import React, { useEffect, useState } from 'react';
import { useParams  } from 'react-router-dom';
import VideoItems from '../VideoItems/VideoItems';
import styles from './VideoDetail.module.css';

export default function VideoDetail() {
    const params = useParams();
    const youtubeAPIkey = process.env.REACT_APP_KEY;
    const formatter = new Intl.NumberFormat('ko', { notation: 'compact'});
    const [videoDetailInfo, setVideoDetailInfo] = useState(undefined);
    const [channelInfo, setChannelInfo] = useState(undefined);
    const [relatedVideos, setRelatedVideos] = useState(undefined);

    const getVideoDetail = async (videoId) => {
        await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${youtubeAPIkey}`)
        .then((res) => res.json())
        .then((data) => setVideoDetailInfo(data.items[0].snippet))
        // .then((data) => console.log(data.items[0]))
        .catch(err => {
            console.error('get videoDetail info err: ', err)
        });
    }

    const getChannelInfo = async () => {
        await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${videoDetailInfo.channelId}&key=${youtubeAPIkey}`)
        .then((res) => res.json())
        // .then((data) => console.log(data))
        .then((data) => setChannelInfo(data.items[0]))
        .catch(err => {
            console.error('get channel info err: ', err)
        });
    }

    const getRelatedVideos = async (videoId) => {
        await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&&maxResults=25&relatedToVideoId=${videoId}&type=video&key=${youtubeAPIkey}`)
          .then(res => res.json())
          .then((data) => setRelatedVideos(data.items))
          .catch((err) => {
            console.log('get related videos err: ', err);
          })
      }

    useEffect(() => {
        getVideoDetail(params.videoId);
    }, [params.videoId ])


    useEffect(() => {
        getChannelInfo();
        getRelatedVideos(params.videoId);
    }, [videoDetailInfo])

    return (
        <div className={styles.layout}>
            <div>
                <iframe 
                    id="player" 
                    type="text/html" 
                    width="1000"
                    height="609.375"
                    src={`http://www.youtube.com/embed/${params.videoId}?enablejsapi=1&`}
                    frameBorder="0"
                ></iframe>
                <h2 className={styles.title}>
                    {videoDetailInfo && videoDetailInfo.title}
                </h2>
                <div className={styles.channel_info}>
                    <span>{channelInfo && <img className={styles.channel_img} src={channelInfo.snippet.thumbnails.default.url} width='50' />}</span>
                    <div className={styles.title_and_subscriberCnt}>
                        <span className={styles.channel_name}>{channelInfo && channelInfo.snippet.title}</span>
                        <span className={styles.subscriber_count}> {channelInfo && ('구독자  ' + formatter.format(channelInfo.statistics.subscriberCount))}</span>
                    </div>
                </div>
                <div className={styles.videoInfo}>
                    <span className={styles.videoInfo_date}>{videoDetailInfo && new Date(videoDetailInfo.publishedAt).toLocaleDateString('ko')}</span>
                    <span>{videoDetailInfo && videoDetailInfo.description}</span>
                </div>
            </div>
            <div className={styles.relatedVideos}>
                <VideoItems
                    videoItems={relatedVideos}
                    related
                />
            </div>
        </div>
    );
}

