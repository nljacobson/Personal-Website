import { Header } from './components/Header/Header.tsx';
import { NavBar } from './components/NavBar/NavBar.tsx';
import { Resume } from './components/Resume/Resume.tsx';
import { QHO } from './components/QHO/QHO.tsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { Grid } from '@mui/material';
import { theme } from './components/Theme.tsx';
import { ChessClassifier } from './components/ChessClassifier/ChessClassifier.js';
import React, { useEffect } from 'react';
export default function App() {
  useEffect(() => {
    document.title = 'Noah Jacobson';
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Grid container direction={'column'} style={{ flexWrap: 'nowrap' }} sx={{width: '100vw', height:'100vh'}}>
        <Grid item xs={1}>
          <Header />
        </Grid>
        <Grid item xs={11}>
          <Grid container direction={'row'} sx={{height:'100%'}}>
            <Router>
              <Grid item xs={2}>
                <NavBar />
              </Grid>
              <Grid item xs={10}>
                <Routes>
                  <Route path='/' element={Resume()} />
                  <Route path='/chess' element={<ChessClassifier />} />
                  <Route path='/qho' element={QHO()} />
                  <Route path='/*' element={<p>Error</p>} />
                </Routes>
              </Grid>
            </Router >
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}