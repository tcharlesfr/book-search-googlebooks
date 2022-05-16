import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import Livros from './Livros'
import './BuscaLivro.css'

const BuscaLivro = () => {
  const navigate = useNavigate();
  // const [favorito, setFavorito] = useState("");
  const [resutado, setResultado] = useState([]);
  const ApiKey = ("AIzaSyCSwds21YcNdCFc_qCW8infpMTppxWta6s")

  ///////////////////////////////////////
  //state para guardar e setar os dados
  const [inputData, setInputData] = useState("");
  
  //função para guardar o dado do input data no state
  const handleInputData = (input) => {
    setInputData(input.target.value);
  }

  //pega os dados do state e busca os objetos livros
  //depois zera o input
  const handleBuscaLivroClickISBN = async () => {    
    const {data} = await axios.get("https://www.googleapis.com/books/v1/volumes?q=isbn:"+inputData+"&key="+ApiKey+"&maxResult=10")
    setResultado(data.items);
  }

  const handleBuscaLivroClickTitulo = async () => {
    const {data} = await axios.get("https://www.googleapis.com/books/v1/volumes?q="+inputData+"&key="+ApiKey+"&maxResult=10")
    setResultado(data.items);
  }

  

  return (
    <>
      <br />
      <input
        className="input-busca" //recebe o css
        onChange={handleInputData} //saindo do input ele aciona a funcao
        value={inputData}
      />
      <br />
      <button
        className="button-busca"
        onClick={handleBuscaLivroClickISBN}
      >
        Consultar ISBN
      </button>
      <button
        className="button-busca"
        onClick={handleBuscaLivroClickTitulo}
      >
        Consultar Título
      </button>
      <hr />      
      <Livros className="livros"/>

      <div>
        {/* imprime os livros */}
        {resutado.map(livro => (
          <form className="form container">
            {/* <img src={livro.volumeInfo.imageLinks.thumbnail} alt={livro.title}/> */}
            <div>
              <p>Título: {livro.volumeInfo.title}</p>
              <p>Autores: {livro.volumeInfo.authors}</p>
              <div>
                {
                  livro.volumeInfo.industryIdentifiers
                  ? livro.volumeInfo.industryIdentifiers.map(isbn => <p key={isbn.identifier}>{isbn.type}
                  :{isbn.identifier}.</p>) : <p></p>
                }
              </div>
              <button onClick={ () => {
                navigate(`/${livro}`)
              }}>
                Adicionar aos favoritos
              </button>
            </div>
            
            
          </form>
                 
        ))}

      </div>
      
    </>
  )
}
 
export default BuscaLivro;













// const [ApiKey, setApiKey] = useState('AIzaSyCSwds21YcNdCFc_qCW8infpMTppxWta6s')
    