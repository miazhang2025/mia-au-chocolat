'use client';

import { useState } from 'react';
import Link from 'next/link';

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

export default function MusicPage() {
  const [currentSong, setCurrentSong] = useState<Song>(playlist[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSongSelect = (song: Song) => {
    setCurrentSong(song);
    // You could trigger playback here if you want
  };

  return (
    <div className="min-h-screen from-neutral-50 to-neutral-100 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-block mb-4 text-neutral-600 hover:text-neutral-900 font-ibm-plex-mono"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bayon mb-2" style={{ letterSpacing: '3px' }}>
            MUSIC PLAYLIST
          </h1>
          <p className="text-neutral-600 font-ibm-plex-mono">
            Background music for your pastry browsing experience
          </p>
        </div>

        {/* Current Playing */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8 border border-neutral-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🎵</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{currentSong.title}</h2>
              <p className="text-neutral-600 font-ibm-plex-mono">{currentSong.artist}</p>
            </div>
          </div>
          <audio 
            controls 
            className="w-full mt-4"
            src={`/${currentSong.filename}`}
            autoPlay={isPlaying}
          >
            Your browser does not support the audio element.
          </audio>
        </div>

        {/* Playlist */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-200">
          <h3 className="text-xl font-bold mb-4">Playlist</h3>
          <div className="space-y-2">
            {playlist.map((song) => (
              <button
                key={song.id}
                onClick={() => handleSongSelect(song)}
                className={`w-full text-left p-4 rounded-lg transition-colors ${
                  currentSong.id === song.id
                    ? 'bg-amber-100 border border-amber-300'
                    : 'hover:bg-neutral-100 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-neutral-400 font-ibm-plex-mono text-sm w-6">
                    {song.id}
                  </span>
                  <div className="flex-1">
                    <div className="font-semibold">{song.title}</div>
                    <div className="text-sm text-neutral-600 font-ibm-plex-mono">
                      {song.artist}
                    </div>
                  </div>
                  {currentSong.id === song.id && (
                    <span className="text-amber-600">♫</span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Add Song Instructions */}
          {/* <div className="mt-8 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
            <h4 className="font-semibold mb-2 text-sm">How to add more songs:</h4>
            <ol className="text-sm text-neutral-600 font-ibm-plex-mono space-y-1 list-decimal list-inside">
              <li>Place your .mp3 files in the <code className="bg-neutral-200 px-1 rounded">/public</code> folder</li>
              <li>Edit <code className="bg-neutral-200 px-1 rounded">/app/music/page.tsx</code></li>
              <li>Add entries to the <code className="bg-neutral-200 px-1 rounded">playlist</code> array</li>
            </ol>
          </div> */}
        </div>
      </div>
    </div>
  );
}
