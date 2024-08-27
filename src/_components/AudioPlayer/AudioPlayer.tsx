'use client';

import { useMemo } from 'react';
import { VolumeControl } from './VolumeControl';
import { TrackInfo } from './TrackInfo';
import { useAudioPlayer } from './hooks';

import Play from './play.svg';
import Pause from './pause.svg';

import styles from './AudioPlayer.module.css';

const STREAM_URL = 'https://s62.radiolize.com/radio/8060/radio.mp3';

export const AudioPlayer = () => {
  const { status, volume, setVolume, onPlay } = useAudioPlayer(STREAM_URL);

  const playLabel = useMemo(() => {
    switch (status) {
      case 'playing':
        return <Pause width={18} height={24} viewBox="0 0 6 8" />;
      default:
        return <Play width={18} height={21} viewBox="0 0 6 7" />;
    }
  }, [status]);

  return (
    <div className={styles.player}>
      <div className={styles.controlWrapper}>
        <div className={styles.buttons}>
          <TrackInfo />

          <button className={styles.control} onClick={onPlay}>
            {playLabel}
          </button>
        </div>

        <VolumeControl value={volume} onChange={setVolume} />
      </div>
    </div>
  );
};
