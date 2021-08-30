import useStyles from './style';

function Categoria({ imagem, nome, id, setCategoriaAtiva }) {
  const classes = useStyles();

  return (
    <div
      onClick={() => setCategoriaAtiva(id)}
      className={id !== 0 ? classes.cardCategoria : classes.cardTodos}
    >
      <img src={imagem} alt={nome} />
      <div className={classes.blur}>
        <p>{nome}</p>
      </div>
    </div>
  );
}

export default Categoria;
