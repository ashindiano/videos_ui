import { withStyles } from '@mui/styles';
import VideosWall from './index';

const styles = () => ({
  noVideos: {
    height: 300,
    width: 'inherit',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    width: '100vw',
    paddingTop: 20,
  },
});

export default withStyles(styles)(VideosWall);
