export let chessDescription = 
`    This project was an attempt to further my chess skills while also learning how to design and train neural networks.
I was looking to study grandmaster games to see where my openings differ from theres, and I wanted to programmatically discover which
top player I played most similarly to. This project has a dataset of about 750,000 chess games all played between grandmasters on chess.com 
that are rated in the top 50 in the world at blitz chess. From these games, the board positions between moves 8 and 32 were used to train 
two fully connected neural nets to identify both the black and white player. Currently, the cross validated accuracies of these models are 
about 80.08% and 72.1% respectively but this may change with further breakthroughs in development.\n\n`;

export let howToUse =`  To use, play the first 8 moves of a chess game on the board above. After move 7, it will display the model's guesses of who is playing both sides. 
Note: The accuracy of this model falls off dramatically after move 32, although it will continue rendering guesses.`;