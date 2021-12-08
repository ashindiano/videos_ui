import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const VideoCard = function ({ title, url, thumbnail, onClick }) {
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
        <Typography gutterBottom variant="h6" component="div">
          {title || 'No title'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
    </Card>
  );
};

VideoCard.propTypes = {
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  url: PropTypes.string,
  onClick: PropTypes.func,
};

VideoCard.defaultProps = {
  title: '',
  thumbnail: '',
  url: '',
  onClick: () => {},
};

export default VideoCard;
