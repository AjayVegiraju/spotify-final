// src/App.js
import React from 'react';
import { useSpotifyAPI } from './SpotifyAPI';
import './App.css'; // Import a new CSS file

function App() {
  const clientId = "9b98dc2244aa4e1988bebd9ba39d2a97";
  const { accessToken, profile , playlist , artists, song } = useSpotifyAPI(clientId);
  
  console.log(accessToken, song);
  
  return (
    <div className="App">
      {/* Display the profile information if it's available */}
      {profile && (
        <div className="card">
          <h1>{profile.display_name}</h1>
          {/* Check if profile.images exists before trying to access its properties */}
          <img src={profile.images?.[0]?.url} alt="Profile" />
          <p>ID: {profile.id}</p>
          <p>Email: {profile.email}</p>
          <p>URI: {profile.uri}</p>
        </div>
      )}

      {/* Display the playlist if they're available */}
      {playlist && (
        <div className="card">
          <h2>Playlists</h2>
          <ul>
            {playlist.map((playlist) => (
               <li key={playlist.id}>
                 <img src={playlist.images?.[0]?.url} alt={playlist.name} style={{ width: '100px' ,height: '100px', objectFit: 'cover'}}/>
                 {playlist.name}
               </li>
               ))}
          </ul>
        </div>
      )}

      {/* Display the artists if they're available */}
      {artists && (
        <div className="card">
          <h2>Artists</h2>
          <ul>
            {artists.map((artists) => (
              <li key={artists.id}>
                <img src={artists.images?.[0]?.url} alt={artists.name} style={{ width: '100px' ,height: '100px', objectFit: 'cover'}}/>
                {artists.name}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Display the top song if they're available */}
      {song && (
        <div className="card">
          <h2>Top Tracks</h2>
          <ul>
            {song.map((track) => (
              <li key={track.id}>
                <img src={track.images?.[0]?.url} alt={track.name} style={{ width: '100px' ,height: '100px', objectFit: 'cover'}}/>
                {track.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
