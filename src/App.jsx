import { 
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom'

import './App.css';
import BuscaLivro from './components/BuscaLivro'
import Favoritos from './components/Favoritos';

function App() { 

  const Home = () => {
    return (
      <>
        <BuscaLivro></BuscaLivro>
      </>
    )
  }

  return (
    <div className="App">

      <h2>Consulta Livros</h2>

      <BrowserRouter>      
        <Link className="link" to="/">Pesquisar</Link>
        <Link className="link" to="/favoritos">Favoritos</Link> 

        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/:favoritos" element={<Favoritos></Favoritos>}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
