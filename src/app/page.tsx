'use client';
import { AudioPlayer } from '@/_components/AudioPlayer';

import Logo from './logo.svg';
import Inst from './inst.svg';
import SoundCloud from './soundcloud.svg';

import styles from './styles.module.css';

export default function Home() {
  return (
    <div className={styles.component}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Logo width={250} height={69} viewBox="0 0 411 113" />
        </div>

        <AudioPlayer />
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
