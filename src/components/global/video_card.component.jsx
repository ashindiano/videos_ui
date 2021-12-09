import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const VideoCard = function ({
  title,
  url,
  thumbnail,
  onClick,
  description,
  category,
}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        onClick={() => {
          onClick(url);
        }}
        component="img"
        height="200"
        image={thumbnail}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="span">
          {title}&nbsp;
        </Typography>
        <Typography
          gutterBottom
          variant="subtitle2"
          component="span"
          color="grey"
        >
          | {category.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

VideoCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  thumbnail: PropTypes.string,
  url: PropTypes.string,
  onClick: PropTypes.func,
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
  }).isRequired,
};

VideoCard.defaultProps = {
  title: 'No Title',
  thumbnail: '',
  description: 'No description',
  url: '',
  onClick: () => {},
};

export default VideoCard;
