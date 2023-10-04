import { Box, Typography, ButtonGroup, IconButton } from '@mui/material';
import LocalPhoneSharpIcon from '@mui/icons-material/LocalPhoneSharp';
import EmailSharpIcon from '@mui/icons-material/EmailSharp';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
//import './Header.css';
export function Header() {
    return (
        <Box
            backgroundColor='info.main'
            display='flex'
            flexDirection='row'>
            <Box
                width='80%'>
                <Typography color='info.light' m={2} sx={{fontFamily: "Gill Sans"}} >Noah Jacobson</Typography>
                <Typography color='info.light' m={2} ml={4} sx={{fontFamily: "Gill Sans"}} >Software Developer and Physicist</Typography>
            </Box>
            <ButtonGroup
                orientation='vertical'
            >
                <IconButton color='primary'>
                    <LocalPhoneSharpIcon />
                    <Typography width={256} sx={{ textAlign: 'left', paddingLeft: '3px' }}>508-314-7503</Typography>
                </IconButton >
                <IconButton color='primary'>
                    <EmailSharpIcon />
                    <Typography width={256} sx={{ textAlign: 'left', paddingLeft: '3px' }}>Noah.l.jacobson@gmail.com</Typography>
                </IconButton>
                <IconButton color='primary'>
                    <FmdGoodIcon />
                    <Typography width={256} sx={{ textAlign: 'left', paddingLeft: '3px' }}>Quincy, MA</Typography>
                </IconButton>
            </ButtonGroup>
        </Box>
    )
}