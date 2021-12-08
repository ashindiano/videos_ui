import { Typography } from '@mui/material';
import { VideoCard } from 'material-ui-player';
import React from 'react';
import CComponent from '../../components/global/c.component';

export default class VideosWall extends CComponent {
  render() {
    return (
      <>
        <Typography variant="h6"> Video Wall</Typography>
        <VideoCard src="http://localhost:3001/uploads/video/video/2/sample3.mp4" />
      </>
    );
  }
}
