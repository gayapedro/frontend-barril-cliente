import useStyles from './style.js';
import illustrationRestaurantes from '../../assets/illustration-2.svg';
import barrilLogo from '../../assets/barril-branco.svg';
import useAuth from '../../hooks/useAuth';
import { useHistory, useLocation } from 'react-router-dom';

function Header({ banner, imagem, nome, setModalEditarPerfil }) {
  const classes = useStyles();
  const { deslogar } = useAuth();
  const history = useHistory();
  const location = useLocation();

  const handleLogout = () => {
    deslogar(history.push('/'));
  };

  const handleClick = () => {
    setModalEditarPerfil(true);
  };

  return (
    <div className={classes.headerProdutos}>
      <img className={classes.imgHeader} src={banner} alt='header' />
      <img
        onClick={handleClick}
        className={
          location.pathname === '/restaurantes'
            ? classes.imgProfileEditar
            : classes.imgProfile
        }
        src={imagem}
        alt='profile'
      />
      <div className={classes.headerTexto}>
        <h3>{nome}</h3>
        <div className={classes.containerLogout}>
          <img src={barrilLogo} alt='barril' />
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <img
        className={classes.illustrationHeader}
        src={illustrationRestaurantes}
        alt='illustration'
      />
    </div>
  );
}

export default Header;
