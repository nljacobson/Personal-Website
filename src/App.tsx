import { Header } from './components/Header/Header';
import { NavBar } from './components/NavBar/NavBar';
import { Resume } from './components/Resume/Resume';
import { QHO } from './components/QHO/QHO';
import { Wordle } from './components/Wordle/Wordle';
import { theme } from './components/Theme';
import { ChessClassifier } from './components/ChessClassifier/ChessClassifier';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { Grid } from '@mui/material';
import axios from "axios";
export default function App() {
  const [serverStatus, setServerStatus] = useState(false);
  const backendHostname = 'https://noah-jacobson-backend.azurewebsites.net'
  useEffect(() => {
    document.title = 'Noah Jacobson';
    getTestPost(backendHostname);
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Grid container direction={'column'} style={{ flexWrap: 'nowrap' }} sx={{ width: '100vw', height: '100vh' }}>
        <Grid item xs={1}>
          <Header />
        </Grid>
        <Grid item xs={11}>
          <Grid container direction={'row'} sx={{ height: '100%', margin: 0 }}>
            <Router>
              <Grid item xs={12} lg={2}>
                <NavBar />
              </Grid>
              <Grid item xs={10} sx={{ minWidth: '800px' }}>
                <Routes>
                  <Route path='/' element={Resume()} />
                  <Route path='/chess' element={ChessClassifier(serverStatus, backendHostname)} />
                  <Route path='/qho' element={QHO(serverStatus, backendHostname)} />
                  <Route path='/wordle' element={Wordle(serverStatus, backendHostname)} />
                  <Route path='/*' element={<p>Error</p>} />
                </Routes>
              </Grid>
            </Router >
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
  async function getTestPost(backendHostname:string) {
    setServerStatus(false);
    const hostname = backendHostname +'/api/testpost'
    console.log(hostname)
    await axios.post(hostname,
      {
        mode: 'no-cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        credentials: 'same-origin',
      }).then((response) => {
        setServerStatus(true);
      })
  }
}