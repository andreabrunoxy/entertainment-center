import { Button, Tab, Tabs, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#fff'
    }
  }
});

const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? 'tv' : 'movie'}?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, page]);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div
          style={{
            display: 'flex',
            margin: '15px 0'
          }}
        >
          <TextField
            style={{ flex: 1 }}
            className="searchbox"
            label="Search"
            variant="filled"
            onChange={e => setSearchText(e.target.value)}
          />
          <Button
            variant="contained"
            style={{ marginLeft: 10, backgroundColor: '#ccc', color: '#303030' }}
            onClick={fetchSearch}
          >
            <SearchIcon />
          </Button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Tabs
            value={type}
            indicatorColor="primary"
            textColor="primary"
            onChange={(event, newValue) => {
              setType(newValue);
              setPage(1);
            }}
          >
            <Tab label="Search Movies" />
            <Tab label="Search TV Series" />
          </Tabs>
        </div>
      </ThemeProvider>
      <div className="trending">
        {content &&
          content.map(item => (
            <SingleContent
              key={item.id}
              id={item.id}
              poster={item.poster_path}
              title={item.title || item.name}
              date={item.release_date || item.release_date}
              media_type={type ? 'tv' : 'movie'}
              vote_average={item.vote_average}
            />
          ))}
        {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numOfPages > 1 && <CustomPagination setPage={setPage} numOfPages={numOfPages} />}
    </div>
  );
};

export default Search;
