import React from 'react';
import { Grid } from '@mui/material';
interface CentralContentLayoutProps{
    CentralContent: React.ReactNode,
    Description: React.ReactNode
}
export default function CentralContentLayout(props: CentralContentLayoutProps) {
    const CentralContent = props.CentralContent
    const Description = props.Description
    return (
        <Grid container spacing={1} style={{ height: '100%' }}>
            <Grid item xs={12} sm={8}>
                {CentralContent}
            </Grid>
            <Grid item xs={12} sm={4} padding={2}>
                {Description}
            </Grid>
        </Grid>
    )
}