import React, { useState, useRef } from 'react';
import axios from "axios";
import { Slider, Button, Grid, Typography } from '@mui/material';
import { BiaxialStyledLineGraph } from './BiaxialStyledLineGraph';
interface numRefObject {
    current: number
}

interface RunData {
    Vext: number[]
    X: number[]
    counter: number
    done: boolean
    error: number
    error_record: number[]
    itarray: number[]
    mu_record: number[]
    num_iters: number
    u: number[]
}
export function QHO(serverStatus: boolean, backendHostname: string) {
    //Webpage specific variables
    var n: numRefObject = useRef<number>(0);
    const [startable, setStartable] = useState<boolean>(true);
    //Graphed data
    const [muRecord, setMuRecord] = useState<number[]>([]);
    const [errorRecord, setErrorRecord] = useState<number[]>([]);
    const [u, setU] = useState<number[]>([]);
    const [vext, setVext] = useState<number[]>([]);
    //Graphed domain
    const [x, setX] = useState<number[]>([]);
    const [iterationArray, setIterationArray] = useState<number[]>([0]);
    //Graphing information
    const [muTicks, setMuTicks] = useState<number[]>([]);
    const logTicks = range(0, -10, -1);
    const vextTicks = range(-45, 45, 5);
    const funcTicks = range(-9, 9, 3);
    const ampTicks = range(-1, 1, .25);
    //Themeing info
    const theme = require('../../components/Theme.tsx').theme;
    return (
        <Grid container height = {'100%'}>
            <Grid container padding={2}>
                <Button variant='contained'
                    color='primary'
                    fullWidth={true}
                    onClick={performRun}
                >{getButtonText()}
                </Button>
                <Slider
                    defaultValue={0}
                    orientation='horizontal'
                    onChange={(event: Event, value: number | number[]) => {
                        const flatValue: number = Array.isArray(value) ? value[0] : value;
                        n.current = flatValue
                    }}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={0}
                    max={10}
                    size='medium'
                />
            </Grid>
            <Typography variant='h6' align='center'>Wave function and Potential function</Typography>
            <BiaxialStyledLineGraph
                X={x}
                xTicks={funcTicks}
                Y0={u.map((n) => { return round(n, 5) })}
                Y1={vext.map((n) => { return round(n, 2) })}
                yAxisDirections={['left']}
                leftYAxisLabel='Probability Amplitude'
                rightYAxisLabel='Potential (units of energy)'
                XAxisLabel='X (units of space)'
                leftTicks={ampTicks}
                rightTicks={vextTicks}
                theme={theme}
            />
            <Typography variant='h6' align='center'>Error and Energy level</Typography>
            <BiaxialStyledLineGraph
                X={iterationArray}
                xTicks={range(0, Math.max(...iterationArray), getStepSize(iterationArray))}
                Y0={errorRecord.map((n) => { return round(n, 5) })}
                Y1={muRecord.map((n) => { return round(n, 5) })}
                yAxisDirections={['left']}
                leftYAxisLabel='log10 Error'
                leftTicks={logTicks}
                rightYAxisLabel='Energy Level (hbar &omega;)'
                rightTicks={muTicks}
                XAxisLabel='Number of Iterations'
                theme={theme}
            />
        </Grid>
    )
    async function startRun() {
        if (startable) {
            setStartable(false);
            setMuTicks(range(0, n.current + 1, .5));
            const hostname = backendHostname + `/api/post_qho_first`
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
                        n: n.current,
                    }
                })
                .then((response) => {
                    var runData = response.data;
                    setVext(runData['Vext']);
                    setX(runData['X']);
                    return runData;
                })
        }
    }
    async function getNextRunData(runData: RunData) {
        const hostname = backendHostname + '/api/post_qho_run'
        const post = await axios.post(hostname,
            {
                mode: 'no-cors',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
                credentials: 'same-origin',
                params: {
                    run_data: runData,
                },
            }).then((response) => {
                const runData = response.data;
                //Update main wavefunction arrays
                setU(runData['u']);
                //Update Mu and Error arrays
                setIterationArray(runData['itarray']);
                setMuRecord(runData['mu_record']);
                setErrorRecord(runData['error_record']);
                return runData;
            })
        return post
    }

    async function performRun() {
        if (startable) {
            var runData = await startRun();
            var runCount = 0;
            while (!runData['done'] && runCount < 10) {
                runData = await getNextRunData(runData);
            }
            setStartable(true);
        }
    }
    function getButtonText() {
        if (!serverStatus) {
            return 'Starting Backend Server from cold state. This may take a minute'
        }
        if (!startable) {
            return 'Calculating'
        }
        else {
            return 'Start Iterations'
        }
    }
}

function range(start: number, end: number, step: number) {
    var output = [];
    // Validate input
    if (step > 0 && start < end) {
        while (start <= end) {
            output.push(start);
            start = start + step;
        }
    }
    if (step < 0 && start > end) {
        while (start >= end) {
            output.push(start);
            start = start + step;
        }
    }
    return output;

}
function getStepSize(itArray: number[]) {
    // Orders of magnitude below the max value
    var orderMagReduct = 1;
    // Number of base 10 units in each step i.e. a order magnitude of 3 should be 1000, but in this case we want multiples of 2000
    // This is solely to avoid number overlap when plotting successive iterations
    var stepMult = 5;
    var maxValue = Math.max(...itArray);
    if (maxValue !== 0) {
        var logTen = Math.round(Math.log10(maxValue));
        var stepSize = stepMult * (10 ** (logTen - orderMagReduct));
        return stepSize
    }
    else {
        return 1;
    }
}

function round(n: number, to: number) {
    return Number(n.toFixed(to))
}