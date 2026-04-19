'use client';

import { useEffect, useRef, useState } from 'react';

interface BackgroundMusicProps {
  src: string;
  volume?: number;
}

export default function BackgroundMusic({ src, volume = 0.3 }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const hasTriedAutoplay = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio(src);
      audioRef.current.loop = true;
      audioRef.current.volume = volume;

      // Attempt to autoplay
      const attemptPlay = () => {
        if (audioRef.current && !hasTriedAutoplay.current) {
          hasTriedAutoplay.current = true;
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setIsPlaying(true);
              })
              .catch((error) => {
                console.log('Autoplay prevented, will try on user interaction:', error);
                setIsPlaying(false);
              });
          }
        }
      };

      // Try to autoplay immediately
      attemptPlay();

      // If autoplay fails, try again on first user interaction
      const handleFirstInteraction = () => {
        if (audioRef.current && !isPlaying) {
          audioRef.current.play()
            .then(() => {
              setIsPlaying(true);
            })
            .catch(() => {
              // User still hasn't allowed autoplay
            });
        }
        // Remove listeners after first attempt
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('keydown', handleFirstInteraction);
        document.removeEventListener('scroll', handleFirstInteraction);
      };

      document.addEventListener('click', handleFirstInteraction, { once: true });
      document.addEventListener('keydown', handleFirstInteraction, { once: true });
      document.addEventListener('scroll', handleFirstInteraction, { once: true });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [src, volume]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex gap-2">
      <button
        onClick={toggleMute}
        className="px-3 py-2 bg-white/20 text-white rounded-lg border border-white hover:bg-white/40 transition-colors text-xl"
        aria-label={isMuted ? 'Unmute music' : 'Mute music'}
      >
        {isMuted ? '🔇' : '🔊'}
      </button>
    </div>
  );
}
