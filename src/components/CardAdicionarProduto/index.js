import ReactDOM from 'react-dom';
import useStyles from './style';
import iconefechar from '../../assets/botaocloselaranja.svg';
import iconePreco from '../../assets/price-icon.svg';
import iconeTempo from '../../assets/time-icon.svg';
import iconeCarrinho from '../../assets/carrinho.svg';
import BotoesProduto from '../BotoesProduto';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CircularProgress from '@material-ui/core/CircularProgress';
import endereco from '../../utils/apiAddress';

function CardAdicionarProduto({
  id,
  imagem,
  preco,
  tempo,
  setIdProduto,
  setModalAdicionar,
  setModalRevisar,
}) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [produto, setProduto] = useState({});
  const [finalizado, setFinalizado] = useState(false);
  const [textoBotao, setTextoBotao] = useState('Adicionar ao Carrinho');
  const [textoFinalizado, setTextoFinalizado] = useState('');
  const { carrinho } = useCart();
  const { token } = useAuth();

  const toastOpts = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const handleClose = () => {
    setModalAdicionar(false);
    setIdProduto(null);
  };

  const handleRevisao = () => {
    console.log('entrou');
    setModalAdicionar(false);
    setModalRevisar(true);
  };

  useEffect(() => {
    const fetchProduto = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${endereco}/produto/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          setLoading(false);
          toast.error('Erro ao buscar produto.', toastOpts);
          return;
        }
        const dados = await response.json();
        setProduto(dados);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error('Erro ao buscar produto.', toastOpts);
      }
      setLoading(false);
    };
    fetchProduto();
  }, []);

  useEffect(() => {
    if (textoBotao === 'Adicionar ao Carrinho') {
      setTextoFinalizado('Pedido Adicionado!');
    } else if (textoBotao === 'Atualizar Carrinho') {
      setTextoFinalizado('Pedido Atualizado!');
    } else if (textoBotao === 'Remover do Carrinho') {
      setTextoFinalizado('Pedido Removido!');
    }
  }, [textoBotao]);

  return ReactDOM.createPortal(
    <div className={classes.backdrop}>
      {loading && (
        <div className={classes.backdropLoading}>
          <div className={classes.loading}>
            <CircularProgress />
          </div>
        </div>
      )}
      <div className={classes.card}>
        <img
          onClick={handleClose}
          className={classes.botaoFechar}
          src={iconefechar}
          alt='fechar'
        />
        <img
          className={classes.bannerProduto}
          src={produto.imagem}
          alt='imagem do produto'
        />
        <img
          className={classes.iconeRestaurante}
          src={imagem}
          alt='imagem do restaurante'
        />
        <div className={classes.conteudoCard}>
          {!finalizado && (
            <>
              <h2>{produto.nome}</h2>
              <div className={classes.barraCard}>
                <div className={classes.itemBarra}>
                  <img src={iconePreco} alt='pedido minimo' />
                  <p>Pedido Mínimo:</p>
                  <span>{`R$ ${String((preco / 100).toFixed(2)).replace(
                    '.',
                    ','
                  )}`}</span>
                </div>
                <div className={classes.itemBarra}>
                  <img src={iconeTempo} alt='tempo de entrega' />
                  <p>Tempo de Entrega:</p>
                  <span>
                    {tempo > 60
                      ? `${Math.floor(tempo / 60).toFixed(0)}h ${tempo % 60}m`
                      : `${tempo}m`}
                  </span>
                </div>
              </div>
              <div className={classes.containerDescPreco}>
                <p>{produto.descricao}</p>
                <div className={classes.containerPreco}>{`R$ ${String(
                  (produto.preco / 100).toFixed(2)
                ).replace('.', ',')}`}</div>
              </div>
              <div className={classes.botoes}>
                <BotoesProduto
                  produto={produto}
                  setFinalizado={setFinalizado}
                  textoBotao={textoBotao}
                  setTextoBotao={setTextoBotao}
                  setModalAdicionar={setModalAdicionar}
                  setModalRevisar={setModalRevisar}
                />
              </div>
            </>
          )}
          {finalizado && (
            <div className={classes.conteudoAdicionar}>
              <div className={classes.mensagemSucesso}>
                <img src={iconeCarrinho} alt='carrinho' />
                <p>{textoFinalizado}</p>
              </div>
              <button
                disabled={carrinho.length > 0 ? false : true}
                onClick={handleRevisao}
                className={classes.botaoRevisao}
              >
                Ir para a revisão do pedido
              </button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.getElementById('root')
  );
}

export default CardAdicionarProduto;
