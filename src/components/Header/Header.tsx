import { Grid, Typography, IconButton } from '@mui/material';
import LocalPhoneSharpIcon from '@mui/icons-material/LocalPhoneSharp';
import EmailSharpIcon from '@mui/icons-material/EmailSharp';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
export function Header() {
    return (
        <Grid sx={{backgroundColor:'info.main', height:'100%'}} container direction = {'row'}>
            <Grid item xs ={2}>
                <Grid container direction ={'column'} padding = {3} spacing={3}>
                    <Grid item>
                    <Typography color='info.light' sx={{fontFamily: "Gill Sans"}} >Noah Jacobson</Typography>
                    </Grid>
                    <Grid item>
                    <Typography color='info.light' ml={3} sx={{fontFamily: "Gill Sans"}} >Software Developer and Physicist</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={10}>
                <Grid container 
                direction = {'row-reverse'}>
                <Grid item xs = {4}>
                    <Grid container direction = {'column'}>
                        <Grid item>
                        <IconButton color='primary'>
                            <LocalPhoneSharpIcon />
                            <Typography>508-314-7503</Typography>
                        </IconButton >
                        </Grid>
                        <Grid item>
                        <IconButton color='primary'>
                            <EmailSharpIcon />
                            <Typography>Noah.l.jacobson@gmail.com</Typography>
                        </IconButton>
                        </Grid>
                        <Grid item>
                        <IconButton color='primary'>
                            <FmdGoodIcon />
                            <Typography>Quincy, MA</Typography>
                        </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}