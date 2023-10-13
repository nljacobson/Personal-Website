import { React, useState } from 'react';
import './ChessClassifier.css';
import { PlayerList } from './PlayerList.js';
import { Chessboard } from 'react-chessboard';
import axios from "axios";
import { Chess } from 'chess.js';
import { ChessDescription } from './ChessDescription.js';
import { Button, Grid } from '@mui/material';
export function ChessClassifier() {
    const [whiteGuesses, setWhiteGuesses] = useState([])
    const [blackGuesses, setBlackGuesses] = useState([])
    const [game, setGame] = useState(new Chess());
    function onDrop(startSquare, endSquare) {
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
    }

    function getGuesses(fen) {
        const hostname = `https://noah-jacobson-backend.azurewebsites.net/api/chess?fen=${fen}`
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
        <Grid container>
            <Grid item xs={8}>
                <Grid container padding={2}>
                    <Button variant='contained'
                        color='primary'
                        fullWidth={true}
                        onClick={resetBoard}>
                        Reset
                    </Button>
                    </Grid>
                    <Grid container>
                        <Grid item xs={3}>
                            <PlayerList props={[whiteGuesses, 'White']} />
                        </Grid>
                        <Grid item xs={6}>
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
                        <Grid item xs={3}>
                            <PlayerList props={[blackGuesses, 'Black']} />
                        </Grid>
                </Grid>
            </Grid>
            <Grid item xs={4}>
                <ChessDescription />
            </Grid>
        </Grid>
    )
}
