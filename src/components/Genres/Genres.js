import { Chip } from '@mui/material';

import axios from 'axios';
import { useEffect } from 'react';

const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  setPage,
  type
}) => {
  const handleAdd = genre => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter(g => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove = selectedGenre => {
    setSelectedGenres(
      selectedGenres.filter(selected => selected.id !== selectedGenre.id)
    );
    setGenres([...genres, selectedGenre]);
    setPage(1);
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(`
      https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
    setGenres(data.genres);
  };
  console.log(genres);

  useEffect(() => {
    fetchGenres();
    return () => {
      setGenres({});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ padding: '6px 0' }}>
      {selectedGenres.map(selectedGenre => (
        <Chip
          key={selectedGenre.id}
          label={selectedGenre.name}
          style={{ margin: 2 }}
          color="secondary"
          size="small"
          clickable
          onDelete={() => handleRemove(selectedGenre)}
        />
      ))}
      {genres.map(genre => (
        <Chip
          key={genre.id}
          label={genre.name}
          style={{ margin: 2 }}
          color="primary"
          size="small"
          clickable
          onClick={() => handleAdd(genre)}
        />
      ))}
    </div>
  );
};

export default Genres;
