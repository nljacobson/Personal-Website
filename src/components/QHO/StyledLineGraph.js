import { React } from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Line, ResponsiveContainer, Tooltip, Label } from 'recharts';
export function StyledLineGraph(props) {
    const data = props.X.map((x, xnum) => ({'x':x,  'y':props.Y[xnum]}));
    const strokeColor = props.theme.palette.error.main;
    return (
        <ResponsiveContainer>
        <LineChart 
        data = {data}
        margin = {{
            left:30,
            bottom:30
        }}>
            <CartesianGrid/>
            <XAxis dataKey='x' ticks = {props.X}>
            <Label 
                style={{textAnchor: "middle"}}
                value = {props.XAxisLabel}
                position='bottom'/>
            </XAxis>
            <YAxis yAxisId='y' ticks={props.leftTicks}>
                <Label 
                style={{textAnchor: "middle"}}
                value = {props.leftYAxisLabel}
                angle={-90}
                position='left'/>
            </YAxis>
            <Tooltip />
            <Line name = {props.leftYAxisLabel} dot = {false} yAxisId='y' dataKey='y' stroke = {strokeColor}/>
        </LineChart>
        </ResponsiveContainer>)
}