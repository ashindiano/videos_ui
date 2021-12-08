/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ReactPlayer from 'react-player';
import CComponent from '../global/c.component';

// const sources = {
//   sintelTrailer: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
//   bunnyTrailer: 'http://media.w3.org/2010/05/bunny/trailer.mp4',
//   bunnyMovie: 'http://media.w3.org/2010/05/bunny/movie.mp4',
//   test: 'http://media.w3.org/2010/05/video/movie_300.webm',
// };

export default class VideoPlayer extends CComponent {
  render() {
    return <ReactPlayer {...this.props} controls />;
  }
}
