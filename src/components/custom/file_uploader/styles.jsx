const styles = {
  root: {
    padding: '70px 20px',
    color: 'black',
  },
  uploader: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 40,
    margin: '15px 0 15px 0',
    borderWidth: 2,
    borderRadius: 2,
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    cursor: 'pointer',
    fontSize: 12,
  },
  notes: {
    textAlign: 'justify',
    marginLeft: 50,
    marginBottom: 10,
  },
  bottomSpace: {
    paddingBottom: 10,
  },
  downloadTemplate: {
    marginLeft: 40,
    fontSize: 12,
    minHeight: 30,
    maxWidth: 300,
  },
  uploadContainer: {
    paddingLeft: 40,
    paddingRight: 40,
  },
  uploadBtn: {
    width: 100,
    minHeight: 25,
    height: 25,
  },
  btnActionContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
  },
  expireDayContainer: {
    padding: '30px 30px 10px 0px',
    color: 'primary.main',
    textAlign: 'center',
  },
};

export default styles;
