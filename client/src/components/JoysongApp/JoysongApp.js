import React, { useEffect, useRef, useState } from 'react';
import styles from './JoysongApp.module.scss';

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

const JoysongApp = () => {
  const audioRef = useRef(null);
  const inputRef = useRef(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [lyrics, setLyrics] = useState(null);

  const selectSong = async () => {
    const selSongNo = inputRef.current.value;
    const audioResponse = await fetch(`${BASE_API_URL}/api/audio?selSongNo=${selSongNo}`);
    const lyricsResponse = await fetch(`${BASE_API_URL}/api/lyrics?selSongNo=${selSongNo}`);
    const url = await audioResponse.text();
    const lyricsText = await lyricsResponse.text();
    setAudioUrl(url);
    setLyrics(lyricsText);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [audioUrl]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.songNoSection}>
          <input ref={inputRef} placeholder="Song number" />
          <button onClick={selectSong}>Go</button>
        </div>
        {!!audioUrl && (
          <div className={styles.audio}>
            <audio ref={audioRef} controls>
              <source src={audioUrl} type="audio/ogg" />
            </audio>
          </div>
        )}
        {!!lyrics && (
          <div className={styles.lyrics}>
            {lyrics}
          </div>
        )}
      </div>
    </div>
  );
};

export default JoysongApp;
