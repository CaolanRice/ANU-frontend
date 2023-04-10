import './App.css';
import GodisList from './components/GodisList';
import DeleteGodis from './components/DeleteGodis';


const App = ()=> {
  const godisId = "641b6533d47623ea6a67be95";
    return (
      <div>
        <GodisList/>
        <DeleteGodis godisId={godisId}/>
      </div>
    );
    };
  

export default App;
