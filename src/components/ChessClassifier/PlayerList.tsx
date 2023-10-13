import React from 'react';

interface PlayerListProps{
    guessesArray: [string, number][]
    color: string
}
export function PlayerList(props: PlayerListProps) {
    const guessesArray = props.guessesArray;
    const color = props.color;
    return (
        <table style={{ padding: '8px', width: '100%' }}>
            <thead>
                <tr>
                    <th style={{ fontSize: 12, textAlign: 'left' }}>{color} Player</th>
                    <th style={{ fontSize: 12, textAlign: 'right' }}>Certainty</th>
                </tr>
            </thead>
            <tbody>
                {

                    guessesArray.map((player) => (
                        <tr key={player[0]}>
                            <td style={{ fontSize: 12, textAlign: 'left' }}> {Trim(player[0], 12)}</td>
                            <td style={{ fontSize: 12, textAlign: 'right' }}> {player[1]}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

function Trim(str: string, length: number) {
    if (str.length < length) {
        return str;
    }
    else {
        return str.slice(0, length) + '...';
    }
}