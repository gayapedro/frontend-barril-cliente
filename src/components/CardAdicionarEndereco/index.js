import useStyles from './style';
import { toast } from 'react-toastify';
import carrinho from '../../assets/carrinho.svg';
import TextField from '@material-ui/core/TextField';
import InputMask from 'react-input-mask';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import iconeSucesso from '../../assets/sucesso.svg';
import CircularProgress from '@material-ui/core/CircularProgress';
import botaoFechar from '../../assets/botaocloselaranja.svg';
import endereco from '../../utils/apiAddress';

function CardAdicionarEndereco({ setModalEndereco, setModalRevisar }) {
  const { token } = useAuth();
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [complemento, setComplemento] = useState('');
  const [erro, setErro] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const toastOpts = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const handleSubmit = async () => {
    setLoading(false);
    if (cep.length !== 9) {
      toast.error('CEP inválido.', toastOpts);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${endereco}/endereco`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ endereco, cep, complemento }),
      });
      if (!response.ok) {
        setErro(true);
        setLoading(false);
        return;
      }
      setSucesso(true);
    } catch (error) {
      setErro(true);
      setLoading(false);
    }
    setLoading(false);
  };

  const handleClose = () => {
    setModalEndereco(false);
    setModalRevisar(true);
  };

  return (
    <div className={classes.backDrop}>
      {loading && (
        <div className={classes.backdropLoading}>
          <div className={classes.loading}>
            <CircularProgress />
          </div>
        </div>
      )}
      <div className={classes.card}>
        <img
          onClick={() => setModalEndereco(false)}
          src={botaoFechar}
          alt='fechar'
        />
        <div className={classes.header}>
          <img src={carrinho} alt='carrinho' />
          <p>Adicionar Endereço</p>
        </div>
        {!sucesso && (
          <>
            <form className={classes.form}>
              <div className={classes.containerInput}>
                <label htmlFor='cep'>CEP</label>
                <InputMask
                  mask='99999-999'
                  id='cep'
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  alwaysShowMask={false}
                  maskChar=''
                >
                  {(inputProps) => (
                    <TextField className={classes.input} variant='outlined' />
                  )}
                </InputMask>
              </div>
              <div className={classes.inputs}>
                <div className={classes.containerInput}>
                  <label htmlFor='endereco'>Endereço</label>
                  <TextField
                    className={classes.input}
                    id='endereco'
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                    variant='outlined'
                  />
                </div>
              </div>
              <div className={classes.inputs}>
                <div className={classes.containerInput}>
                  <label htmlFor='complemento'>Complemento</label>
                  <TextField
                    className={classes.input}
                    id='complemento'
                    value={complemento}
                    onChange={(e) => setComplemento(e.target.value)}
                    variant='outlined'
                  />
                </div>
              </div>
            </form>

            {erro && (
              <div className={classes.erro}>
                Algo inesperado aconteceu, tente novamente
              </div>
            )}

            <button onClick={handleSubmit}>Adicionar Endereço</button>
          </>
        )}
        {sucesso && (
          <div className={classes.sucesso}>
            <img src={iconeSucesso} alt='sucesso' />
            <p>
              Endereço adicionado
              <br />
              com sucesso!
            </p>
            <button onClick={handleClose}>Voltar para o carrinho</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CardAdicionarEndereco;
