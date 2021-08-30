import { useState } from 'react';
import useCart from './useCart';

export default function useAuthProvider() {
  const [token, setToken] = useState(localStorage.getItem('token') ?? null);
  const { limparCarrinho } = useCart();

  const logar = (tokenUsuario, callback) => {
    setToken(tokenUsuario);
    localStorage.setItem('token', tokenUsuario);
    if (callback) callback();
  };

  const deslogar = (callback) => {
    setToken(null);
    localStorage.removeItem('token');
    limparCarrinho();
    if (callback) callback();
  };

  return {
    logar,
    deslogar,
    token,
  };
}
