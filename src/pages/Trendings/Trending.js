import axios from 'axios';
import { useState, useEffect } from 'react';
import CustomPagination from '../../components/Pagination/CustomPagination';
import SingleContent from '../../components/SingleContent/SingleContent';
import './Trending.css';

const Trending = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchTrending = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
      );
      setContent(data.results);
    };
    fetchTrending();
  }, [page]);

  return (
    <div>
      <span className="page-title">Trending</span>
      <div className="trending">
        {content &&
          content.map(item => (
            <SingleContent
              key={item.id}
              id={item.id}
              poster={item.poster_path}
              title={item.title || item.name}
              date={item.first_air_date || item.release_date}
              media_type={item.media_type}
              vote_average={item.vote_average}
            />
          ))}
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  );
};

export default Trending;
