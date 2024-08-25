'use client';
import { useMemo } from 'react';
import Image from 'next/image';
import useSWR from 'swr';
import { fetcher } from '@/_utils/api';

import NoImage from './noimage.svg';

import styles from '../AudioPlayer.module.css';

const TRACK_API = 'https://s62.radiolize.com/api/nowplaying/49';

export const TrackInfo = () => {
  const { data, error, isLoading } = useSWR(TRACK_API, fetcher, {
    refreshInterval: 1000,
  });

  const track = useMemo(() => data?.['now_playing']?.song, [data]);

  if (error || isLoading || !data) {
    console.error(error);

    return null;
  }

  return (
    <div className={styles.trackInfo}>
      <div className={styles.trackCover}>
        {track?.art ? (
          <Image src={track.art} width={48} height={48} alt={track?.text} />
        ) : (
          <NoImage width={22} height={21} viewBox="0 0 43 41" />
        )}
      </div>

      <div className={styles.trackText}>
        <h2 className={styles.trackArtist}>{track?.artist}</h2>
        <h3 className={styles.trackTitle}>{track?.title}</h3>
      </div>
    </div>
  );
};
