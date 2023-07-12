import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSpotifyAPI } from './utils/data.js';
import './utils/SpotifyAuth.js';
import Login from './Login.js';
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';





function App() {
  const clientId = "9b98dc2244aa4e1988bebd9ba39d2a97";
  const { accessToken, profile, playlist, artists, song } = useSpotifyAPI(clientId);

  const handleSongButton = (song) => {
    window.open(song.preview_url, '_blank');
  };

  return (
    <div className="container mx-auto">
      {profile && (
        <div className="card">
          <div className="card-header">Hi {profile.display_name}!</div>
        </div>
      )}

      {artists && (
        <div className="card">
          <div className="card-header">Your Top Artists</div>
          <ul className="list-group list-group-flush">
            {artists.map((artist) => (
              <li key={artist.id} className="list-group-item flex items-center">
                <img src={artist.images?.[0]?.url} alt={artist.name} className="w-16 h-16 rounded-full mr-4" />
                <span>{artist.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {song && (
        <div className="card">
          <div className="card-header">Your Top Tracks</div>
          <ul className="list-group list-group-flush">
            {song.map((track) => (
              <li key={track.id} className="list-group-item flex items-center">
                <img src={track.album.images?.[0]?.url} alt={track.name} className="w-16 h-16 rounded-full mr-4" />
                <button className="btn btn-primary" onClick={() => handleSongButton(track)}>
                  {track.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {playlist && (
        <div className="card">
          <div className="card-header">Your Top Playlists</div>
          <ul className="list-group list-group-flush">
            {playlist.map((playlist) => (
              <li key={playlist.id} className="list-group-item flex items-center">
                <img src={playlist.images?.[0]?.url} alt={playlist.name} className="w-16 h-16 rounded-full mr-4" />
                <span>{playlist.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;