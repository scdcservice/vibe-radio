import { useCallback, useEffect, useState } from 'react';

export const useAudioPlayer = (url: string) => {
  const [player, setPlayer] = useState<HTMLAudioElement>();
  const [status, setStatus] = useState<'playing' | 'paused' | 'idle'>('idle');
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (player) {
      player.volume = volume;
    }
  }, [player, volume]);

  useEffect(() => {
    const playerInstance = new Audio(url);

    playerInstance.addEventListener('play', (event) => {
      setStatus('playing');
    });

    playerInstance.addEventListener('pause', (event) => {
      setStatus('paused');
    });

    setPlayer(playerInstance);
  }, [url]);

  const onPlay = useCallback(() => {
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

  return {
    player,
    volume,
    setVolume,
    status,
    onPlay,
  };
};
