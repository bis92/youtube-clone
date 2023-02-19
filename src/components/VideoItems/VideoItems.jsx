import React from 'react';
import styles from './VideoItems.module.css';
import { format } from 'timeago.js';
import { useNavigate } from 'react-router-dom';

export default function VideoItems({ videoItems, related }) {
    const navigate = useNavigate();
    const numFormatter = new Intl.NumberFormat('ko', { notation: 'compact'});
    const dayFormatter = new Intl.RelativeTimeFormat('ko', { numeric: 'auto' });
    const today = new Date();
    return (
        <div className={styles.items}>
            {videoItems && videoItems.map((videoDetail) => <div key={videoDetail.id.videoId ? videoDetail.id.videoId:videoDetail.id} className={!related ? styles.itemDetail: styles.itemDetail_related} onClick={() => navigate(`/video/${videoDetail.id.videoId ? videoDetail.id.videoId:videoDetail.id}`)}>
                    <img src={`${videoDetail.snippet.thumbnails.medium.url}`} className={!related? styles.thumbnail:styles.thumbnail_related}/>
                    <div className={styles.itemDetail_info}>
                        <span className={styles.title}>{videoDetail.snippet.title}</span>
                        <span className={styles.channel_name}>{videoDetail.snippet.channelTitle}</span>
                        <div>
                            {/* <span>조회수 {numFormatter.format(videoDetail.statistics.viewCount)} ● {format(new Date(videoDetail.snippet.publishedAt), 'ko')}</span> */}
                            <span className={styles.date}>{format(new Date(videoDetail.snippet.publishedAt), 'ko')}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

