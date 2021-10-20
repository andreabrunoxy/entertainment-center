import axios from 'axios';
import { useState, useEffect } from 'react';
import Genres from '../../components/Genres/Genres';
import CustomPagination from '../../components/Pagination/CustomPagination';
import SingleContent from '../../components/SingleContent/SingleContent';
import useGenres from '../../hooks/useGenre';

const Series = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreforURL = useGenres(selectedGenres);

  useEffect(() => {
    const fetchSeries = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
      );

      setContent(data.results);
      setNumOfPages(data.total_pages);
    };
    fetchSeries();
  }, [page, genreforURL]);

  return (
    <div>
      <span className="page-title">Series</span>
      <Genres
        type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="trending">
        {content &&
          content.map(item => (
            <SingleContent
              key={item.id}
              id={item.id}
              poster={item.poster_path}
              title={item.title || item.name}
              date={item.first_air_date}
              media_type="tv"
              vote_average={item.vote_average}
            />
          ))}
      </div>
      {numOfPages > 1 && <CustomPagination setPage={setPage} numOfPages={numOfPages} />}
    </div>
  );
};

export default Series;
