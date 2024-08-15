'use client'

import { useCallback, useEffect, useState, useMemo } from 'react'

import Logo from './logo.svg'
import Inst from './inst.svg'
import Play from './play.svg'
import Pause from './pause.svg'
import Loading from './loading.svg'

import styles from './styles.module.css'

const STREAM_URL = 'https://18093.live.streamtheworld.com/SP_R4830056.aac'

export default function Home() {
  const [player, setPlayer] = useState<HTMLAudioElement>()
  const [isReady, setIsReady] = useState(false)
  const [status, setStatus] = useState<
    'playing' | 'paused' | 'waiting' | 'stalled'
  >()
  const [volume, setVolume] = useState(0.5)

  useEffect(() => {
    if (player) {
      console.log('volume is ' + volume)
      player.volume = volume
    }
  }, [volume])

  useEffect(() => {
    const playerInstance = new Audio(STREAM_URL)

    playerInstance.addEventListener('canplaythrough', (event) => {
      setIsReady(true)
    })

    playerInstance.addEventListener('play', (event) => {
      console.log('Playing')
      setStatus('playing')
    })

    playerInstance.addEventListener('pause', (event) => {
      console.log('paused')
      setStatus('paused')
    })

    setPlayer(playerInstance)
  }, [])

  const handlePlay = useCallback(() => {
    if (!player || !isReady) {
      return
    }

    if (!status) {
      player.play()
    } else if (status === 'playing') {
      player.pause()
    } else if (status === 'paused') {
      player.play()
    } else {
      return
    }
  }, [player, isReady, status])

  const playLabel = useMemo(() => {
    switch (status) {
      case 'playing':
        return <Pause width={30} height={40} viewBox="0 0 6 8" />
      case undefined:
        return isReady ? (
          <Play width={30} height={35} viewBox="0 0 6 7" />
        ) : (
          <Loading width={41} />
        )
      default:
        return <Play width={30} height={35} viewBox="0 0 6 7" />
    }
  }, [status, isReady])

  return (
    <div className={styles.component}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Logo width={250} height={69} viewBox="0 0 411 113" />
        </div>

        <div className={styles.player}>
          <div className={styles.controlWrapper}>
            <div className={styles.buttons}>
              {/* <div className={styles.control}>prev</div> */}

              <div className={styles.control} onClick={handlePlay}>
                {playLabel}
              </div>

              {/* <div className={styles.control}>next</div> */}
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
      </div>

      {/* <main className={styles.content}>
        <nav className={styles.navigation}>
          <ul className={styles.navList}>
            <li className={styles.navListItem}>Music</li>
            <li className={styles.navListItem}>Radio</li>
            <li className={styles.navListItem}>Artist</li>
            <li className={styles.navListItem}>Shop</li>
            <li className={styles.navListItem}>About</li>
          </ul>
        </nav>

        <div className={styles.contentContainer}></div>
      </main> */}
    </div>
  )
}
