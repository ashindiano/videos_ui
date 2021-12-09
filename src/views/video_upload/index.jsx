import React from 'react';
import { TextField, Grid, Stack, Box } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import FileUploader from '../../components/custom/file_uploader/file_uploader.component';
import CComponent from '../../components/global/c.component';
import CAutocomplete from '../../components/custom/c_autocomplete_component';
import actions from './actions';

export default class VideoUpload extends CComponent {
  initialState = {
    title: '',
    description: '',
    categories: undefined,
    categoryId: undefined,
    file: undefined,
    percentageCompleted: undefined,
    uploadError: undefined,
    cancelToken: undefined,
    uploadDone: false,
  };

  constructor(props) {
    super(props);
    this.uploaderRef = React.createRef();
    this.state = { ...this.initialState };
  }

  reset = () =>
    this.setState({ ...this.initialState, categories: this.state.categories });

  uploadVideo = (file) => {
    const { title, description, categoryId } = this.state;
    actions
      .uploadVideo(
        'video',
        file,
        { title, description, category_id: categoryId },
        (percentageCompleted, cancelToken) => {
          if (percentageCompleted <= 100)
            this.updateState({
              percentageCompleted,
              cancelToken,
            });
          if (percentageCompleted === 100) {
            this.updateState({ uploadDone: true });
            setTimeout(() => {
              this.uploaderRef.current.reset();
              this.reset();
            }, 2000);
          }
        }
      )
      .then((res) => {
        if (res.data) {
          this.updateState({
            percentageCompleted: 100,
            cancelToken: undefined,
          });
        }
      })
      .catch((err) => {
        this.updateState({
          uploadError: err,
          percentageCompleted: undefined,
          cancelToken: undefined,
        });
      });
  };

  onDrop = (file) => {
    this.updateState({ file });
  };

  componentDidMount() {
    actions
      .getCategories()
      .then((categories) => this.updateState({ categories }));
  }

  render() {
    const { classes } = this.props;
    const { uploadError } = this.state;
    const {
      title,
      categories,
      categoryId,
      percentageCompleted,
      cancelToken,
      uploadDone,
      description,
    } = this.state;

    return (
      <div className={classes.root}>
        <Grid item sm={12} md={8} lg={4}>
          <Stack spacing={1} sx={{ width: 250 }}>
            <TextField
              value={title}
              required
              label="Title"
              variant="standard"
              onChange={(event) =>
                this.updateState({ title: event.target.value })
              }
            />
            <CAutocomplete
              label="Category"
              required
              options={categories}
              value={categoryId}
              onChange={(value) => this.updateState({ categoryId: value })}
            />
            <Box sx={{ height: '10px' }} />
            <TextareaAutosize
              value={description}
              style={{ fontFamily: 'inherit' }}
              minRows={5}
              placeholder="Description..."
              onChange={(event) =>
                this.updateState({ description: event.target.value })
              }
            />
          </Stack>
          <Box sx={{ height: '10px' }} />
          <FileUploader
            ref={this.uploaderRef}
            uploadSucceeded={uploadDone}
            enableUpload={title !== '' && !!categoryId}
            onDrop={this.onDrop}
            onSubmit={this.uploadVideo}
            error={uploadError}
            percentageCompleted={percentageCompleted}
            cancelToken={cancelToken}
          />
        </Grid>
      </div>
    );
  }
}
