import { React } from 'react';
import './PlayerList.css';
export function PlayerList(props) {
    const guesses_array = props.props[0];
    const color = props.props[1];
    return (
        <div className='player-list'>
            <div className='player-entry'>
                <h5>{color} Player</h5>
                <h5>Certainty</h5>
            </div>
            {
                guesses_array.map((player) => (
                    <PlayerEntry key = {player[0]} props={{player}} />
                ))
            }
        </div>
    );}

function PlayerEntry(player) {
    const playerName = player.props.player[0];
    const playerCertainty = player.props.player[1];
    return (
        <div className='player-entry'>
            <h6>{playerName}</h6>
            <h6>{playerCertainty}</h6>
        </div>
    );
}