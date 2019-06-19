import React, {useEffect,useState, useRef} from 'react';
import {FusePageSimple} from '@fuse';
import {makeStyles} from '@material-ui/styles';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from '../../../store/actions';
import reducer from '../../../store/reducers';
import withReducer from 'app/store/withReducer';
import 'react-awesome-tabs/src/sass/react-awesome-tabs.scss';
import axios from'axios';
import {Typography, Paper, Button, Card, CardContent, Divider, CardActions, Icon, LinearProgress} from '@material-ui/core';
import { useCookies } from 'react-cookie';
import clsx from 'clsx';


const useForceUpdate = () => useState()[1];


const styles = theme => ({
    layoutRoot: {}
});

const useStyles = makeStyles({
    addButton: {
        position: 'absolute',
        right   : 12,
        bottom  : 12,
        zIndex  : 99
    },
    Idle: {
        background: '#F2F2F2'
    },
    in_queue: {
        background: '#2C7D26'
    },
    out_queue: {
        background: '#EDD6B4'
    },
    callback: {
        background: '#B83900'
    }

});

function Queue (props) {
    console.log('queueProps',props.queueData.current_calls)
    const classes = useStyles(props);
    let queueStatus = 'Idle';
    if(props.queueData.type === 'in_queue') {
        if(props.queueData.current_calls.length > 0) {
            queueStatus = 'in_queue' ;
        }
    }
    if(props.queueData.type === 'out_queue') {
        if(props.queueData.current_calls.length > 0) {
            queueStatus = 'out_queue' ;
        }
    }
    
    return (
        <div className="w-full pb-24 sm:w-1/2 lg:w-1/3 sm:p-16" key={props.queueData.extension}>
            <Card elevation={1} className={clsx(classes[queueStatus], "flex flex-col h-256")}>
                <div
                    className="flex flex-shrink-0 items-center justify-between px-24 h-64"
                    style={{
                        
                        color     : 'black'
                    }}
                    >
                    <Typography className="font-medium truncate" color="inherit">{props.queueData.name}</Typography>

                </div>
                <CardContent className="flex flex-col flex-auto items-center justify-right">
                    <Typography className="text-center text-16 font-400">{props.queueData.extension}</Typography>
                    
                </CardContent>
                <Divider/>
                <CardActions className="justify-center">
                                                       
                    <Typography className="font-medium truncate" color="inherit">Call waiting</Typography>
                    <div className="flex items-center justify-center opacity-75">
                        <Icon className="text-20 mr-8" color="inherit">access_time</Icon>
                        <div className="text-16 whitespace-no-wrap">3 min</div>
                    </div>
                                                      
                </CardActions>
                
            </Card>
        </div>
    )
}
export default withReducer('Queue', reducer)(Queue);
