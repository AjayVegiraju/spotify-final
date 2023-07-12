import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSpotifyAPI } from './utils/data.js';
import './utils/SpotifyAuth.js';
import './tailwind.css';
import Login from './Login.js';
import { Card } from 'react-bootstrap';


function App() {
  const clientId = "9b98dc2244aa4e1988bebd9ba39d2a97";
  const { accessToken, profile, playlist, artists, song } = useSpotifyAPI(clientId);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;
      setScrollPosition(currentPosition);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const calculateFadeOut = () => {
    const maxScroll = window.innerHeight; // Set maxScroll to window height
    const opacity = scrollPosition < maxScroll ? 1 - (scrollPosition / maxScroll) : 0;
    const transform = `scale(${1 - (scrollPosition / maxScroll)})`;
    return { opacity, transform };
  };

  return (
    <div className="bg-black min-h-screen">
      <header className="h-screen flex items-center justify-center text-white text-6xl fixed top-0 left-0 right-0 z-10">
      <h1 className="hero" style={calculateFadeOut()}>{profile ? `Hi ${profile.display_name}!` : ''}</h1>
      </header>
    
      <div className="grid grid-cols-4 gap-4">

      <h1 style={calculateFadeOut()}> Your Top Songs </h1>
  {song &&
    song.map((track) => (
      <div key={track.id} className="bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
        <img
          className="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto"
          src={track.album.images?.[0]?.url}
          alt={track.name}
          width="384"
          height="512"
        />
        <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
          <blockquote>
            <p className="text-lg font-medium">
              {track.name}
            </p>
          </blockquote>
          <figcaption className="font-medium">
            <div className="text-sky-500 dark:text-slate-500">
              {track.artists[0]?.name}
            </div>
            {/* Add additional information if available */}
            {/* <div className="text-slate-700 dark:text-slate-500">
        Additional information
      </div> */}
          </figcaption>
        </div>
      </div>
    ))}
</div>

      <div className="grid grid-cols-4 gap-4">
        <h1>Top Artists</h1>
        
        {artists &&
          artists.map((artist) => (
            <div key={artist.id} className="bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
              <img
                className="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto"
                src={artist.images?.[0]?.url}
                alt={artist.name}
                width="384"
                height="512"
              />
              <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
                <blockquote>
                  <p className="text-lg font-medium">
                    {artist.name}
                  </p>
                </blockquote>
              
              </div>
            </div>
          ))}
      </div>

    

      <section className="py-20">
        <div className="container mx-auto">
          <h2 className="text-white text-4xl mb-8">Top Playlists</h2>

          <div className="grid grid-cols-4 gap-4">
            {playlist &&
              playlist.map((playlist) => (
                <div key={playlist.id} className="bg-white p-4 text-center shadow-lg rounded-lg">
                  <img src={playlist.images?.[0]?.url} alt={playlist.name} className="w-40 h-40 mx-auto mb-4 rounded" />
                  <p className="text-lg font-bold">{playlist.name}</p>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;