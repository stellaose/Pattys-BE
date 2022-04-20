import './App.css';
import { Routes, Route} from 'react-router-dom';
import Landing from './Pages/Landing';
import Login from './Pages/Login';
import NavBar from './Components/NavBar/NavBar';
import Profile from './Pages/Profile'
import Register from './Pages/Register'

function App() {
  return (
    <div className="App">
      <NavBar />
        <Routes>
          <Route exact path='/' element={<Landing/>} />
        </Routes>

        <Routes>
          <Route exact path = 'profile' element= {<Profile />}/>
        </Routes>

        <Routes>
          <Route exact path = 'login' element= {<Login />}/>
        </Routes>

        <Routes>
          <Route exact path = 'register' element= {<Register />}/>
        </Routes>
    </div>
  );
}

export default App;
