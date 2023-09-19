import './NavBar.css'
import { Link } from "react-router-dom";
import { Button, Grid } from '@mui/material';
export function NavBar() {
    // Idea for MUI button redirects from https://stackoverflow.com/questions/55796665/react-material-ui-router-redirect-button
    return (
        <Grid container
        backgroundColor='secondary.main'
        width='100%'
        height='100%'
        direction='column'
        rowSpacing={1}
        >
            <Grid item className='page-link'>
                <Button variant='contained' fullWidth={true}
                    component ={Link} to={'/'}>
                        Resume
                </Button>
            </Grid>
            <Grid item>
                <Button variant='contained' fullWidth={true}
                    component={Link} to={'/chess'}
                    >Chess Player Classifier
                </Button>
                </Grid>
            <Grid item>
                <Button variant='contained' fullWidth={true}
                    component={Link} to={'/qho'}
                    >Quantum Harmonic Oscillator
                </Button>
                </Grid>
        </Grid>
    )
}