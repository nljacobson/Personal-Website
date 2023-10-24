import React, { useEffect, useRef, useState } from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import axios from "axios";
import { WordleDescription } from './WordleDescription'

const wordleBackgrounds = {
    grey: '#666666',
    green: '#6ca965',
    yellow: '#c8b653',
    error: '#ff0000',
    white: '#ffffff'
}
interface RunData {
    guesses: string[],
    word: string
}
export function Wordle(serverStatus: boolean, backendHostname: string) {
    const [guessState, setGuessState] = useState<string[]>(Array(6).fill(' '.repeat(5)));
    var guesses = useRef<string[]>(Array(6).fill(' '.repeat(5)));
    var colors = useRef<string[]>(Array(6).fill('W'.repeat(5)));
    var numWords = useRef<number[]>([])
    var word = useRef('');
    var guessNum = useRef<number>(0);
    var charNum = useRef<number>(0);
    const [playing, setPlaying] = useState<Boolean>(false);
    useEffect(() => {
        resetGame();
        document.addEventListener('keydown', handleKeyPress);
        // eslint-disable-next-line
    }, []);
    return (
        <Grid container spacing={1} style={{ height: '100%' }} padding={2}>
            <Grid item xs={8} >
                <Button variant='contained'
                    color='primary'
                    fullWidth={true}
                    onClick={resetGame}>
                    {serverStatus ? 'Reset' : 'Starting Backend Server from cold state. This may take a minute'}
                </Button>
                <Grid container direction={'column'}>
                    {
                        guessState.map((guess, i) => (
                            <Grid item key={i}>
                                <WordleRow
                                    guess={guess}
                                    color={colors.current[i]}
                                    numWords={numWords.current[i]}
                                    rowNum={i}
                                    isCurrentGuess={i === guessNum.current} />
                            </Grid>
                        ))
                    }
                </Grid>
                {!playing &&
                    <Typography variant='h6'>{numWords.current[numWords.current.length-1]===1 ? 'Correct, well done!' : 'Better luck next time, the word was "' + word.current + '"'}</Typography>
                }
            </Grid>
            <Grid item xs={4} padding={2}>
                <WordleDescription/>
            </Grid>
        </Grid>
    )
    function handleKeyPress(event: KeyboardEvent) {
        if (isLetter(event.key) && charNum.current < 5) {
            guesses.current = guesses.current.map((guess, i) => {
                if (i === guessNum.current) {
                    return guess.slice(0, charNum.current) + event.key + ' '.repeat(4 - charNum.current);
                }
                else {
                    return guess
                }
            })
            setGuessState(guesses.current)
            charNum.current = charNum.current + 1
        }
        else {
            if (event.key === 'Backspace' && charNum.current > 0) {
                guesses.current = guesses.current.map((guess, i) => {
                    if (i === guessNum.current) {
                        return guess.slice(0, charNum.current - 1) + ' '.repeat(6 - charNum.current)
                    }
                    else {
                        return guess
                    }
                })
                setGuessState(guesses.current)
                charNum.current = charNum.current - 1
            }
            if (event.key === 'Enter' && charNum.current === 5) {
                const runData: RunData = { "guesses": guesses.current, "word": word.current }
                makeGuess(runData);
            }
        }
    }
    async function resetGame() {
        const hostname = backendHostname + `/api/wordlecreate`
        return axios.get(hostname)
            .then((response) => {
                const results = response.data;
                guesses.current = results.guesses
                colors.current = results.letterColors
                setPlaying(()=>true)
                numWords.current = []
                setGuessState(guesses.current)
                word.current = results.word;
                charNum.current = 0
                guessNum.current = 0
            })

    }
    async function makeGuess(runData: RunData) {
        const hostname = backendHostname + `/api/wordleguess`
        return axios.post(hostname,
            {
                mode: 'no-cors',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
                credentials: 'same-origin',
                params: {
                    run_data: runData
                }
            })
            .then((response) => {
                const results = response.data;
                if (results.result === 0) {
                    guesses.current = results.guesses
                    colors.current = results.letterColors
                    guessNum.current = guessNum.current + 1
                    numWords.current.push(results.num_possibilities)
                    charNum.current = 0
                }
                setGuessState(guesses.current)
                setPlaying(() => results.playing)
            })
    }
}

interface WordleRowProps {
    guess: string
    color: string
    rowNum: number
    isCurrentGuess: boolean
    numWords: number
}
function WordleRow(props: WordleRowProps) {
    const numWords = props.numWords
    const guess = props.guess
    var color = props.color
    const rowNum = props.rowNum
    const isCurrentGuess = props.isCurrentGuess
    var guessList: string[] = guess.split('')
    return (
        <Grid container padding={2} columns={8}>
            {
                guessList.map((letter, i) => (
                    <Grid item key={10 * rowNum + i} xs={1}>
                        <Box display='flex' m="auto" alignItems='center' justifyContent='center' borderColor={wordleBackgrounds.grey} sx={{ border: 1, backgroundColor: getBackgroundColor(color[i]), width: '4vw', height: '4vw' }}>
                            <Typography align='center' sx={{ fontSize: '3vw' }} color={isCurrentGuess ? 'black' : 'white'}>{letter}</Typography>
                        </Box>
                    </Grid>))
            }
            {
                (props.numWords !== undefined) &&
                <Grid item xs={1}>
                    <Box display='flex' m="auto" alignItems='center' justifyContent='center' flexDirection='column' borderColor={wordleBackgrounds.grey} sx={{ border: 1, backgroundColor: 'white', width: '12vw', height: '4vw' }}>
                        <Typography align='center' sx={{ fontSize: '1vw' }} color={'black'}>Number of legal guesses:</Typography>
                        <Typography align='center' sx={{ fontSize: '1vw' }} color={'black'}>{numWords}</Typography>
                    </Box>
                </Grid>
            }
        </Grid>
    )
}

function getBackgroundColor(colorChar: string) {
    if (colorChar === ' ') {
        return wordleBackgrounds.grey
    }
    if (colorChar === 'Y') {
        return wordleBackgrounds.yellow
    }
    if (colorChar === 'G') {
        return wordleBackgrounds.green
    }
    if (colorChar === 'W') {
        return wordleBackgrounds.white
    }
    return wordleBackgrounds.error
}
//Function from https://stackoverflow.com/questions/9862761/how-to-check-if-character-is-a-letter-in-javascript
function isLetter(str: string) {
    return str.length === 1 && str.match(/[a-z]/i);
}