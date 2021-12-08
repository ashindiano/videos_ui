import React from 'react';

import { Button, IconButton, Typography, Box } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ErrorIcon from '@mui/icons-material/Error';
import Dropzone from 'react-dropzone';
import CComponent from '../../global/c.component';
import styles from './styles';
import theme from '../../../theme/theme';
import LinearProgressWithLabel from '../linear_progress_with_label.component';
import ApiService from '../../../services/api.service';
import { videosApi } from '../../../configs/api_endpoints.config';

class FileUploader extends CComponent {
  initialState = {
    fileUploadStatus: [],
    uploadedFileDetails: undefined,
    isUploadProcessDialogOpen: false,
  };

  constructor() {
    super();
    this.state = { ...this.initialState };
  }

  reset = () => {
    this.setState({ ...this.initialState });
  };

  closeUploadProcessDialog = () =>
    this.updateState({ isUploadProcessDialogOpen: false });

  isSubmitReady = () => {
    if (this.state.fileUploadStatus.length === 0) return false;
    const resp = this.state.fileUploadStatus.map((s) => {
      if (s.percentageCompleted === 100) return 'completed';
      return undefined;
    });
    return resp.includes('completed');
  };

  isAttaching = () => {
    // return true: attaching,  false: attach complete ,undefined: Attachment not triggered
    if (this.state.fileUploadStatus.length === 0) return undefined;
    const resp = this.state.fileUploadStatus.map((s) => {
      return (s.percentageCompleted && s.percentageCompleted !== 100) === true;
    });
    return !resp.includes(false);
  };

  onDrop = (files) => {
    if (files[0]) {
      this.updateState({
        fileUploadStatus: [
          {
            name: files[0].name,
            file: files[0],
            percentageCompleted: 0,
          },
        ],
      });
      ApiService.uploadFile(
        videosApi.default,
        'file',
        files[0],
        {},
        (percentageCompleted, cancelToken) => {
          if (percentageCompleted <= 100)
            this.updateState({
              fileUploadStatus: [
                {
                  percentageCompleted,
                  cancelToken,
                },
              ],
            });
        }
      )
        .then((res) => {
          if (res.data) {
            this.updateState({
              fileUploadStatus: [
                {
                  percentageCompleted: 100,
                  cancelToken: undefined,
                },
              ],
            });
          }
        })
        .catch((err) => {
          this.updateState({
            fileUploadStatus: [
              {
                error: err,
                percentageCompleted: undefined,
                cancelToken: undefined,
              },
            ],
          });
        });
    }
  };

  submit = async () => {
    const uploadedFileDetails = this.state.fileUploadStatus.map((status) => ({
      id: status.id,
      ext: status.ext,
      name: status.name,
    }));

    this.updateState({ uploadedFileDetails, isUploadProcessDialogOpen: true });
  };

  render() {
    const { fileUploadStatus } = this.state;
    const isAttaching = this.isAttaching();
    return (
      <div style={styles.root}>
        <Dropzone multiple={false} onDrop={this.onDrop} accept=".mp4,.mov">
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

        <Typography color="primary" variant="subtitle2">
          Note:
        </Typography>
        <div sx={styles.notes}>
          <ol>
            <li sx={styles.bottomSpace}>
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
        </div>

        {
          // eslint-disable-next-line no-nested-ternary
          isAttaching === true && (
            <Typography variant="body1" color="primary">
              Uploading Video ...
            </Typography>
          )
        }
        {fileUploadStatus.map((status, index) => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {!status.error && (
              <IconButton
                onClick={() => {
                  if (status.cancelToken)
                    status.cancelToken.cancel('request cancelled by user');
                  this.setState((state) => {
                    // eslint-disable-next-line no-param-reassign
                    state.fileUploadStatus.splice(index, 1);
                    return { ...state };
                  });
                }}
              >
                <DeleteOutlinedIcon color="error" fontSize="small" />
              </IconButton>
            )}
            {status.error && <ErrorIcon color="error" fontSize="small" />}
            <Typography variant="caption">{status.name}</Typography>
            &nbsp;&nbsp;
            {status?.percentageCompleted < 100 && (
              <Box sx={{ minWidth: 150 }}>
                <LinearProgressWithLabel value={status.percentageCompleted} />
              </Box>
            )}
          </div>
        ))}
        {this.isSubmitReady() && (
          <div style={{ padding: 30 }}>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={this.submit}
              sx={styles.uploadBtn}
            >
              Submit
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default FileUploader;
