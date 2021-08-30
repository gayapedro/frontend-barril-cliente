import useStyles from './style';
import botaoMenos from '../../assets/icone-menos.svg';
import botaoMais from '../../assets/icone-mais.svg';
import useCart from '../../hooks/useCart';
import { useState, useEffect } from 'react';

function BotoesProduto({
  produto,
  setFinalizado,
  textoBotao,
  setTextoBotao,
  setModalAdicionar,
  setModalRevisar,
}) {
  const classes = useStyles();
  const [quantidade, setQuantidade] = useState(1);
  const [existente, setExistente] = useState(false);
  const { carrinho, addProduto, deleteProduto } = useCart();

  const handleRevisao = () => {
    setModalAdicionar(false);
    setModalRevisar(true);
  };

  const handleQuantidade = (tipo) => {
    if (tipo === 'mais') {
      setQuantidade(quantidade + 1);
    } else if (tipo === 'menos' && quantidade > 0) {
      if (quantidade === 1 && !existente) return;
      setQuantidade(quantidade - 1);
    }
    if (quantidade === 0 && existente) {
      setTextoBotao('Remover do Carrinho');
    }
  };

  const handleCart = () => {
    if (quantidade === 0) {
      deleteProduto(produto.id);
    } else {
      addProduto({
        ...produto,
        quantidade: quantidade,
        valor_total: quantidade * produto.preco,
      });
    }
    setFinalizado(true);
  };

  useEffect(() => {
    const arrayCarrinho = [...carrinho];
    for (const produtoAdicionado of arrayCarrinho) {
      if (produtoAdicionado.id === produto.id) {
        setExistente(true);
        setQuantidade(produtoAdicionado.quantidade);
      }
    }
  }, [produto]);

  useEffect(() => {
    if (quantidade === 0) {
      setTextoBotao('Remover do Carrinho');
    } else if (quantidade > 0 && existente) {
      setTextoBotao('Atualizar Carrinho');
    } else {
      setTextoBotao('Adicionar ao Carrinho');
    }
  }, [quantidade, existente]);

  return (
    <div className={classes.containerBotoes}>
      <div className={classes.botoesProduto}>
        <div className={classes.quantidade}>
          <div
            onClick={() => handleQuantidade('menos')}
            className={classes.botaoMenos}
          >
            <img src={botaoMenos} alt='menos' />
          </div>
          {quantidade}
          <div
            onClick={() => handleQuantidade('mais')}
            className={classes.botaoMais}
          >
            <img src={botaoMais} alt='mais' />
          </div>
        </div>
        <button onClick={handleCart}>{textoBotao}</button>
      </div>
      <button
        disabled={carrinho.length > 0 ? false : true}
        onClick={handleRevisao}
      >
        Ir para a revisão do pedido
      </button>
    </div>
  );
}

export default BotoesProduto;
