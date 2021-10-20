import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { img_300, noPicture } from '../../config/config';
import './Carousel.css';

const handleDragStart = e => e.preventDefault();

const Carousel = ({ media_type, id }) => {
  const [credits, setCredits] = useState([]);

  const items = credits.map(credit => (
    <div className="carousel-item">
      <img
        src={credit.profile_path ? `${img_300}/${credit.profile_path}` : noPicture}
        alt={credit.name}
        onDragStart={handleDragStart}
        className="carousel-item__img"
      />
      <b className="carousel-item__txt">{credit.name}</b>
    </div>
  ));

  const responsive = {
    0: {
      items: 3
    },
    512: {
      items: 5
    },
    1024: {
      items: 7
    }
  };

  useEffect(() => {
    const fetchCredits = async () => {
      const { data } = await axios.get(`
      https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

      setCredits(data.cast);
    };
    fetchCredits();
  }, [id, media_type]);

  return (
    <AliceCarousel
      autoPlay
      infinite
      disableButtonsControls
      disableDotsControls
      mouseTracking
      items={items}
      responsive={responsive}
    />
  );
};

export default Carousel;
