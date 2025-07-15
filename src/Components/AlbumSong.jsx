import React, { useContext, useEffect, useState } from 'react';
import { apiDetails } from '../App';

const Genre = () => {
  const apiData = useContext(apiDetails);
  const [groupedSongs, setGroupedSongs] = useState({});

  useEffect(() => {
    const genreCount = {};
    const genreMap = {};

    apiData.forEach((item) => {
      const genres = Array.isArray(item.genre) ? item.genre : [item.genre]; // handle both string/array
      genres.forEach((g) => {
        genreCount[g] = (genreCount[g] || 0) + 1;
        if (!genreMap[g]) genreMap[g] = [];
        genreMap[g].push(item); // store the song under its genre
      });
    });

    // Only keep genres with more than 1 song
    const filtered = {};
    Object.keys(genreCount).forEach((g) => {
      if (genreCount[g] > 1) {
        filtered[g] = genreMap[g];
      }
    });

    setGroupedSongs(filtered);
  }, [apiData]);

  return (
    <div>
      <h2>Songs Grouped by Popular Genres</h2>
      {Object.entries(groupedSongs).map(([genre, songs]) => (
        <div key={genre}>
          <h3>{genre}</h3>
          <ul>
            {songs.map((song, index) => (
              <li key={index}>{song.title}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Genre;
