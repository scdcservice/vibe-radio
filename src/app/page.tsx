'use client';

import { useCallback, useEffect, useState, useMemo } from 'react';
import useSWR from 'swr';
import Image from 'next/image';

import Logo from './logo.svg';
import Inst from './inst.svg';
import SoundCloud from './soundcloud.svg';
import Play from './play.svg';
import Pause from './pause.svg';
import Loading from './loading.svg';

import styles from './styles.module.css';

const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      'Content-Type': 'json',
    },
  }).then((res) => res.json());

const STREAM_URL = 'https://18093.live.streamtheworld.com/SP_R4830056.mp3';
const TRACK_API = 'https://vibe-backend-yp2q.onrender.com/player/track';

export default function Home() {
  const [player, setPlayer] = useState<HTMLAudioElement>();
  const [status, setStatus] = useState<'playing' | 'paused' | 'idle'>('idle');
  const [volume, setVolume] = useState(1);

  const { data, error, isLoading } = useSWR(TRACK_API, fetcher, {
    refreshInterval: 1000,
  });

  useEffect(() => {
    if (player) {
      console.log('volume is ' + volume);
      player.volume = volume;
    }
  }, [player, volume]);

  useEffect(() => {
    const playerInstance = new Audio(STREAM_URL);

    playerInstance.addEventListener('play', (event) => {
      console.log('Playing');
      setStatus('playing');
    });

    playerInstance.addEventListener('pause', (event) => {
      console.log('paused');
      setStatus('paused');
    });

    setPlayer(playerInstance);
  }, []);

  const handlePlay = useCallback(() => {
    if (!player) {
      return;
    }

    switch (status) {
      case 'idle':
      case 'paused':
        player.play();
        break;
      case 'playing':
        player.pause();
        break;
      default:
        break;
    }
  }, [player, status]);

  const playLabel = useMemo(() => {
    switch (status) {
      case 'playing':
        return <Pause width={18} height={24} viewBox="0 0 6 8" />;
      default:
        return <Play width={18} height={21} viewBox="0 0 6 7" />;
    }
  }, [status]);

  return (
    <div className={styles.component}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Logo width={250} height={69} viewBox="0 0 411 113" />
        </div>

        <div className={styles.player}>
          <div className={styles.controlWrapper}>
            <div className={styles.buttons}>
              <div className={styles.trackInfo}>
                {data?.coverArt && (
                  <div className={styles.trackCover}>
                    <Image
                      src={data.coverArt}
                      width={48}
                      height={48}
                      alt={data?.title}
                    />
                  </div>
                )}

                <div className={styles.trackText}>
                  <h2 className={styles.trackArtist}>
                    {isLoading ? '...' : data?.artist}
                  </h2>
                  <h3 className={styles.trackTitle}>
                    {isLoading ? '...' : data?.title}
                  </h3>
                </div>
              </div>

              <button className={styles.control} onClick={handlePlay}>
                {playLabel}
              </button>
            </div>

            <div className={styles.volume}>
              <div className={styles.slideContainer}>
                <div className={styles.slideStatusContainer}>
                  <div
                    className={styles.slideStatus}
                    style={{
                      width: `${volume * 100}%`,
                    }}
                  />
                </div>
                <input
                  id="volume"
                  className={styles.volumeSlide}
                  type="range"
                  min="1"
                  max="100"
                  value={volume * 100}
                  onChange={(e) => setVolume(Number(e.target.value) / 100)}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className={styles.socials}>
        <a
          href="https://www.instagram.com/holypartygroup"
          target="_blank"
          className={styles.socialItem}
        >
          <Inst width={24} viewBox="0 0 48 48" />
        </a>

        <a
          href="https://soundcloud.com/vibeonlineradio"
          target="_blank"
          className={styles.socialItem}
        >
          <SoundCloud width={24} viewBox="0 0 48 48" />
        </a>
      </div>
    </div>
  );
}
