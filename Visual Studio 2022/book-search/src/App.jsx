import { useState } from 'react';
import axios from 'axios';
import { 
  BrowserRouter,
  Link,
  Route,
  Routes
} from 'react-router-dom'

import './App.css';

function App() {

  const ApiKey = "AIzaSyCSwds21YcNdCFc_qCW8infpMTppxWta6s";
  const [result, setResult] = useState([]);  
  const [inputData, setInputData] = useState("");
  const [favorite, setFavorite] = useState([]);

  const handleInputData = (input) => {
    const data = input.target.value;
    setInputData(data);
  }

  const handleBookSearchISBN = async () => {    
    const {data} = await axios.get("https://www.googleapis.com/books/v1/volumes?q=isbn:"+inputData+"&key="+ApiKey+"&maxResult=10")
    setResult(data.items);    
  }

  const handleBookSearchTitle = async () => {
    const {data} = await axios.get("https://www.googleapis.com/books/v1/volumes?q="+inputData+"&key="+ApiKey+"&maxResult=10")
    setResult(data.items);
  } 

  const SearchBook = () => {
    return (
      <div>
        <h1>Book Search</h1>        
        <input
          type="text"
          autocomplete="off"          
          onChange={handleInputData} //pega o dado envia para o state
          value={inputData} //mostra os dados do state
          />
          <br />
        <button
          className="button-search"
          onClick={handleBookSearchISBN}
          >ISBN search</button>
        <button
          className="button-search"
          onClick={handleBookSearchTitle}
          >Title search</button>
      </div>
    )
  }

  const Favorite = () => {
    return (
      <>
        <h1>Favorite Book</h1>
        {console.log(favorite.items)}
        {favorite.length > 0 ? favorite.map(livro => (
            <form className="form">
              <img src={livro.volumeInfo.imageLinks.thumbnail} alt={livro.title}/>
              <div className="books">
                <p><strong>Título:</strong> {livro.volumeInfo.title}</p>
                <button
                type="button"                
                onClick={() => {
                  const newFavorite = favorite.filter(favorite => favorite.volumeInfo.title !== livro.volumeInfo.title)
                  setFavorite(newFavorite)
                }}>
                  Remover dos favoritos
                </button>  
              </div>
                       
            </form>
          )) : "Não existe livros favoritos"
        }
      </>
    )
  }

  const Home = () => {
    return (
      <>
        <SearchBook></SearchBook>
        <hr />
        <>
          { result.length > 0 ?
            result.map(livro => (
            <form className="form">
              <img src={livro.volumeInfo.imageLinks.thumbnail} alt={livro.title}/>
              <div className="books">
                <p><strong>Título:</strong>  {livro.volumeInfo.title}</p>
                <p><strong>Autores:</strong>  {livro.volumeInfo.authors}</p>
                <div>
                  {
                    livro.volumeInfo.industryIdentifiers
                    ? livro.volumeInfo.industryIdentifiers.map(isbn => <p key={isbn.identifier}>{isbn.type}
                    : {isbn.identifier}.</p>) : <p></p>
                  }
                </div>
                <button
                type="button"                
                onClick={() => {
                  const newFavorite = [...favorite,livro];
                  let search = favorite.find(favorite => (
                    favorite.volumeInfo.title === livro.volumeInfo.title
                  ));
                  search
                  ? alert("livro já adicionado")                  
                  : setFavorite(newFavorite)
                }}>
                  Adicionar aos favoritos
                </button>
              </div>           
            </form>
          ))
        : "Não há livros"
        }
        </>
      </>
    )
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Link className='link' to="/">Search</Link>
        <Link className='link' to="/favorite">Favorite</Link>

        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/favorite" element={<Favorite/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
