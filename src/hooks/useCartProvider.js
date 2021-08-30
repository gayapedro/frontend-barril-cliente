import { useState } from 'react';

export default function useCartProvider() {
  const [carrinho, setCarrinho] = useState(
    JSON.parse(localStorage.getItem('carrinho')) ?? []
  );

  const addProduto = (produto) => {
    const novoCarrinho = [...carrinho];
    if (!novoCarrinho.some((item) => item.id === produto.id)) {
      novoCarrinho.push(produto);
    } else {
      let indice = 0;
      let contador = 0;
      for (const produtoBusca of novoCarrinho) {
        if (produtoBusca.id === produto.id) {
          indice = contador;
          break;
        }
        contador++;
      }
      novoCarrinho[indice] = produto;
    }
    setCarrinho(novoCarrinho);
    localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
  };

  const deleteProduto = (id) => {
    let indice = 0;
    let contador = 0;
    const arrayCarrinho = [...carrinho];
    for (const produtoBusca of arrayCarrinho) {
      if (produtoBusca.id === id) {
        indice = contador;
        break;
      }
      contador++;
    }
    const novoCarrinho = arrayCarrinho.splice(indice + 1, 1);

    setCarrinho(novoCarrinho);
    localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
  };

  const limparCarrinho = () => {
    setCarrinho([]);
    localStorage.removeItem('carrinho');
  };

  return {
    carrinho,
    addProduto,
    deleteProduto,
    limparCarrinho,
  };
}
