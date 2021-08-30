import headerImagem from '../../assets/bg-pizzaria.png';
import useStyles from './style';
import Header from '../../components/Header';
import { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import useAuth from '../../hooks/useAuth';
import CardRestaurante from '../../components/CardRestaurante';
import { toast } from 'react-toastify';
import EditarPerfil from '../../components/EditarPerfil';
import endereco from '../../utils/apiAddress';
import logoBarril from '../../assets/barril.svg';
import Categoria from '../../components/Categoria';

function Restaurantes() {
  const classes = useStyles();
  const { token } = useAuth();
  const [restaurantes, setRestaurantes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [busca, setBusca] = useState('');
  const [toggle, setToggle] = useState(false);
  const [categoriaAtiva, setCategoriaAtiva] = useState(0);
  const [usuario, setUsuario] = useState({});
  const [categorias, setCategorias] = useState([]);
  const [restaurantesFiltrados, setRestaurantesFiltrados] = useState([]);
  const [modalEditarPerfil, setModalEditarPerfil] = useState(false);

  console.log(restaurantesFiltrados);

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
    const fetchRestaurantes = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${endereco}/restaurantes`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          toast.error('Erro ao buscar restaurantes.', toastOpts);
          setLoading(false);
          return;
        }
        const dados = await response.json();
        setRestaurantes(dados);
      } catch (error) {
        toast.error('Erro ao buscar restaurantes.', toastOpts);
      }
      setLoading(false);
    };

    fetchRestaurantes();
  }, []);

  useEffect(() => {
    const fetchCliente = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${endereco}/cliente`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          toast.error('Erro ao buscar cliente.', toastOpts);
          setLoading(false);
          return;
        }
        const dados = await response.json();
        setUsuario(dados);
      } catch (error) {
        toast.error('Erro ao buscar cliente.', toastOpts);
      }
      setLoading(false);
    };

    fetchCliente();
  }, [toggle]);

  useEffect(() => {
    const fetchCategorias = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${endereco}/categorias`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          toast.error('Erro ao buscar categorias.', toastOpts);
          setLoading(false);
          return;
        }
        const dados = await response.json();
        dados.unshift({ id: 0, nome: 'Todos', imagem: logoBarril });
        setCategorias(dados);
        setLoading(false);
      } catch (error) {
        toast.error('Erro ao buscar categorias.', toastOpts);
        setLoading(false);
      }
      setLoading(false);
    };

    fetchCategorias();
  }, []);

  useEffect(() => {
    console.log(busca.length, categoriaAtiva);
    let filtroRestaurante = [];
    if (categoriaAtiva !== 0 && busca.length > 0) {
      filtroRestaurante = restaurantes.filter((item) => {
        if (
          categoriaAtiva === item.categoria_id &&
          item.nome.toLowerCase().includes(busca.toLowerCase())
        ) {
          return item;
        } else {
          return;
        }
      });
    } else if (categoriaAtiva !== 0 && busca.length === 0) {
      console.log('entrou aqui');
      filtroRestaurante = restaurantes.filter((item) => {
        if (categoriaAtiva === item.categoria_id) {
          return item;
        } else {
          return;
        }
      });
    } else if (categoriaAtiva === 0 && busca.length > 0) {
      filtroRestaurante = restaurantes.filter((item) => {
        if (item.nome.toLowerCase().includes(busca.toLowerCase())) {
          return item;
        } else {
          return;
        }
      });
    } else {
      filtroRestaurante = [];
    }
    setRestaurantesFiltrados(filtroRestaurante);
  }, [busca, categoriaAtiva]);

  return (
    <div className={classes.containerPaginaProdutos}>
      {modalEditarPerfil && (
        <EditarPerfil
          modalAberto={setModalEditarPerfil}
          informacoesUsuario={usuario}
          setToggle={setToggle}
        />
      )}
      <div className={loading ? classes.backdrop : classes.noBackdrop}>
        <CircularProgress />
      </div>
      <Header
        banner={headerImagem}
        imagem={`${usuario.imagem}?${Date.now()}`}
        nome='Restaurantes'
        setModalEditarPerfil={setModalEditarPerfil}
      />
      <div className={classes.container}>
        <input
          type='text'
          placeholder='Buscar'
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <div className={classes.categorias}>
          {categorias.length > 0 &&
            categorias?.map((item) => (
              <Categoria
                setCategoriaAtiva={setCategoriaAtiva}
                imagem={item.imagem}
                nome={item.nome}
                id={item.id}
              />
            ))}
        </div>
        <div className={classes.restaurantesContainer}>
          {restaurantes.length > 0 &&
            busca.length === 0 &&
            categoriaAtiva === 0 &&
            restaurantes.map((item) => (
              <CardRestaurante
                key={item.id}
                titulo={item.nome}
                descricao={item.descricao}
                preco={item.valor_minimo_pedido}
                imagem={item.imagem}
                id={item.id}
              />
            ))}
          {(busca.length > 0 || categoriaAtiva !== 0) &&
            restaurantesFiltrados.map((item) => (
              <CardRestaurante
                key={item.id}
                titulo={item.nome}
                descricao={item.descricao}
                preco={item.valor_minimo_pedido}
                imagem={item.imagem}
                id={item.id}
              />
            ))}
          {(((busca.length > 0 || categoriaAtiva !== 0) &&
            restaurantesFiltrados.length === 0) ||
            restaurantes.length === 0) && (
            <div className={classes.semRestaurantes}>
              <img src='https://img.icons8.com/ios/452/sad.png' alt='sad' />
              <p>Nenhum restaurante encontrado.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Restaurantes;
