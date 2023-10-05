import { React } from 'react';
import { Typography } from '@mui/material';
import { ExternalLink } from 'react-external-link';
export function QHODescription() {
    return (
        <div>
            <Typography variant="h6">
               Quantum Harmonic Oscillator using a squared operator iterative method
            </Typography>
            <br/>
            <Typography>
                Under Professor Taras Lakoba, I adapted an iterative method for 
                calculating higher order eigenfunctions into MATLAB code. 
                The method utilized to form this calculation is highlighted in the following papers written by 
                Professor Lakoba and his colleague:
            </Typography>
            <br/>
                        <Typography>
                The basics of this method
            </Typography>
            <ExternalLink href='https://www.researchgate.net/publication/1900009_Accelerated_Imaginary-time_Evolution_Methods_for_the_Computation_of_Solitary_Waves/link/600df17045851553a06afa1a/download'>
                Accelerated Imaginary-time Evolution Methods for the Computation of Solitary Waves
            </ExternalLink>
            <br/><br/>
            <Typography>
                The more advanced method utilized by this script
            </Typography>
            <ExternalLink href='https://www.researchgate.net/publication/2148865_Universally-Convergent_Squared-Operator_Iteration_Methods_for_Solitary_Waves_in_General_Nonlinear_Wave_Equations'>
                Universally-Convergent Squared-Operator Iteration Methods for Solitary Waves in General Nonlinear Wave Equations
            </ExternalLink>
            <br/><br/>
            <Typography>
                This is an example of the workings of such a method on the elementary example of a Quantum Harmonic Oscillator. 
            </Typography>
            <br/>
            <Typography>
            In order to find the 'nth' eigenfunction of the QHO, adjust the slider to the correct value of n, 
                then press the 'START ITERATIONS' button
            </Typography>
        </div>
    );
}