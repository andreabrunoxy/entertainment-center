import { Badge } from '@mui/material';
import { img_300, unavailable } from '../../config/config';
import ContentModal from '../ContentModal/ContentModal';
import './SingleContent.css';

const SingleContent = ({ poster, title, date, media_type, vote_average, id }) => {
  return (
    <ContentModal media_type={media_type} id={id}>
      <Badge
        badgeContent={vote_average}
        color={vote_average > 6 ? 'primary' : 'secondary'}
      />
      <img
        className="poster"
        src={poster ? `${img_300}/${poster}` : unavailable}
        alt="poster"
      ></img>
      <b className="title">{title}</b>
      <div className="subtitle">
        <span>{media_type === 'tv' ? 'Tv Series' : 'Movie'}</span>
        <span>{date}</span>
      </div>
    </ContentModal>
  );
};

export default SingleContent;
