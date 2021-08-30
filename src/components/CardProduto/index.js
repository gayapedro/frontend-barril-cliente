import useStyles from './style';

function CardProduto({
  titulo,
  descricao,
  preco,
  imagem,
  id,
  setModalAdicionar,
  setIdProduto,
}) {
  const classes = useStyles();

  const handleClick = () => {
    setIdProduto(id);
    setModalAdicionar(true);
  };

  return (
    <div onClick={handleClick} className={classes.cardContainer}>
      <div className={classes.cardTexto}>
        <h4>{titulo}</h4>
        <p>{descricao}</p>
        <div className={classes.containerPreco}>{`R$ ${String(
          (preco / 100).toFixed(2)
        ).replace('.', ',')}`}</div>
      </div>
      <img src={`${imagem}?${Date.now()}`} alt={titulo} />
    </div>
  );
}

export default CardProduto;
