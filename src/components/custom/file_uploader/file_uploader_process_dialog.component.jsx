import React, { useEffect, useState } from 'react';
import { Dialog, AppBar, Toolbar, CircularProgress } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import CheckIcon from '@mui/icons-material/Check';
import Slide from '@mui/material/Slide';
import PropTypes from 'prop-types';

const Transition = React.forwardRef(function Transition(props, ref) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide direction="up" ref={ref} {...props} />;
});

const UploadProcessDialog = function (props) {
  const { open, uploadedFileDetails, handleClose } = props;

  const [uploadProcesses, setUploadProcesses] = useState([]);

  useEffect(() => {
    const temp = [];
    uploadedFileDetails.forEach((params) => {
      temp.push({
        name: params.name,
        succeeded: undefined,
        inProgress: true,
      });
    });
    setUploadProcesses([...temp]);
  }, []);

  useEffect(() => {
    uploadedFileDetails.forEach(() => {});
  }, []);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Processing Files
          </Typography>
        </Toolbar>
      </AppBar>
      <div
        style={{
          placeContent: 'center',
          display: 'flex',
          width: '100vw',
          height: '50vh',
        }}
      >
        {uploadProcesses.map((file) => (
          <React.Fragment key={file.name}>
            <div
              style={{
                display: 'inline-flex',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {file.inProgress === false && file.succeeded && (
                <CheckIcon color="success" fontSize="small" />
              )}
              {file.inProgress === false && !file.succeeded && (
                <ErrorIcon color="error" fontSize="small" />
              )}
              {file.inProgress === true && <CircularProgress size={20} />}
              <Typography variant="h6">{file?.name}</Typography>
            </div>
          </React.Fragment>
        ))}
      </div>
    </Dialog>
  );
};

UploadProcessDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  uploadedFileDetails: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      supplier_id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      ext: PropTypes.string.isRequired,
    })
  ).isRequired,
};
UploadProcessDialog.defaultProps = {
  open: false,
};

export default UploadProcessDialog;
