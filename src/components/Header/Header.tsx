import { Grid, Typography, IconButton} from '@mui/material';
import LocalPhoneSharpIcon from '@mui/icons-material/LocalPhoneSharp';
import EmailSharpIcon from '@mui/icons-material/EmailSharp';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
export function Header() {
    return (
        <Grid sx={{ backgroundColor: 'info.main', height: '100%' }} container direction={'row'}>
            <Grid item xs={2}>
                <Grid container direction={'column'} padding={3} spacing={3}>
                    <Grid item>
                        <Typography color='info.light' sx={{ fontFamily: "Gill Sans" }} >Noah Jacobson</Typography>
                    </Grid>
                    <Grid item>
                        <Typography color='info.light' ml={3} sx={{ fontFamily: "Gill Sans" }} >Software Developer and Physicist</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={10}>
                <Grid container
                    direction={'row-reverse'}>
                    <Grid item xs={4}>
                        <Grid container padding = {2} direction={'column'}>
                            <Grid item>
                                <IconButton color='primary'
                                href={`tel:50873147503`}>
                                    <LocalPhoneSharpIcon />
                                    <Typography paddingLeft={1}>508-314-7503</Typography>
                                </IconButton >
                            </Grid>
                            <Grid item>
                                <IconButton color='primary'
                                href={`mailto:noah.l.jacobson@gmail.com`}>
                                    <EmailSharpIcon />
                                    <Typography paddingLeft={1}>Noah.l.jacobson@gmail.com</Typography>
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <IconButton color='primary'
                                target={'_blank'}
                                href={`https://www.google.com/maps/@42.2589832,-71.0566944,13z?entry=ttu`}>
                                    <FmdGoodIcon />
                                    <Typography paddingLeft={1}>Quincy, MA</Typography>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}