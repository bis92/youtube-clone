import React from 'react';
import styles from './VideoItems.module.css';
import { format } from 'timeago.js';

export default function VideoItems({ videoItems }) {
    console.log(videoItems);
    const numFormatter = new Intl.NumberFormat('ko', { notation: 'compact'});
    const dayFormatter = new Intl.RelativeTimeFormat('ko', { numeric: 'auto' });
    const today = new Date();
    return (
        <div className={styles.items}>
            {videoItems && videoItems.map((videoDetail) => <div className={styles.itemDetail}>
                    <img src={`${videoDetail.snippet.thumbnails.medium.url}`} style={{ width: '100%', borderRadius: '1rem'}} />
                    <span>{videoDetail.snippet.channelTitle}</span>
                    <div>
                        {/* <span>조회수 {numFormatter.format(videoDetail.statistics.viewCount)} ● {format(new Date(videoDetail.snippet.publishedAt), 'ko')}</span> */}
                        <span>{format(new Date(videoDetail.snippet.publishedAt), 'ko')}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

