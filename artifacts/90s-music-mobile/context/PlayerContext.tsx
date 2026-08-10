import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { songs, Song } from '@/data/music';

type PlayerContextValue = {
  currentSong: Song;
  currentIndex: number;
  isPlaying: boolean;
  progress: number;
  volume: number;
  isMuted: boolean;
  shuffle: boolean;
  repeat: boolean;
  favorites: string[];
  playSong: (song: Song) => void;
  togglePlay: () => void;
  next: () => void;
  previous: () => void;
  seek: (value: number) => void;
  toggleFavorite: (songId: string) => void;
  toggleMute: () => void;
  setVolume: (value: number) => void;
  setShuffle: () => void;
  setRepeat: () => void;
};

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(62);
  const [volume, setVolumeState] = useState(0.72);
  const [isMuted, setIsMuted] = useState(false);
  const [shuffle, setShuffleState] = useState(false);
  const [repeat, setRepeatState] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const currentSong = songs[currentIndex] ?? songs[0];

  useEffect(() => {
    AsyncStorage.getItem('90s-music-favorites').then((stored) => {
      if (stored) setFavorites(JSON.parse(stored) as string[]);
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPlaying) return;
      setProgress((value) => {
        if (value >= 100) {
          if (repeat) return 0;
          next();
          return 0;
        }
        return value + 0.18;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying, repeat]);

  const next = () => {
    setCurrentIndex((index) => {
      if (shuffle) return Math.floor(Math.random() * songs.length);
      return index === songs.length - 1 ? (repeat ? 0 : index) : index + 1;
    });
    setProgress(0);
    setIsPlaying(true);
  };

  const previous = () => {
    setCurrentIndex((index) => (index === 0 ? songs.length - 1 : index - 1));
    setProgress(0);
    setIsPlaying(true);
  };

  const playSong = (song: Song) => {
    const index = songs.findIndex((item) => item.id === song.id);
    if (index >= 0) {
      setCurrentIndex(index);
      setProgress(0);
      setIsPlaying(true);
    }
  };

  const toggleFavorite = (songId: string) => {
    setFavorites((current) => {
      const nextFavorites = current.includes(songId)
        ? current.filter((id) => id !== songId)
        : [...current, songId];
      AsyncStorage.setItem('90s-music-favorites', JSON.stringify(nextFavorites)).catch(() =>
        Alert.alert('Could not save favorite', 'Please try again.')
      );
      return nextFavorites;
    });
  };

  const value = useMemo(
    () => ({
      currentSong,
      currentIndex,
      isPlaying,
      progress,
      volume: isMuted ? 0 : volume,
      isMuted,
      shuffle,
      repeat,
      favorites,
      playSong,
      togglePlay: () => setIsPlaying((playing) => !playing),
      next,
      previous,
      seek: setProgress,
      toggleFavorite,
      toggleMute: () => setIsMuted((muted) => !muted),
      setVolume: (value: number) => {
        setVolumeState(value);
        if (value > 0) setIsMuted(false);
      },
      setShuffle: () => setShuffleState((value) => !value),
      setRepeat: () => setRepeatState((value) => !value),
    }),
    [currentSong, currentIndex, isPlaying, progress, volume, isMuted, shuffle, repeat, favorites]
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) throw new Error('usePlayer must be used within PlayerProvider');
  return context;
}