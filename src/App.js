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

  const [loading, setLoading] = useState(true);

  const handleSongButtonClick = (song) => {
    // Perform desired action when the song button is clicked
    // Example: Open the song's Spotify URL in a new window
    window.open(song.external_urls.spotify, '_blank');
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;
      setScrollPosition(currentPosition);
    };

    window.addEventListener('scroll', handleScroll);

    // Update loading state when profile data has been fetched
    if (profile) {
      setLoading(false);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [profile]); // Add profile as a dependency

  const calculateFadeOut = () => {
    const maxScroll = window.innerHeight; // Set maxScroll to window height
    const opacity = scrollPosition < maxScroll ? 1 - (scrollPosition / maxScroll) : 0;
    const transform = `scale(${1 - (scrollPosition / maxScroll)})`;
    return { opacity, transform };
  };

  const calculateZoomIn = () => {
    const maxScroll = window.innerHeight;
    const scale = scrollPosition < maxScroll ? 0.5 + (scrollPosition / maxScroll * 0.5) : 1; // Starts at 0.5 scale and increases to 1
    const transform = `scale(${scale})`;
    return { transform };
  };

  // Display loading state
  if (loading) {
    return <div>Loading...</div>; // Or replace with your own loading indicator
  }

  return (
    <div className="bg-black min-h-screen">
      <header className="h-screen flex items-center justify-center text-white text-3xl fixed top-0 left-0 right-0 z-10">
        <h1 className="hero" style={calculateFadeOut()}>Hi {profile.display_name}!</h1>
      </header>

      <div className="grid grid-cols-4 gap-8">

        <h1 style={calculateZoomIn()}> Your Top Songs </h1>
        {song &&
          song.map((track) => (
            <div key={track.id} className="bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
              <button className="song-button" onClick={() => handleSongButtonClick(track)}>
              <div className="image-container">
                <img
                className="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto"
                src={track.album.images?.[0]?.url}
                alt={track.name}
                width="384"
                height="512"
              /></div></button>
              <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
                <blockquote>
                  <p className="text-lg md:text-left font-medium card-name">
                    {track.name}
                  </p>
                </blockquote>
                <figcaption className="font-medium">
                  <div className="text-sky-500 dark:text-slate-500 card-name">
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
        <h1 style={calculateZoomIn()}> Your Top Artists </h1>

        {artists &&
          artists.map((artist) => (
            <div key={artist.id} className="bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
              <div className="image-container">
                <img
                  className="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto image-content"
                  src={artist.images?.[0]?.url}
                  alt={artist.name}
                  width="384"
                  height="512"
                />
              </div>
              <div className="pt-6 md:p-8 p1-4 text-center md:text-left space-y-4">
                <blockquote>
                  <p className="text-lg font-medium card-name">
                    {artist.name}
                  </p>
                </blockquote>

              </div>
            </div>
          ))}
      </div>


      <div className="grid grid-cols-4 gap-4">
        <h1 style={calculateZoomIn()}> Your Top Playlists </h1>

        {playlist &&
          playlist.map((playlist) => (
            <div key={playlist.id} className="bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
              <div className="image-container"><img
                className="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto"
                src={playlist.images?.[0]?.url}
                alt={playlist.name}
                width="384"
                height="512"
              /></div>
              <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
                <blockquote>
                  <p className="text-lg font-medium card-name">
                    {playlist.name}
                  </p>
                </blockquote>

              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;