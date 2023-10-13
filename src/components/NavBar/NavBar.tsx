import { Link } from "react-router-dom";
import { Button, Grid, Box } from '@mui/material';
export function NavBar() {
    // Idea for MUI button redirects from https://stackoverflow.com/questions/55796665/react-material-ui-router-redirect-button
    return (
        <Box sx={{ backgroundColor: 'secondary.main', height: '100%'}}>
            <Grid container
                direction='column'
            >
                <MenuItem
                    name='Resume'
                    path='/' />
                <MenuItem
                    name='Chess Player Classifier'
                    path='/chess' />
                <MenuItem
                    name='Quantum Harmonic Oscillator'
                    path='/qho' />
            </Grid>
        </Box>
    )
}
interface MenuItemProps {
    name: string,
    path: string,
}
//Menu item
function MenuItem(props: MenuItemProps) {
    return (
        <Grid item paddingTop={1}>
            <Button 
            variant='contained' 
            fullWidth={true}
            component={Link} 
            to={props.path}
            >{props.name}
            </Button>
        </Grid>
    )
}