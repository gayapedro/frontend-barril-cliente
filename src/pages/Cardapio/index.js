import semProdutos from '../../assets/semprodutos.svg';
import Header from '../../components/Header';
import BarraCardapio from '../../components/BarraCardapio';
import CardAdicionarProduto from '../../components/CardAdicionarProduto';
import useStyles from './style';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import useAuth from '../../hooks/useAuth';
import { useParams } from 'react-router-dom';
import CardProduto from '../../components/CardProduto';
import CardAdicionarEndereco from '../../components/CardAdicionarEndereco';
import CardRevisarPedido from '../../components/CardRevisarPedido';
import useCart from '../../hooks/useCart';
import endereco from '../../utils/apiAddress';

function Cardapio() {
  const classes = useStyles();
  const { token } = useAuth();
  const [produtos, setProdutos] = useState([]);
  const [restaurante, setRestaurante] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalAdicionar, setModalAdicionar] = useState(false);
  const [modalEndereco, setModalEndereco] = useState(false);
  const [modalRevisar, setModalRevisar] = useState(false);
  const [idProduto, setIdProduto] = useState(null);
  const { carrinho } = useCart();
  const history = useHistory();
  const { id } = useParams();

  const toastOpts = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch(`${endereco}/produtos/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const dados = await response.json();
        if (!response.ok) return;
        setProdutos(dados);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchProdutos();
  }, []);

  useEffect(() => {
    const fetchRestaurante = async () => {
      try {
        const response = await fetch(`${endereco}/restaurantes/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const dados = await response.json();
        if (!response.ok) return;
        setRestaurante(dados);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchRestaurante();
  }, []);

  return (
    <div className={classes.containerPaginaProdutos}>
      {modalAdicionar && (
        <CardAdicionarProduto
          tempo={restaurante.tempo_entrega_minutos}
          preco={restaurante.valor_minimo_pedido}
          imagem={restaurante.imagem}
          id={idProduto}
          setIdProduto={setIdProduto}
          setModalAdicionar={setModalAdicionar}
          setModalRevisar={setModalRevisar}
        />
      )}
      {modalEndereco && (
        <CardAdicionarEndereco
          setModalEndereco={setModalEndereco}
          setModalRevisar={setModalRevisar}
        />
      )}
      {modalRevisar && (
        <CardRevisarPedido
          restaurante={restaurante}
          setModalAdicionar={setModalAdicionar}
          setModalEndereco={setModalEndereco}
          setModalRevisar={setModalRevisar}
          setIdProduto={setIdProduto}
        />
      )}
      <div className={loading ? classes.backdrop : classes.noBackdrop}>
        <CircularProgress />
      </div>
      <Header
        banner={restaurante.imagem_categoria}
        imagem={restaurante.imagem}
        nome={restaurante.nome}
        setModalEditarPerfil={() => {}}
      />
      <div className={classes.botoesVoltarRevisar}>
        <button onClick={() => history.push('/restaurantes')}>Voltar</button>
        <button
          onClick={() => setModalRevisar(true)}
          disabled={carrinho.length > 0 ? false : true}
        >
          Revisar Pedido
        </button>
      </div>
      <BarraCardapio
        tempo={restaurante.tempo_entrega_minutos}
        preco={restaurante.taxa_entrega}
        descricao={restaurante.descricao ?? ''}
      />
      <div className={classes.restaurantesContainer}>
        {produtos.length > 0 &&
          produtos.map((item) => (
            <CardProduto
              key={item.id}
              titulo={item.nome}
              descricao={item.descricao}
              preco={item.preco}
              imagem={item.imagem}
              id={item.id}
              setModalAdicionar={setModalAdicionar}
              setIdProduto={setIdProduto}
            />
          ))}
        {produtos.length === 0 && (
          <div className={classes.semProdutos}>
            <img src={semProdutos} alt='sem produtos' />
            <p>Desculpe, estamos sem produtos ativos</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cardapio;
