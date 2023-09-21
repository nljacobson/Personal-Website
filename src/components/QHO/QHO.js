import { React, useState, useRef } from 'react';
import './QHO.css';
import './QHODescription';
import axios from "axios";
import { Slider, Button, Grid, Box} from '@mui/material';
import { BiaxialStyledLineGraph } from './BiaxialStyledLineGraph';
import { QHODescription } from './QHODescription';
export function QHO() {
    //Webpage specific variables
    var n = useRef(0);
    const [startable, setStartable] = useState(true);
    //Graphed data
    const [muRecord, setMuRecord] = useState([]);
    const [errorRecord, setErrorRecord] = useState([]);
    const [u, setU] = useState([]);
    const [vext, setVext] = useState([]);
    //Graphed domain
    const [x, setX] = useState([]);
    const [iterationArray, setIterationArray] = useState([0]);
    //Graphing information
    const [muTicks, setMuTicks] = useState([]);
    const logTicks = range(0, -10, -1);
    const vextTicks = range(-45, 45, 5);
    const funcTicks = range(-9, 9, 3);
    const ampTicks = range(-1, 1, .25);
    //Themeing info
    const theme = require('components/Theme.js').theme;
    return (
        <Grid container spacing={1} className='qho-page'>
            <Grid item xs={5} className='graphs'>
                <Grid container spacing={1} className='graph-container'>
                    <Grid item xs={12}>
                        <BiaxialStyledLineGraph className='main-graph'
                            X={x}
                            xTicks={funcTicks}
                            Y0 = {u}
                            Y1 = {vext}
                            title='Wavefunction'
                            leftYAxisLabel='Probability Amplitude'
                            rightYAxisLabel='Potential (units of energy)'
                            XAxisLabel='X (units of space)'
                            leftTicks={ampTicks}
                            rightTicks={vextTicks}
                            theme = {theme}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <BiaxialStyledLineGraph className='main-graph'
                        X={iterationArray}
                        xTicks={range(0, Math.max(...iterationArray), getStepSize(iterationArray))}
                        Y0={errorRecord}
                        Y1={muRecord}
                        yAxisDirections={['left']}
                        title='Eigenvalue (&mu;) convergence and error'
                        leftYAxisLabel='log10 Error'
                        leftTicks={logTicks}
                        rightYAxisLabel='Energy Level (hbar &omega;)'
                        rightTicks={muTicks}
                        XAxisLabel='Number of Iterations'
                        theme = {theme}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={2}>
                <Grid container
                    className="qho-button-wrapper"
                    direction='column'
                    alignItems='center'>
                    <Grid item xs={1}>
                        <Button variant='contained'
                            color='primary'
                            onClick={performRun}
                            width='100%'
                        >{startable ? 'Start Iterations' : 'Calculating'}
                        </Button>
                    </Grid>
                    <Grid item xs={10}>
                        <Slider
                            defaultValue={0}
                            orientation='vertical'
                            onChange={(event, value) => (n.current = value)}
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={0}
                            max={10}
                            size='medium'
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={3}>
                <QHODescription/>
            </Grid>
            <Grid item xs={1}>
                <Box></Box>
            </Grid>
        </Grid>
    )
    async function startRun() {
        if (startable) {
            setStartable(false);
            setMuTicks(range(0, n.current + 1, .5));
            const port = 5000;
            const host = window.location.hostname
            const hostname = 'https://noahjacobsonbackend.azurewebsites.net/api/post_qho_first' //`http://${host}:${port}/api/post_qho_first`
            return axios.post(hostname,
                {
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
    async function getNextRunData(runData) {
        const port = 5000;
        const host = window.location.hostname;
        const hostname = 'https://noahjacobsonbackend.azurewebsites.net/api/post_qho_run'//`http://${host}:${port}/api/post_qho_run`
        const post = await axios.post(hostname,
            {
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

    async function performRun(n) {
        var runData = await startRun(n);
        var runCount = 0;
        while (!runData['done'] && runCount < 10) {
            runData = await getNextRunData(runData);
        }
        setStartable(true);
    }
}

function range(start, end, step) {
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
function getStepSize(itArray){
    // Orders of magnitude below the max value
    var orderMagReduct = 1; 
    // Number of base 10 units in each step i.e. a order magnitude of 3 should be 1000, but in this case we want multiples of 2000
    // This is solely to avoid number overlap when plotting successive iterations
    var stepMult = 5; 
    var maxValue = Math.max(...itArray);
    if (maxValue !== 0){
        console.log('maxValue')
        console.log(maxValue);
        var logTen = Math.round(Math.log10(maxValue));
        console.log(logTen);
        var stepSize = stepMult*(10**(logTen - orderMagReduct));
        console.log(stepSize);
        return stepSize
    }
    else{
        return 1;
    }
    
}
/*
<Grid item xs={6}>
                        <StyledLineGraph className='sub-graph'
                            X={iterationArray}
                            Y={muRecord}
                            yAxisDirections={['left']}
                            title='Eigenvalue (&mu;) convergence'
                            leftYAxisLabel='Energy Level (hbar &omega;)'
                            leftTicks={muTicks}
                            XAxisLabel='Number of Iterations'
                            theme = {theme}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <StyledLineGraph className='sub-graph'
                            X={iterationArray}
                            Y={errorRecord}
                            name={'Error'}
                            yAxisDirections={['left']}
                            title='Error convergence'
                            leftYAxisLabel='log10 Error'
                            leftTicks={range(0, -10, -1)}
                            XAxisLabel='Number of Iterations'
                            theme = {theme}
                        />
                    </Grid>
                    */