import './App.css';
import { Container } from 'semantic-ui-react';
import Dashboard from './layouts/Dashboard';
import 'semantic-ui-css/semantic.min.css'
import Navi from './layouts/Navi';

function App() {
  return (
    <div className="App">
      <Navi/>
      <Container className = "main">
        <Dashboard />
      </Container>            
    </div>
  );
}

export default App;
