'use client';

import { FC } from 'react';

import styles from '../AudioPlayer.module.css';

interface Props {
  value: number;
  onChange: (value: number) => void;
}

export const VolumeControl: FC<Props> = ({ value, onChange }) => {
  return (
    <div className={styles.volume}>
      <div className={styles.slideContainer}>
        <div className={styles.slideStatusContainer}>
          <div
            className={styles.slideStatus}
            style={{
              width: `${value * 100}%`,
            }}
          />
        </div>

        <input
          id="volume"
          className={styles.volumeSlide}
          type="range"
          min="1"
          max="100"
          value={value * 100}
          onChange={(e) => onChange(Number(e.target.value) / 100)}
        />
      </div>
    </div>
  );
};
