import { createContext } from 'react';
import useCartProvider from '../hooks/useCartProvider';

const CartContext = createContext();

export function CartProvider({ children }) {
  const cart = useCartProvider();

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export default CartContext;
