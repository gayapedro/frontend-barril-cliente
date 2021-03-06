import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    position: 'fixed',
    top: 0,
    width: '100%',
    height: '100vh',
    backgroundColor: 'rgba(115, 115, 115, 0.68)',
    zIndex: 10,
    display: 'grid',
    placeContent: 'center',
  },
  backdropLoading: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 7,
    display: 'grid',
    placeContent: 'center',
  },
  loading: {
    zIndex: 9,
    display: 'grid',
    placeContent: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    boxShadow:
      'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
  },
  card: {
    boxSizing: 'border-box',
    position: 'relative',
    margin: '40px 0',
    width: 570,
    backgroundColor: '#F9F9F9',
    borderRadius: 30,
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
    padding: '40px 70px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyItems: 'flex-start',
  },
  botaoFechar: {
    position: 'absolute',
    right: 50,
    cursor: 'pointer',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    fontFamily: "'Baloo 2', cursive",
    fontWeight: 'normal',
    fontSize: 40,
    width: '100%',
    color: 'rgba(18, 18, 18, 0.8)',
    margin: 0,
    marginTop: -20,
    '& > img': {
      height: 48,
    },
  },
  enderecoExistente: {
    width: '100%',
    display: 'flex',
    gap: 5,
    marginTop: -30,
    textAlign: 'justify',
    justifySelf: 'flex-start',
    '& > p': {
      margin: 0,
      padding: 0,
      fontFamily: 'Montserrat',
      fontWeight: 700,
      fontSize: 14,
      color: '#D13201',
      '& > span': {
        fontFamily: 'Montserrat',
        fontWeight: 400,
        fontSize: 14,
        color: 'rgba(34, 34, 34, 0.87)',
      },
    },
  },
  enderecoInexistente: {
    boxSizing: 'border-box',
    width: '100%',
    backgroundColor: 'rgba(251, 59, 0, 0.2)',
    borderRadius: 5,
    padding: '0 15px',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#AA320F',
    textDecorationLine: 'underline',
    cursor: 'pointer',
    marginTop: -30,
  },
  valores: {
    width: '100%',
    borderTop: '1px solid #D5D5D5',
    paddingTop: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    '& > div': {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontFamily: 'Montserrat',
      fontSize: 14,
      color: '#525459',
      '& > *': {
        margin: 0,
      },
    },
    '& p': {
      fontWeight: 'normal',
    },
    '& h5': {
      fontWeight: 600,
    },
    '& h3': {
      fontWeight: 600,
      fontSize: 24,
    },
  },
  pedirMais: {
    color: '#525459',
    fontFamily: 'Montserrat',
    fontSize: 13,
    fontWeight: 600,
    textAlign: 'center',
    textDecorationLine: 'underline',
    cursor: 'pointer',
    marginBottom: 30,
  },
  confirmar: {
    all: 'unset',
    cursor: 'pointer',
    padding: '11px 40px',
    backgroundColor: '#D13201',
    color: 'white',
    borderRadius: 20,
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 30,
  },
  tempo: {
    width: '100%',
    fontFamily: 'Montserrat',
    fontSize: 18,
    fontWeight: 600,
    color: '#525459',
    '& > span': {
      fontSize: 20,
    },
  },
  cardsProdutos: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: 20,
    overflowY: 'scroll',
    height: 120,
  },
  semItens: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
    height: '100%',
    width: '100%',
    padding: '50px 0',
    '& > img': {
      height: 113,
    },
    '& > p': {
      margin: 0,
      fontFamily: 'Montserrat',
      fontSize: 20,
      fontWeight: 600,
      color: '#525459',
    },
  },
  confirmado: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    gap: 28,
    marginTop: 50,
    '& > p': {
      margin: 0,
      fontFamily: 'Montserrat',
      fontSize: 20,
      fontWeight: 600,
      color: '#525459',
    },
    '& > button': {
      all: 'unset',
      cursor: 'pointer',
      fontFamily: 'Montserrat',
      fontSize: 14,
      fontWeight: 'bold',
      color: 'white',
      padding: '11px 40px',
      borderRadius: 20,
      backgroundColor: '#D13201',
      marginTop: 30,
    },
    '& > img': {
      height: 115,
    },
  },
}));

export default useStyles;
