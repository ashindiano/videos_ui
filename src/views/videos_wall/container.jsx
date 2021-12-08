import { withStyles } from '@mui/styles';
import VideosWall from './index';

const styles = () => ({
  root: {},
  container: {
    display: 'flex',
    justifyContent: 'center',
    width: '100vw',
    paddingTop: 20,
  },
});

export default withStyles(styles)(VideosWall);
