import React, { useState } from 'react';
import { PlayerList } from './PlayerList';
import { Chessboard } from 'react-chessboard';
import axios from "axios";
import { Chess, Square } from 'chess.js';
import { ChessDescription } from './ChessDescription';
import { Button, Grid } from '@mui/material';
export function ChessClassifier(serverStatus:boolean, backendHostname:string) {
    const [whiteGuesses, setWhiteGuesses] = useState([])
    const [blackGuesses, setBlackGuesses] = useState([])
    const [game, setGame] = useState(new Chess());
    function onDrop(startSquare: Square, endSquare: Square) {
        const gameCopy = new Chess();
        gameCopy.loadPgn(game.pgn());
        try {
            gameCopy.move({
                from: startSquare,
                to: endSquare,
                promotion: "q",
            });
            setGame(gameCopy);
            if (game.moveNumber() >= 0) {
                getGuesses(gameCopy.fen())
            }
        }
        catch {
            console.log("Illegal Move!")
        }
        return true
    }

    function getGuesses(fen: string) {
        const hostname = backendHostname + `/api/chess?fen=${fen}`
        axios.get(hostname)
            .then((response) => {
                const res = response.data
                setBlackGuesses(res.blackGuesses)
                setWhiteGuesses(res.whiteGuesses)
            }
            )
    }
    function resetBoard() {
        setGame(new Chess());
        setBlackGuesses([]);
        setWhiteGuesses([]);
    }
    return (
        <Grid container sx={{margin:0}}>
            <Grid item xs={12} lg={8}>
                <Grid container padding={2}>
                    <Button variant='contained'
                        color='primary'
                        fullWidth={true}
                        onClick={resetBoard}>
                        {serverStatus ? 'Reset' : 'Starting Backend Server from cold state. This may take a minute'}
                    </Button>
                    </Grid>
                    <Grid container >
                    <Grid item xs={12} lg={3} margin={0} >
                            <PlayerList guessesArray={blackGuesses} color={'Black'} />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Chessboard
                                id="Configurable Board"
                                position={game.fen()}
                                onArrowsChange={function noRefCheck() { }}
                                onDragOverSquare={function noRefCheck() { }}
                                onMouseOutSquare={function noRefCheck() { }}
                                onMouseOverSquare={function noRefCheck() { }}
                                onPieceClick={function noRefCheck() { }}
                                onPieceDragBegin={function noRefCheck() { }}
                                onPieceDragEnd={function noRefCheck() { }}
                                onPieceDrop={onDrop}
                                onSquareClick={function noRefCheck() { }}
                                onSquareRightClick={function noRefCheck() { }}
                            />

                        </Grid>
                        <Grid item sm = {12} lg={3}>
                            <PlayerList guessesArray={whiteGuesses} color={'White'} />
                        </Grid>
                        
                </Grid>
            </Grid>
            <Grid item xs={12} lg = {4}>
                <ChessDescription />
            </Grid>
        </Grid>
    )
}
