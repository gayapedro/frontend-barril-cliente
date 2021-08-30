import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  containerBarraCardapio: {
    padding: '0px 112px',
    marginTop: 112,
    boxSizing: 'border-box',
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    gap: 40,
    '& > div': {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      '& > p': {
        fontFamily: 'Montserrat',
        fontWeight: 600,
        fontSize: 14,
        color: '#525459',
      },
      '& > span': {
        fontFamily: 'Montserrat',
        fontSize: 14,
        color: '#525459',
      },
    },
  },
  descricao: {
    marginLeft: 'auto',
    width: 525,
    '& h4': {
      fontSize: 16,
      fontFamily: 'Montserrat',
      color: 'rgba(34, 34, 34, 0.87)',
      fontWeight: 'normal',
      margin: 0,
      padding: 0,
      marginTop: 14,
    },
    '& button': {
      all: 'unset',
      marginLeft: 10,
      fontFamily: 'Montserrat',
      color: '#D13201',
      cursor: 'pointer',
      fontWeight: 600,
    },
  },
}));

export default useStyles;
