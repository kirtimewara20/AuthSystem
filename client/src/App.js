
import './App.css';
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard';
import {Routes , Route } from 'react-router-dom'
function App() {
  return (
    <div className="App">
        
        <Routes>
          <Route path='/' element={ <Login />}/>
            <Route path='/signup' element={<Signup />} />
            <Route path='/dashboard' element= {<Dashboard /> } />
        </Routes>
                
    </div>
  );
}

export default App;
