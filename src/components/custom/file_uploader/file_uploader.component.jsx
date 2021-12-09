import React from 'react';
import { Button, IconButton, Typography, Box } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ErrorIcon from '@mui/icons-material/Error';
import Dropzone from 'react-dropzone';
import CComponent from '../../global/c.component';
import styles from './styles';
import theme from '../../../theme/theme';
import LinearProgressWithLabel from '../linear_progress_with_label.component';

class FileUploader extends CComponent {
  initialState = {
    name: undefined,
    file: undefined,
  };

  constructor() {
    super();
    this.state = { ...this.initialState };
  }

  reset = () => this.setState({ ...this.initialState });

  isUploading = () => {
    const { percentageCompleted } = this.props;
    return (
      this.state.file && percentageCompleted && percentageCompleted !== 100
    );
  };

  onDrop = (files) => {
    if (files[0]) {
      const file = files[0];
      this.props.onDrop(file);
      this.updateState({
        name: file.name,
        file,
      });
    }
  };

  render() {
    const { name, file } = this.state;
    const isUploading = this.isUploading();
    const {
      mimeTypes,
      onSubmit,
      enableUpload,
      percentageCompleted,
      error,
      cancelToken,
      uploadSucceeded,
    } = this.props;
    console.log(this.props);
    return (
      <div>
        <Dropzone
          multiple={false}
          onDrop={this.onDrop}
          accept={mimeTypes || '.mp4,.mov'}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...getRootProps({ className: 'dropzone' })}
                style={styles.uploader}
              >
                {
                  /* eslint-disable-next-line react/jsx-props-no-spreading */
                  <input {...getInputProps()} />
                }
                <Typography variant="subtitle1">
                  Drag and drop or click to select video files
                </Typography>
              </div>
            </section>
          )}
        </Dropzone>

        {isUploading === true && (
          <Typography variant="body1" color="primary">
            Uploading Video ...
          </Typography>
        )}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {file && !error && (
            <IconButton
              onClick={() => {
                if (cancelToken)
                  cancelToken.cancel('request cancelled by user');
                this.reset();
              }}
            >
              <DeleteOutlinedIcon color="error" fontSize="small" />
            </IconButton>
          )}
          {error && <ErrorIcon color="error" fontSize="small" />}
          <Typography variant="subtitle2"> {name} </Typography>

          {file && percentageCompleted && (
            <Box sx={{ minWidth: '200px' }}>
              <LinearProgressWithLabel value={percentageCompleted} />
            </Box>
          )}
          {uploadSucceeded && (
            <Typography color="primary" variant="caption">
              Video uploaded succesfully!!!
            </Typography>
          )}
        </div>
        <div style={styles.uploadButton}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => onSubmit(file)}
            disabled={
              !file || isUploading || enableUpload === false || uploadSucceeded
            }
            sx={{ minWidth: '200px' }}
          >
            Upload
          </Button>
        </div>
        <Box sx={{ paddingTop: '30px' }}>
          <Typography color="primary" variant="subtitle2">
            Note:
          </Typography>
          <ol style={{ margin: 0 }}>
            <li>
              <Typography variant="body2">
                Only
                <span
                  style={{
                    color: theme.palette.primary.main,
                    fontWeight: 'bolder',
                  }}
                >
                  {' .mov & .mp4 '}
                </span>
                files are allowed
              </Typography>
            </li>
          </ol>
        </Box>
      </div>
    );
  }
}

export default FileUploader;
