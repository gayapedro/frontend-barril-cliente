import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import React from 'react';

import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Restaurantes from './pages/Restaurantes';
import Cardapio from './pages/Cardapio';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import useAuth from './hooks/useAuth';

function RotasProtegidas(props) {
  const { token } = useAuth();
  return (
    <Route render={() => (token ? props.children : <Redirect to='/' />)} />
  );
}

function Routes() {
  return (
    <CartProvider>
      <AuthProvider>
        <Router>
          <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/cadastro' component={Cadastro} />
            <RotasProtegidas>
              <Route path='/restaurantes' component={Restaurantes} />
              <Route path='/cardapio/:id' component={Cardapio} />
            </RotasProtegidas>
          </Switch>
        </Router>
      </AuthProvider>
    </CartProvider>
  );
}

export default Routes;
