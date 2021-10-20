import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import './App.css';
import Header from './components/Header/Header';
import SimpleBottomNavigation from './components/MainNav/MainNav';
import Trending from './pages/Trendings/Trending';
import Search from './pages/Search/Search';
import Movies from './pages/Movies/Movies';
import Series from './pages/Series/Series';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <Container>
          <Switch>
            <Route path="/" component={Trending} exact />
            <Route path="/movies" component={Movies} />
            <Route path="/series" component={Series} />
            <Route path="/search" component={Search} />
          </Switch>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;
