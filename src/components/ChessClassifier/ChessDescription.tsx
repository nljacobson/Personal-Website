import React from 'react';
import { Typography } from '@mui/material';
export function ChessDescription() {
    return (
        <div>
            <Typography variant="h5">
                Grandmaster Chess Game Classifying Neural Network
            </Typography>
            <br/>
            <Typography>
                This project was an attempt to further my chess skills while also learning how to design and train neural networks.
                I was looking to study grandmaster games to see where my openings differ from their's, and I wanted to programmatically discover which
                top player I played most similarly to. This project has a dataset of about 750,000 chess games all played between grandmasters on chess.com
                that are rated in the top 50 in the world at 3 minute chess. From these games, the board positions between moves 23 and 64 were used to train
                two fully connected neural nets to identify both the black and white player. Currently, the cross validated accuracies of these models are
                about 97.15% and 96.9%. Note that the accuracy of initial moves is highly dubious because of the lack of training on early game board states.
            </Typography>
            <br/>
            <Typography>
            To use, drag the chess pieces to play moves. The neural net will analyze the board state after each move is played and 
            will return a list of the top 10 most likely players to be playing, as well as it's certainty that it is correct
            </Typography>
        </div>
    );
}
