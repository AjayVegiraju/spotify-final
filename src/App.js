// // src/App.js
// import React from 'react';
// import { useSpotifyAPI } from './SpotifyAPI.js';
// import './App.css'; // Import a new CSS file
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button} from 'react-bootstrap';

// function App() {

//   const clientId = "9b98dc2244aa4e1988bebd9ba39d2a97";
//   const { accessToken, profile , playlist , artists, song } = useSpotifyAPI(clientId);

//   const handleSongButton = (song) => {
//     window.open(song.preview_url, '_blank');
//   }
  
//   console.log(song);
//   console.log(playlist);
  
//   return (
//     <div className="App">
//       {/* Display the profile information if it's available */}
//       {profile && (
//         <div className="card">
//           <h1>Hi {profile.display_name}!</h1>
//           {/* Check if profile.images exists before trying to access its properties */}
         
//         </div>
//       )}

      

//       {/* Display the artists if they're available */}
//       {artists && (
//         <div className="card">
//           <h2>Your Top Artists</h2>
//           <ul>
//             {artists.map((artists) => (
//               <li key={artists.id}>
//                 <img src={artists.images?.[0]?.url} alt={artists.name} style={{ width: '100px' ,height: '100px', objectFit: 'cover'}}/>
//                 {artists.name}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Display the top song if they're available */}
//       {song && (
//         <div className="card">
//           <h2>Your Top Tracks</h2>
//           <ul>
//             {song.map((track) => (
//               <li key={track.id}>
//                 <img src={track.album.images?.[0]?.url} alt={track.name} style={{ width: '100px',height: '100px', objectFit: 'cover'}}/>
//                 <li><Button variant = "primary" onClick = {() => handleSongButton(track)}>{track.name}</Button></li>
//                 </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Display the playlist if they're available */}
//       {playlist && (
//         <div className="card">
//           <h2>Your Top Playlists: </h2>
//           <ul>
//             {playlist.map((playlist) => (
//                <li key={playlist.id}>
//                  <img src={playlist.images?.[0]?.url} alt={playlist.name} style={{ width: '100px' ,height: '100px', objectFit: 'cover'}}/>
//                  {playlist.name}
//                </li>
//                ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSpotifyAPI } from './SpotifyAPI.js';
import Login from './Login.js';
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';




function App() {
  const clientId = "9b98dc2244aa4e1988bebd9ba39d2a97";
  const { accessToken, profile , playlist , artists, song } = useSpotifyAPI(clientId);

  const handleSongButton = (song) => {
    window.open(song.preview_url, '_blank');
  }
  
  return (
    <div className="App">
      {profile && (
        <Card style={{ width: '18rem' }}>
          <Card.Header>Hi {profile.display_name}!</Card.Header>
        </Card>
      )}

      {artists && (
        <Card style={{ width: '18rem' }}>
          <Card.Header>Your Top Artists</Card.Header>
          <ListGroup variant="flush">
            {artists.map((artists) => (
              <ListGroupItem key={artists.id}>
                <img src={artists.images?.[0]?.url} alt={artists.name} style={{ width: '100px' ,height: '100px', objectFit: 'cover'}}/>
                {artists.name}
              </ListGroupItem>
            ))}
          </ListGroup>
        </Card>
      )}

      {song && (
        <Card style={{ width: '18rem' }}>
          <Card.Header>Your Top Tracks</Card.Header>
          <ListGroup variant="flush">
            {song.map((track) => (
              <ListGroupItem key={track.id}>
                <img src={track.album.images?.[0]?.url} alt={track.name} style={{ width: '100px' ,height: '100px', objectFit: 'cover'}}/>
                <Button variant="primary" onClick={() => handleSongButton(track)}>{track.name}</Button>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Card>
      )}

      {playlist && (
        <Card style={{ width: '18rem' }}>
          <Card.Header>Your Top Playlists:</Card.Header>
          <ListGroup variant="flush">
            {playlist.map((playlist) => (
              <ListGroupItem key={playlist.id}>
                <img src={playlist.images?.[0]?.url} alt={playlist.name} style={{ width: '100px' ,height: '100px', objectFit: 'cover'}}/>
                {playlist.name}
              </ListGroupItem>
            ))}
          </ListGroup>
        </Card>
      )}
    </div>
  );
}

export default App;
