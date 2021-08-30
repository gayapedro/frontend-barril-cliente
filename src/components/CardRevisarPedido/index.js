import useStyles from './style';
import { toast } from 'react-toastify';
import CardProdutoCardapio from '../CardProdutoCardapio';
import carrinhoIcone from '../../assets/carrinho.svg';
import botaoFechar from '../../assets/botaocloselaranja.svg';
import iconeSemProdutos from '../../assets/semprodutos.svg';
import CircularProgress from '@material-ui/core/CircularProgress';
import sucesso from '../../assets/sucesso.svg';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import { useState, useEffect } from 'react';
import endereco from '../../utils/apiAddress';

function CardRevisarPedido({
  restaurante,
  setModalEndereco,
  setModalRevisar,
  setModalAdicionar,
  setIdProduto,
}) {
  const classes = useStyles();
  const [cliente, setCliente] = useState({});
  const [total, setTotal] = useState(null);
  const [subtotal, setSubtotal] = useState(null);
  const [confirmado, setConfirmado] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const { carrinho, limparCarrinho } = useCart();

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
    const fetchDadosCliente = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${endereco}/cliente`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          setLoading(false);
          toast.error('Erro ao buscar informações do cliente.', toastOpts);
          return;
        }
        const dados = await response.json();
        setLoading(false);
        setCliente(dados);
      } catch (error) {
        toast.error('Erro ao buscar informações do cliente.', toastOpts);
        setLoading(false);
      }
      setLoading(false);
    };

    fetchDadosCliente();
  }, []);

  useEffect(() => {
    let contaTotal = 0;
    let contaSubtotal = 0;
    for (const produto of carrinho) {
      contaTotal += produto['valor_total'];
      contaSubtotal += produto['valor_total'];
    }
    contaTotal += restaurante['taxa_entrega'];
    setTotal(contaTotal);
    setSubtotal(contaSubtotal);
  }, []);

  const handleAdicionar = () => {
    setModalRevisar(false);
    setModalEndereco(true);
  };

  const handleConfirmar = async () => {
    setLoading(false);
    if (!cliente.endereco || !cliente.cep || !cliente.complemento) {
      toast.error('É necessário informar um endereço.', toastOpts);
      return;
    }
    if (subtotal < restaurante.valor_minimo_pedido) {
      toast.error('Pedido possui valor inferior ao pedido mínimo.', toastOpts);
      return;
    }
    setLoading(true);
    try {
      let subtotal = 0;
      const produtos = carrinho.map((item) => {
        return {
          id: item.id,
          quantidade: item.quantidade,
          valor: item.preco,
          valor_total: item.valor_total,
        };
      });
      for (const produto of produtos) {
        subtotal += produto.valor_total;
      }
      const objetoPedido = {
        id_restaurante: restaurante.id,
        subtotal: subtotal,
        taxa_entrega: restaurante.taxa_entrega,
        total: subtotal + restaurante.taxa_entrega,
        produtos: produtos,
      };

      const response = await fetch(`${endereco}/pedidos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(objetoPedido),
      });

      if (!response.ok) {
        toast.error('Erro ao confirmar pedido.', toastOpts);
        setLoading(false);
        return;
      }

      setLoading(false);
      setConfirmado(true);
      limparCarrinho();
    } catch (error) {
      toast.error('Erro ao confirmar pedido.', toastOpts);
      setLoading(false);
    }
    setLoading(false);
  };

  return (
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
          onClick={() => setModalRevisar(false)}
          className={classes.botaoFechar}
          src={botaoFechar}
          alt='fechar'
        />
        <div className={classes.header}>
          <img src={carrinhoIcone} alt='carrinho' />
          <p>{restaurante.nome}</p>
        </div>
        {cliente.endereco !== null ? (
          <div className={classes.enderecoExistente}>
            <p>
              Endereço de Entrega:{' '}
              <span>{`${cliente.endereco}, ${cliente.complemento}, ${cliente.cep}`}</span>
            </p>
          </div>
        ) : (
          <div className={classes.enderecoInexistente}>
            <p onClick={handleAdicionar}>Adicionar Endereço</p>
          </div>
        )}
        {carrinho.length > 0 && !confirmado && (
          <>
            <p className={classes.tempo}>
              Tempo de Entrega:{' '}
              <span>
                {restaurante['tempo_entrega_minutos'] > 60
                  ? `${Math.floor(
                      restaurante['tempo_entrega_minutos'] / 60
                    ).toFixed(0)}h ${
                      restaurante['tempo_entrega_minutos'] % 60
                    }m`
                  : `${restaurante['tempo_entrega_minutos']}m`}
              </span>
            </p>

            <div className={classes.cardsProdutos}>
              {carrinho.map((item) => (
                <CardProdutoCardapio
                  key={item.id}
                  produto={item}
                  restauranteId={restaurante.id}
                  clienteId={cliente.id}
                  setModalAdicionar={setModalAdicionar}
                  setModalRevisar={setModalRevisar}
                  setIdProduto={setIdProduto}
                />
              ))}
            </div>

            <p
              onClick={() => setModalRevisar(false)}
              className={classes.pedirMais}
            >
              Adicionar mais itens ao pedido
            </p>
            <div className={classes.valores}>
              <div>
                <p>Subtotal</p>
                <h5>{`R$ ${String((subtotal / 100).toFixed(2)).replace(
                  '.',
                  ','
                )}`}</h5>
              </div>
              <div>
                <p>Taxa de entrega</p>
                <h5>{`R$ ${String(
                  (restaurante['taxa_entrega'] / 100).toFixed(2)
                ).replace('.', ',')}`}</h5>
              </div>
              <div>
                <p>Total</p>
                <h3>{`R$ ${String((total / 100).toFixed(2)).replace(
                  '.',
                  ','
                )}`}</h3>
              </div>
            </div>
            <button onClick={handleConfirmar} className={classes.confirmar}>
              Confirmar Pedido
            </button>
          </>
        )}
        {carrinho.length === 0 && !confirmado && (
          <div className={classes.semItens}>
            <img src={iconeSemProdutos} alt='sem produtos' />
            <p>Sem itens no carrinho</p>
          </div>
        )}
        {confirmado && (
          <div className={classes.confirmado}>
            <img src={sucesso} alt='sucesso' />
            <p>
              Pedido Confirmado!
              <br />
              Agora é só aguardar o seu pedido
            </p>
            <button onClick={() => setModalRevisar(false)}>
              Voltar para cardápio
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CardRevisarPedido;
