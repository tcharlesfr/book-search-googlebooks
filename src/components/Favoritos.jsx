import { useParams } from 'react-router-dom'


const Favoritos = () => {
    const params = useParams(); //recebe os dados passados pela rota

    return ( 
        <>
            <h1>Favoritos</h1>
            {console.log(params.data)};
        </> 
    );
}
 
export default Favoritos;