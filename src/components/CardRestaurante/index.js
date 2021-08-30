import useStyles from './style';
import { useHistory } from 'react-router-dom';

function CardRestaurante({ titulo, descricao, preco, imagem, id }) {
  const classes = useStyles();
  const history = useHistory();
  let tagPreco = '';

  if (preco <= 3000) {
    tagPreco = '$';
  } else if (preco <= 5000) {
    tagPreco = '$$';
  } else if (preco <= 9000) {
    tagPreco = '$$$';
  } else {
    tagPreco = '$$$$';
  }

  const cardapioRestaurante = () => {
    history.push(`/cardapio/${id}`);
  };

  return (
    <div onClick={cardapioRestaurante} className={classes.cardContainer}>
      <div className={classes.cardTexto}>
        <h4>{titulo}</h4>
        <p>{descricao}</p>
        <div className={classes.containerPreco}>{tagPreco}</div>
      </div>
      <img src={`${imagem}?${Date.now()}`} alt={titulo} />
    </div>
  );
}

export default CardRestaurante;
