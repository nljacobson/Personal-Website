import React from 'react';
import { Typography } from '@mui/material';
export function WordleDescription() {
    return (
        <div>
            <Typography variant="h5">
                Wordle (Hard Mode)
            </Typography>
            <br/>
            <Typography>
                This project is inspired by the way that my mom plays the New York Times' game 'Wordle'. 
                The rules are almost identical to the original, in that you are guessing five letter words to attempt to find a single secret word.
                With each input you are given more information on which letters are in the secret word. 
            </Typography>
            <br/>
            <Typography>
                If a letter is highlighed in green, that means that the letter is at the correct location in the word.
            </Typography>
            <br/>
            <Typography>
                If the letter is yellow, then the letter is in the word, but in the wrong location.
            </Typography>
            <br/>
            <Typography>
                If the letter is grey, then the letter is not in the word altogether. 
            </Typography>
            <br/>
            <Typography>
                The difference in this version is that once you get a green letter (or letters), you may not guess words that do not have said green letter(s) at that location. 
                Additionally, every yellow letter that you have guessed must be somewhere in the word. 
            </Typography>
            <br/>
            <Typography>
                This implementation of wordle is using the original wordle possible guess list, as well as the original possible word list. 
                I've also included a counter after each guess on how many legal words are left in the list of legal possibilities to input.
            </Typography>
            <br/>
            <Typography>
                This is just the first part of a more ambitious project that I have planned to solve this version of wordle using an artificial neural network to decide the most precise guesses. 
                In order to solve this game, I first needed a model with which to score it against, which is what this is. This part of the project is coming soon to this website.
            </Typography>
        </div>
    );
}