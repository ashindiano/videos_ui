import { Grid, Box, Typography } from '@mui/material';
import React from 'react';
import VideoPlayer from '../../components/custom/video_player.component';
import CComponent from '../../components/global/c.component';
import VideoCard from '../../components/global/video_card.component';
import actions from './actions';

export default class VideosWall extends CComponent {
  state = {
    currentVideo: null,
    videos: [],
    isPlaying: false,
  };

  componentDidMount = () => {
    actions.getVideos().then((res) => {
      this.updateState({ videos: res.videos });
    });
  };

  render() {
    const { classes } = this.props;
    const { currentVideo, videos, isPlaying } = this.state;
    return (
      <div>
        {currentVideo && (
          <div className={classes.container}>
            <VideoPlayer url={currentVideo} playing={isPlaying} />
          </div>
        )}
        {videos.length === 0 && (
          <div className={classes.noVideos}>
            <Typography variant="h6" color="error">
              No videos found
            </Typography>
          </div>
        )}
        <Grid container spacing={1}>
          {videos.map((item) => (
            <Grid item xs={12} md={4} lg={3}>
              <Box style={{ padding: 40, width: 'inherit' }}>
                <VideoCard
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  category={item.category}
                  url={process.env.REACT_APP_PUBLIC_DOMAIN + item.video.url}
                  thumbnail={
                    process.env.REACT_APP_PUBLIC_DOMAIN + item.video.thumb.url
                  }
                  onClick={(video) =>
                    this.updateState({
                      currentVideo: video,
                      isPlaying: true,
                    })
                  }
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}
