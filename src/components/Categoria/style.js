import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardCategoria: {
    boxSizing: 'border-box',
    position: 'relative',
    width: '15%',
    height: 100,
    backgroundColor: 'white',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.15)',
    borderRadius: 15,
    cursor: 'pointer',
    '&>img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: 15,
    },
  },
  blur: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    borderRadius: 15,
    backgroundColor: 'rgba(100,100,100,0.5)',
    '& > p': {
      position: 'absolute',
      bottom: 0,
      right: 10,
      fontFamily: 'Montserrat',
      fontSize: 16,
      fontWeight: 600,
      color: '#f2f2f2',
    },
  },
  cardTodos: {
    boxSizing: 'border-box',
    position: 'relative',
    width: '15%',
    height: 100,
    backgroundColor: 'white',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.15)',
    borderRadius: 15,
    cursor: 'pointer',
    '&>img': {
      width: '90%',
      objectFit: 'cover',
      borderRadius: 15,
      marginLeft: 5,
      marginTop: 15,
    },
  },
}));

export default useStyles;
