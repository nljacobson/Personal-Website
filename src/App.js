import './App.css';
import { Header } from './components/Header/Header.js';
import { NavBar } from './components/NavBar/NavBar.js';
import { Resume } from './components/Resume/Resume.js';
import { QHO } from './components/QHO/QHO.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { Grid } from '@mui/material';
import { theme } from './components/Theme.js';
import { ChessClassifier } from './components/ChessClassifier/ChessClassifier.js';
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Grid container className='app'
      spacing={1}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Router>
          <Grid item xs={2} className='navbar'>
            <NavBar />
          </Grid>
          <Grid item xs={10}>
            <Routes className='routes'>
              <Route path='/' element={Resume()} />
              <Route path='/chess' element={<ChessClassifier />} />
              <Route path='/qho' element={QHO(theme)} />
              <Route path='/*' element={<p>Error</p>} />
            </Routes>
          </Grid>
        </Router >
      </Grid>
    </ThemeProvider>
  );
}