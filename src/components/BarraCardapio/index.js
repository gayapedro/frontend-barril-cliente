import precoIcon from '../../assets/price-icon.svg';
import tempoIcon from '../../assets/time-icon.svg';
import { useState } from 'react';
import useStyles from './style.js';

function BarraCardapio({ tempo, descricao, preco }) {
  const classes = useStyles();
  const [mostrarMais, setMostrarMais] = useState(false);

  return (
    <div className={classes.containerBarraCardapio}>
      <div>
        <img src={precoIcon} alt='preco' />
        <p>Pedido Mínimo: </p>
        <span>{`R$ ${String((preco / 100).toFixed(2)).replace(
          '.',
          ','
        )}`}</span>
      </div>
      <div>
        <img src={tempoIcon} alt='tempo' />
        <p>Tempo de Entrega: </p>
        <span>
          {tempo > 60
            ? `${Math.floor(tempo / 60).toFixed(0)}h ${tempo % 60}m`
            : `${tempo}m`}
        </span>
      </div>
      <div className={classes.descricao}>
        <h4>
          {descricao.length > 96 && !mostrarMais
            ? `${descricao.substr(0, 95)}...`
            : descricao}
          {descricao.length > 96 && !mostrarMais && (
            <button onClick={() => setMostrarMais(true)}>ver mais</button>
          )}
          {descricao.length > 96 && mostrarMais && (
            <button onClick={() => setMostrarMais(false)}>ver menos</button>
          )}
        </h4>
      </div>
    </div>
  );
}

export default BarraCardapio;
