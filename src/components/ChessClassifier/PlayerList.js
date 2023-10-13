import { React } from 'react';
import './PlayerList.css';
import { Grid, Typography } from '@mui/material';
export function PlayerList(props) {
    const guesses_array = props.props[0];
    const color = props.props[1];
    return (
        <Grid container padding={2}>
            <Grid item>
                <Grid container>
                    <Grid item xs={8}>
                        <Typography align='left' variant='overline'>{color} Player</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography align='right' variant='overline'>Certainty</Typography>
                    </Grid>
                </Grid>
            </Grid>
            {
                guesses_array.map((player) => (
                    <PlayerEntry key={player[0]} props={{ player }} />
                ))
            }
        </Grid>
    );
}

function PlayerEntry(player) {
    const playerName = player.props.player[0];
    const playerCertainty = player.props.player[1];
    return (
        <Grid container>
            <Grid item xs={8}>
                <Typography align='left' variant='body2'>{Trim(playerName)}</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography align='right' variant='body2'>{playerCertainty}</Typography>
            </Grid>
        </Grid>

    );
}

function Trim(str){
    if (str.length < 16){
        return str;
    }
    else{
        return str.slice(0, 16) + '...';
    }
}