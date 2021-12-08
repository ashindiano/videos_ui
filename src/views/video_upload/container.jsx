import { withStyles } from '@mui/styles';
import VideoUpload from './index';

const styles = () => ({
  root: {
    display: 'flex',
    padding: 40,
    justifyContent: 'center',
  },
  container: {
    width: 300,
  },
});

export default withStyles(styles)(VideoUpload);
