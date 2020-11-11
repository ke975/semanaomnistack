import React, {useState,useEffect} from "react";
import api from "./services/api"
import "./global.css";
import "./App.css";
import "./sidebar.css";
import "./main.css";

//componentes:bloco isolado de html ,Css,ejs que nao interfere no restante de la aplicacao
//regara do react js pára os componentes um componente por arquivos

//Estados:informacoes mantida pelo componenete conceito de mutalidade estudar depois para rtener una mejor vision sobre el eestado

//priopriedade:os atributos do html5 sao as priopriedades do react js e
//se acessa atraves do props.title ou o atributo {props.title}



function App() {
const [devs,setDevs]=useState([])

const [github_username,setGithubusername] = useState('');
const [techs,setTechs] = useState('')

  const [latitude,setLatitude] = useState('');
  const [longitude,setLongitude] = useState('');
useEffect(()=>{
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const{latitude,longitude} = position.coords;

      setLatitude(latitude);
      setLongitude(longitude);

    },
    (err)=>{
    
    },
    {
      timeout:3000,
    }
  )
},[]);

useEffect(()=>{
async function loadDevs(){
const response = await api.get('/devs');
setDevs(response.data)
}

loadDevs();
},[]);
async function handleAddDev(e){
e.preventDefault();

const response = await api.post('/devs', {
github_username,
techs,
latitude,
longitude
})
setGithubusername('');
setTechs('');
setDevs([...devs, response.data])

}

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleAddDev}>
          <div className="input-block">
            <label htmlfor="">Usuario do Github</label>
            <input
              name="github_username"
              id="username_
          github"
              required
              value={github_username}
              
              onChange={e => setGithubusername(e.target.value)}
            />

            <div className="input-block">
              <label htmlfor="">Tecnologias</label>
              <input name="techs" id="techs" required 
              value={techs}
              
              onChange={e => setTechs(e.target.value)} />
            </div>
           
            <div className="input-block">
              <div className="input-group">
                <label htmlfor="">Latitude </label>
                <input
                  name="latitude "
                  id="
          latitude"
          type="Number"
                  required
                  value={latitude}
                  onChange={e => setLatitude(e.target.value)}
                />

                <label htmlfor="">Longitude</label>
                <input type="Number" name="longitude" id="longitude" required value={longitude} onChange={e => setLongitude(e.target.value)}/>
              </div>
            </div>
          </div>
          <button type="submit">Salvar</button>
        </form>
      </aside>
      <main>
        <ul>
          {devs.map(dev=>(
            

              <li key={dev.id} className="dev-item">
              <header>
                <img src={dev.avatar_url} alt={dev.name} />
                <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(', ')}</span>
                </div>
              </header>
              <p>{dev.bio}</p>
              <a href={`https://github.com/ke975/${dev.github_username}`}>acessar perfil no github`</a>
    
              </li>
            
            ))}
            
            </ul>
      </main>
    </div>
  );
}

export default App;

/*
exemplo de componente mas estados 
function App() {
  const [counter, setCounter]= useState(0);

  function incrementCounter(){
    setCounter(counter + 1);
  }


  return (
  <>
<h1>contador:{counter}</h1>
<button onClick={incrementCounter}>incrementar</button>
  </>
  );
}


*/
