import { CircularProgress, Autocomplete, TextField } from '@mui/material';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

// The Following AutoComplete component is designed to have debounce effect with 500 milliseconds interval

export default class CAutocomplete extends Component {
  debounce = (e, fn) => {
    const { target, currentTarget } = e;
    const { value } = target;
    if (_.isFunction(fn)) {
      const cValue = value;
      const cTarget = currentTarget;
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(() => fn(cValue, cTarget), 500);
    }
  };

  render() {
    const {
      label,
      error,
      options,
      value,
      helperText,
      selectionKey,
      onChange,
      onInputChange,
      onClearSelection,
      loading,
      sendValueOnChange,
      ...other
    } = this.props;
    const selOptions = options === undefined || options === null ? [] : options;

    return (
      <Autocomplete
        loading="true"
        size="small"
        tagSizeSmall
        onChange={
          sendValueOnChange
            ? (event, selection, reason) => {
                if (reason === 'clear') {
                  if (_.isFunction(onClearSelection)) onClearSelection();
                }
                onChange(selection);
              }
            : (event, selection, reason) => {
                if (reason === 'clear') {
                  if (_.isFunction(onClearSelection)) onClearSelection();
                }
                onChange(selection ? selection[selectionKey] : null);
              }
        }
        renderInput={(params) => (
          <TextField
            margin="dense"
            variant="standard"
            label={label}
            error={error}
            helperText={helperText}
            size="small"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            onKeyUp={(e) => this.debounce(e, onInputChange)}
            InputProps={{
              ...params.InputProps,

              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        renderOption={(props, option) => {
          return (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <li {...props} key={option[selectionKey]}>
              {option.name}
            </li>
          );
        }}
        getOptionLabel={(option) => {
          if (option) return option.name;
          return null;
        }}
        options={selOptions}
        value={
          selOptions.find((option) =>
            option ? option[selectionKey] === value : false
          ) || null
        }
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...other}
      />
    );
  }
}

CAutocomplete.propTypes = {
  loading: PropTypes.bool,
  options: PropTypes.arrayOf(Object),
  error: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onInputChange: PropTypes.func,
  value: PropTypes.string,
  onClearSelection: PropTypes.func,
  sendValueOnChange: PropTypes.bool,
  selectionKey: PropTypes.string,
};
CAutocomplete.defaultProps = {
  loading: false,
  options: [],
  error: false,
  helperText: undefined,
  label: undefined,
  onChange: undefined,
  onInputChange: undefined,
  value: undefined,
  onClearSelection: undefined,
  sendValueOnChange: false,
  selectionKey: 'id',
};
