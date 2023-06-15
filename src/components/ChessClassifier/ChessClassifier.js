import {React, useState} from 'react';
import './ChessClassifier.css'
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
//import { Chess } from 'chess.js';
//Note: View is taken from 
export function ChessClassifier() {
    return (
        <div className='chess-wrapper'>
            <div className='player-guesses'>
                <h3>Black Player</h3>
            </div>
            <div className='chessboard'>
                <ChessBoard/>
            </div>
            <div className='player-guesses'>
                <h3>White Player</h3>
            </div>
        </div>
    )

}

function ChessBoard(){
    const [game, setGame] = useState(new Chess());
    
    //Method for validating move and updating game
    function onDrop(startSquare, endSquare){
        const gameCopy = new Chess();
        gameCopy.loadPgn(game.pgn());
        console.log(game.moves())
        try{
            gameCopy.move({
                from: startSquare,
                to: endSquare,
                promotion: "q",
              });
              setGame(gameCopy);
              
        }
        catch{
            console.log("Illegal Move!")
        }
        return true
    }
    return(<Chessboard
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
                />)
}
