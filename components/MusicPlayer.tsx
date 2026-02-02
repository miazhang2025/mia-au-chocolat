'use client';

import { useState, useRef, useEffect } from 'react';

interface Song {
  id: number;
  title: string;
  artist: string;
  filename: string;
}

const playlist: Song[] = [
  {
    id: 1,
    title: 'Winter Magic',
    artist: 'Aves',
    filename: 'Aves - Winter Magic.mp3'
  },
  // Add more songs here as needed
];

interface MusicPlayerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MusicPlayer({ isOpen, onClose }: MusicPlayerProps) {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentSong = playlist[currentSongIndex];

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;

      const updateTime = () => setCurrentTime(audio.currentTime);
      const updateDuration = () => setDuration(audio.duration);
      const handleEnded = () => handleNext();

      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('loadedmetadata', updateDuration);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('loadedmetadata', updateDuration);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [currentSongIndex]);

  if (!isOpen) return null;

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
    setTimeout(() => audioRef.current?.play(), 100);
  };

  const handlePrevious = () => {
    setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
    setTimeout(() => audioRef.current?.play(), 100);
  };

  const handleSongSelect = (index: number) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
    setTimeout(() => audioRef.current?.play(), 100);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const bounds = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const percentage = x / bounds.width;
      audioRef.current.currentTime = percentage * duration;
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/20 z-[60]"
      />

      {/* Floating Card */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-[90vw] max-w-2xl max-h-[80vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-neutral-200 p-6 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-bayon" style={{ letterSpacing: '2px' }}>
              MUSIC PLAYLIST
            </h2>
            <p className="text-sm text-neutral-600 font-ibm-plex-mono">
              Background music for your experience
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-600 hover:text-neutral-900 text-2xl w-8 h-8 flex items-center justify-center"
            aria-label="Close music player"
          >
            
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Current Playing */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 border border-amber-200">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center transition-transform ${isPlaying ? 'animate-pulse' : ''}`}>
                <span className="text-xl">🎵</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold">{currentSong.title}</h3>
                <p className="text-neutral-600 font-ibm-plex-mono text-sm">{currentSong.artist}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div 
                onClick={handleProgressClick}
                className="h-2 bg-neutral-300 rounded-full cursor-pointer overflow-hidden group"
              >
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-100 group-hover:from-amber-600 group-hover:to-amber-700"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-neutral-600 font-ibm-plex-mono mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handlePrevious}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-amber-100 transition-colors shadow-sm"
                aria-label="Previous song"
              >
                <span className="text-lg">⏮</span>
              </button>
              <button
                onClick={handlePlayPause}
                className="w-14 h-14 flex items-center justify-center rounded-full bg-amber-500 hover:bg-amber-600 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                <span className="text-2xl text-white">{isPlaying ? '⏸' : '▶'}</span>
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-amber-100 transition-colors shadow-sm"
                aria-label="Next song"
              >
                <span className="text-lg">⏭</span>
              </button>
            </div>

            {/* Hidden Audio Element */}
            <audio 
              ref={audioRef}
              src={`/${currentSong.filename}`}
              preload="metadata"
            />
          </div>

          {/* Playlist */}
          <div>
            <h3 className="text-lg font-bold mb-3">Playlist</h3>
            <div className="space-y-2">
              {playlist.map((song, index) => (
                <button
                  key={song.id}
                  onClick={() => handleSongSelect(index)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    currentSongIndex === index
                      ? 'bg-amber-100 border border-amber-300 scale-[1.02]'
                      : 'hover:bg-neutral-100 border border-neutral-200 hover:scale-[1.01]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-neutral-400 font-ibm-plex-mono text-xs w-5">
                      {song.id}
                    </span>
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{song.title}</div>
                      <div className="text-xs text-neutral-600 font-ibm-plex-mono">
                        {song.artist}
                      </div>
                    </div>
                    {currentSongIndex === index && (
                      <span className={`text-amber-600 ${isPlaying ? 'animate-bounce' : ''}`}>♫</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
