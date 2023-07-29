import { React, useState } from 'react';
import './QHO.css';
import axios from "axios";
import { LineChart, Line } from 'recharts';
export function QHO() {
    return (
        <div className='subpage-wrapper'>
            <div className='vertical-graph-wrapper'>
                <button onClick={startRun}>Start Calculation</button>
                <div className='horizontal-graph-wrapper'>
                    <LineChart width={400} height={400} data={[1, 2, 3]}>
                        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                    </LineChart>
                </div>
                <div className='horizontal-graph-wrapper'>
            
                </div>
            </div>
        </div>
    )
}
function startRun(){
    const port = 5000;
    const host = window.location.hostname
    axios.get(`http://${host}:${port}/api/get_qho_first`, {params:{n:0}})
    .then((response) => {
        const runData = response.data;
        var counter = 0;
        while (!runData['done'] && counter < 1){
            getNextRunData(runData)
            counter += 1;
        }
    }
    )
}

function getNextRunData(runData){
    const port = 5000;
    const host = window.location.hostname
    axios.get(`http://${host}:${port}/api/get_qho_run`, {params:{run_data:runData}})
    .then((response) => {
    }).then((response) => {
        const res = response.data;
        console.log('thenned');
    }
    )
}