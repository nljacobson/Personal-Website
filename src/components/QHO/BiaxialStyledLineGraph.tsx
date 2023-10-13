import React from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Line, ResponsiveContainer, Tooltip, Label, Legend } from 'recharts';
import { Theme } from '@mui/material/styles';
interface Props{
    X:number[]
    xTicks:number[]
    Y0:number[]
    Y1:number[]
    yAxisDirections:string[]
    leftYAxisLabel:string
    leftTicks:number[]
    rightYAxisLabel:string
    rightTicks:number[]
    XAxisLabel:string
    theme: Theme
}
export function BiaxialStyledLineGraph(props: Props) {
    const data = props.X.map((x, xnum) => ({'x':x,  'y0':props.Y0[xnum], 'y1':props.Y1[xnum]}));
    const strokeColor0 = props.theme.palette.info.main
    const strokeColor1 = props.theme.palette.error.main;
    return (
        <ResponsiveContainer height="35%">
        <LineChart 
        data = {data}
        margin = {{
            left:30,
            right:20,
            bottom:30,
        }}>
            <CartesianGrid/>
            <XAxis dataKey='x' type='number' allowDecimals={false} interval={0} ticks={props.xTicks}>
            <Label 
                style={{textAnchor: "middle"}}
                value = {props.XAxisLabel}
                position='bottom'/>
            </XAxis>
            <YAxis yAxisId='y0' ticks={props.leftTicks}>
                <Label 
                style={{textAnchor: "middle", color:strokeColor0}}
                value = {props.leftYAxisLabel}
                angle={-90}
                position='left'/>
            </YAxis>
            <YAxis  yAxisId='y1' ticks={props.rightTicks} orientation='right'>
            <Label 
                style={{textAnchor: "middle", fill:'rgba(204, 89, 210, 1)'}}
                value = {props.rightYAxisLabel}
                angle={-90}
                position='right'
                />
            </YAxis>
            <Tooltip />
            <Legend verticalAlign='top'/>
            <Line name = {props.leftYAxisLabel} dot = {false} yAxisId='y0' dataKey='y0' stroke = {strokeColor0}/>
            <Line name = {props.rightYAxisLabel} dot = {false} yAxisId='y1' dataKey='y1' stroke = {strokeColor1}/>
        </LineChart>
        </ResponsiveContainer>
    );
}