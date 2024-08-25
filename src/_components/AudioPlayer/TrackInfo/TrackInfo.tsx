'use client';
import Image from 'next/image';
import useSWR from 'swr';
import { fetcher } from '@/_utils/api';

import NoImage from './noimage.svg';

import styles from '../AudioPlayer.module.css';

const TRACK_API = 'https://vibe-backend-yp2q.onrender.com/player/track';

export const TrackInfo = () => {
  const { data, error, isLoading } = useSWR(TRACK_API, fetcher, {
    refreshInterval: 1000,
  });

  if (error || isLoading) {
    console.error(error);

    return null;
  }

  return (
    <div className={styles.trackInfo}>
      <div className={styles.trackCover}>
        {!data?.coverArt ? (
          <Image src={data.coverArt} width={48} height={48} alt={data?.title} />
        ) : (
          <NoImage width={22} height={21} viewBox="0 0 43 41" />
        )}
      </div>

      <div className={styles.trackText}>
        <h2 className={styles.trackArtist}>{data?.artist}</h2>
        <h3 className={styles.trackTitle}>{data?.title}</h3>
      </div>
    </div>
  );
};
