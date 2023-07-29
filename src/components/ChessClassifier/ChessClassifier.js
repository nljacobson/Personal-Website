import { React, useState } from 'react';
import './ChessClassifier.css';
import { PlayerList } from './PlayerList.js';
import { Chessboard } from 'react-chessboard';
import axios from "axios";
import { Chess } from 'chess.js';
import { chessDescription, howToUse } from './ChessDescription.js';
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
        const port = 5000;
        const host = window.location.hostname
        axios.get(`http://${host}:${port}/api/chess?fen=${fen}`)
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
        <div className='chess-wrapper-horizontal'>
                <PlayerList
                    props={[whiteGuesses, 'White']}
                />
            <div className='chessboard'>
                <div className='button-wrapper'>
                    <button className='reset-button'
                        onClick={resetBoard}>
                        Reset
                    </button>
                </div>
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
            </div>
                <PlayerList
                    props={[blackGuesses, 'Black']}
                />
            <div className='chess-description-wrapper'>
                <h5 className='chess-description'>Chess Player Classifier</h5>
                <p className='chess-description' >{chessDescription}</p>
                <p className='chess-description' >{howToUse}</p>
            </div>
        </div>
    )
}
