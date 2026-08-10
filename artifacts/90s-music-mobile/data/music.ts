import type { ImageSourcePropType } from 'react-native';

export type Song = {
  id: string;
  title: string;
  artist: string;
  album: string;
  year: string;
  duration: string;
  seconds: number;
  cover: ImageSourcePropType;
  genre: string;
};

export const songs: Song[] = [
  {
    id: 'pehla-nasha',
    title: 'Pehla Nasha',
    artist: 'Udit Narayan, Sadhana Sargam',
    album: 'Jo Jeeta Wohi Sikandar',
    year: '1992',
    duration: '05:44',
    seconds: 344,
    cover: require('../assets/images/cover-romance.jpg'),
    genre: 'Romance',
  },
  {
    id: 'ek-ladki',
    title: 'Ek Ladki Ko Dekha',
    artist: 'Kumar Sanu',
    album: '1942: A Love Story',
    year: '1994',
    duration: '04:55',
    seconds: 295,
    cover: require('../assets/images/cover-friends.jpg'),
    genre: 'Romance',
  },
  {
    id: 'aankhon-ki',
    title: 'Aankhon Ki Gustakhiyan',
    artist: 'Kumar Sanu',
    album: 'Hum Dil De Chuke Sanam',
    year: '1999',
    duration: '05:27',
    seconds: 327,
    cover: require('../assets/images/cover-romance.jpg'),
    genre: 'Melody',
  },
  {
    id: 'tu-hi-re',
    title: 'Tu Hi Re',
    artist: 'Hariharan',
    album: 'Bombay',
    year: '1995',
    duration: '06:11',
    seconds: 371,
    cover: require('../assets/images/cover-friends.jpg'),
    genre: 'Classics',
  },
  {
    id: 'humko-humise',
    title: 'Humko Humise Chura Lo',
    artist: 'Lata Mangeshkar',
    album: 'Mohabbatein',
    year: '2000',
    duration: '05:36',
    seconds: 336,
    cover: require('../assets/images/cover-romance.jpg'),
    genre: 'Romance',
  },
  {
    id: 'tujhe-dekha',
    title: 'Tujhe Dekha To Yeh Jana Sanam',
    artist: 'Kumar Sanu, Alka Yagnik',
    album: 'Dilwale Dulhania Le Jayenge',
    year: '1995',
    duration: '05:19',
    seconds: 319,
    cover: require('../assets/images/cover-friends.jpg'),
    genre: 'Classics',
  },
  {
    id: 'kuch-kuch',
    title: 'Kuch Kuch Hota Hai',
    artist: 'Udit Narayan',
    album: 'Kuch Kuch Hota Hai',
    year: '1998',
    duration: '04:38',
    seconds: 278,
    cover: require('../assets/images/cover-friends.jpg'),
    genre: 'Pop',
  },
  {
    id: 'pardesi',
    title: 'Pardesi Pardesi Jana Nahi',
    artist: 'Kumar Sanu, Alka Yagnik',
    album: 'Raja Hindustani',
    year: '1996',
    duration: '06:09',
    seconds: 369,
    cover: require('../assets/images/cover-romance.jpg'),
    genre: 'Heartbreak',
  },
];