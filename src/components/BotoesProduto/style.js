import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  containerBotoes: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    alignItems: 'center',
    '& > button': {
      all: 'unset',
      cursor: 'pointer',
      fontFamily: 'Montserrat',
      fontWeight: 600,
      fontSize: 13,
      color: '#525459',
      textDecorationLine: 'underline',
      '&:disabled': {
        display: 'none',
      },
    },
  },
  botoesProduto: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& > button': {
      all: 'unset',
      cursor: 'pointer',
      padding: '13px 50px',
      backgroundColor: '#D13201',
      color: 'white',
      fontFamily: 'Montserrat',
      fontWeight: 600,
      fontSize: 14,
      borderRadius: 20,
    },
  },
  quantidade: {
    display: 'flex',
    boxSizing: 'border-box',
    width: 177,
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'Montserrat',
    fontWeight: 600,
    fontSize: 18,
  },
  botaoMenos: {
    backgroundColor: '#D13201',
    padding: 14,
    display: 'grid',
    placeContent: 'center',
    alignSelf: 'stretch',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    cursor: 'pointer',
  },
  botaoMais: {
    backgroundColor: '#D13201',
    padding: 14,
    display: 'grid',
    placeContent: 'center',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    cursor: 'pointer',
  },
}));

export default useStyles;
