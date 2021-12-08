const styles = {
  uploader: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 30,
    margin: '15px 0 15px 0',
    borderWidth: 2,
    borderRadius: 2,
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    cursor: 'pointer',
  },

  notes: {
    textAlign: 'justify',
    marginLeft: 50,
    marginBottom: 10,
  },
  bottomSpace: {
    paddingBottom: 10,
  },
  uploadContainer: {
    paddingLeft: 40,
    paddingRight: 40,
  },
  uploadButton: {
    paddingTop: '10px',
    width: 'inherit',
    textAlign: 'right',
  },
};

export default styles;
