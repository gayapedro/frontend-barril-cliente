import useStyles from './style';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputMask from 'react-input-mask';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
import BotoesAddEdit from '../BotoesAddEdit';
import UploadImagem from '../UploadImagem';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import enderecoApi from '../../utils/apiAddress';

function EditarPerfil({ modalAberto, setToggle, informacoesUsuario }) {
  const classes = useStyles();
  const { token } = useAuth();
  const { handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [mask, setMask] = useState('');
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagem, setImagem] = useState(informacoesUsuario.imagem);
  const [base64, setBase64] = useState(null);
  const [telefone, setTelefone] = useState(informacoesUsuario.telefone);
  const [nome, setNome] = useState(informacoesUsuario.nome);
  const [email, setEmail] = useState(informacoesUsuario.email);
  const [endereco, setEndereco] = useState(informacoesUsuario.endereco);
  const [complemento, setComplemento] = useState(
    informacoesUsuario.complemento
  );
  const [cep, setCep] = useState(informacoesUsuario.cep);
  const [informacoes, setInformacoes] = useState({});
  const [senhas, setSenhas] = useState({ senha: '', senhaconfirm: '' });

  const toastOpts = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevValue) => !prevValue);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPasswordConfirm = () => {
    setShowPasswordConfirm((prevValue) => !prevValue);
  };

  const handleMouseDownPasswordConfirm = (e) => {
    e.preventDefault();
  };

  const handleMask = (value) => {
    setTelefone(value);
    if (value[5] === '9') setMask('(99) 99999-9999');
    else {
      setMask('(99) 9999-9999');
    }
  };

  const isValid = () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!nome) {
      toast.error('O nome é obrigatório.', toastOpts);
      return false;
    }
    if (!email) {
      toast.error('O email é obrigatório.', toastOpts);
      return false;
    }
    if (!re.test(email.toLowerCase())) {
      toast.error('O email é inválido.', toastOpts);
      return false;
    }
    if (telefone.length < 14) {
      toast.error('O telefone é inválido.', toastOpts);
      return false;
    }
    if (!endereco) {
      toast.error('O endereço é obrigatório.', toastOpts);
      return false;
    }
    if (!complemento) {
      toast.error('O complemento é obrigatório.', toastOpts);
      return false;
    }
    if (cep.length < 9) {
      toast.error('O cep é inválido.', toastOpts);
      return false;
    }
    if (
      (senhas.senha && !senhas.senhaconfirm) ||
      (!senhas.senha && senhas.senhaconfirm)
    ) {
      toast.error(
        'As duas senhas são obrigatórias para realizar alteração.',
        toastOpts
      );
      return false;
    }
    if (senhas.senha !== senhas.senhaconfirm) {
      toast.error('As duas senhas não conferem.', toastOpts);
      return false;
    }
    return true;
  };

  useEffect(() => {
    handleMask(informacoesUsuario.telefone);
  }, [informacoesUsuario]);

  const onSubmit = async () => {
    setLoading(false);
    const valido = isValid();
    if (!valido) return;
    setLoading(true);
    try {
      const objetoAtualizar = {
        nome,
        email,
        telefone,
        endereco,
        complemento,
        cep,
        imagem: base64 ? base64 : undefined,
      };
      if (senhas.senha) {
        objetoAtualizar.senha = senhas.senha;
      }

      const response = await fetch(`${enderecoApi}/cliente`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(objetoAtualizar),
      });
      if (!response.ok) {
        toast.error('Ocorreu um erro ao editar as informações.', toastOpts);
        setLoading(false);
        return;
      }
      setToggle((prevValue) => !prevValue);
      setLoading(false);
      toast.success('Perfil editado com sucesso.', toastOpts);
      modalAberto(false);
    } catch (error) {
      toast.error('Ocorreu um erro ao editar as informações.', toastOpts);
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <>
      {loading && (
        <div className={classes.backdropLoading}>
          <div className={classes.loading}>
            <CircularProgress />
          </div>
        </div>
      )}
      <div className={classes.backdrop}>
        <div className={classes.cardModalEditarPerfil}>
          <h3>Editar perfil</h3>
          <form className={classes.modalForm} onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.colunaEsquerda}>
              <div className={classes.containerInput}>
                <label htmlFor='nome'>Nome</label>
                <TextField
                  className={classes.input}
                  id='nome'
                  variant='outlined'
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
              <div className={classes.containerInput}>
                <label htmlFor='email'>Email</label>
                <TextField
                  className={classes.input}
                  id='email'
                  variant='outlined'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={classes.containerInput}>
                <label htmlFor='telefone'>Telefone</label>
                <InputMask
                  mask={mask}
                  id='telefone'
                  value={telefone}
                  onChange={(e) => handleMask(e.target.value)}
                  alwaysShowMask={false}
                  maskChar=''
                >
                  {(inputProps) => (
                    <TextField className={classes.input} variant='outlined' />
                  )}
                </InputMask>
              </div>
              <div className={classes.containerInput}>
                <label htmlFor='endereco'>Endereço</label>
                <TextField
                  className={classes.input}
                  id='endereco'
                  variant='outlined'
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                />
              </div>
              <div className={classes.containerInput}>
                <label htmlFor='complemento'>Complemento</label>
                <TextField
                  className={classes.input}
                  id='complemento'
                  variant='outlined'
                  value={complemento}
                  onChange={(e) => setComplemento(e.target.value)}
                />
              </div>
              <div className={classes.containerInput}>
                <label htmlFor='cep'>Cep</label>
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
              <div className={classes.containerInput}>
                <label htmlFor='senha'>Senha</label>
                <FormControl className={classes.input} variant='outlined'>
                  <OutlinedInput
                    className={classes.input}
                    id='senha'
                    type={showPassword ? 'text' : 'password'}
                    value={senhas.senha}
                    onChange={(e) =>
                      setSenhas({ ...senhas, senha: e.target.value })
                    }
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge='end'
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
              <div className={classes.containerInput}>
                <label htmlFor='confirmasenha'>Repita a senha</label>
                <FormControl className={classes.input} variant='outlined'>
                  <OutlinedInput
                    className={classes.input}
                    id='confirmasenha'
                    type={showPasswordConfirm ? 'text' : 'password'}
                    value={senhas.senhaconfirm}
                    onChange={(e) =>
                      setSenhas({
                        ...senhas,
                        senhaconfirm: e.target.value,
                      })
                    }
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPasswordConfirm}
                          onMouseDown={handleMouseDownPasswordConfirm}
                          edge='end'
                        >
                          {showPasswordConfirm ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
            </div>
            <div className={classes.colunaDireita}>
              <UploadImagem
                imagem={imagem}
                setImagem={setImagem}
                base64={base64}
                setBase64={setBase64}
              />
              <BotoesAddEdit
                modalAberto={modalAberto}
                titulo='Editar informações'
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditarPerfil;
