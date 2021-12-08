import React from 'react';
import { TextField, Grid, Stack, Box } from '@mui/material';
import FileUploader from '../../components/custom/file_uploader/file_uploader.component';
import CComponent from '../../components/global/c.component';
import CAutocomplete from '../../components/custom/c_autocomplete_component';

export default class VideoUpload extends CComponent {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid item sx={12} md={8} lg={4}>
          <Stack spacing={1} sx={{ width: 250 }}>
            <TextField label="Title" variant="standard" />
            <CAutocomplete label="Category" />
          </Stack>
          <Box sx={{ height: 10 }} />
          <FileUploader disabled />
        </Grid>
      </div>
    );
  }
}
