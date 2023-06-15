import './App.css';
import { Header } from './components/Header/Header.js';
import { NavBar } from './components/NavBar/NavBar.js';
import { Resume } from './components/Resume/Resume.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChessClassifier } from './components/ChessClassifier/ChessClassifier.js';
export default function App() {
  return (
    <div className='app'>
      <Header />
      <div className='nav-and-body'>
        <Router>
          <NavBar className='navbar' />
          <div>
            <Routes>
              <Route exact path='/' element={Resume()} />
              <Route exact path='/chess' element={<ChessClassifier />} />
            </Routes>
          </div>
        </Router >
      </div>
    </div>
  );
}