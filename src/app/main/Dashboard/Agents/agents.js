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
import Timer from '../Timer/timer';


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
    Ready: {
        background: '#2C7D26'
    },
    Away: {
        background: '#EDD6B4'
    },
    Busy: {
        background: '#B83900'
    },
    Available : {
        background: "#22B3A8"
    },
    inBoundCall: {
        background: "#034895"
    },
    inWrapUp: {
        background: "#31C3E9"
    }

});

function Agents (props) {
    // console.log('agent',props)
    const classes = useStyles(props);
    let agentStatus = "Idle";
    if(props.agentData.status === 'Busy') {
        if(props.agentData.on_a_call === 2 || props.agentData.on_a_call === 4 || props.agentData.on_a_call === 3 ) {
         
            agentStatus = 'Available';
        } else if( props.agentData.on_a_call === 1) {
            agentStatus = 'inBoundCall';
        } else if( props.agentData.on_a_wrapup === 1) {
            agentStatus = 'inWrapUp';
        } else {
            agentStatus = 'Busy';
        }
    } else  if(props.agentData.status === 'Away'){
        agentStatus = 'Away';
    } else  if(props.agentData.status === 'Idle'){
        
        if( props.agentData.on_a_call > 0) {
            agentStatus = "inBoundCall"
        } else if(props.agentData.on_a_wrapup > 0) {
            agentStatus = "inWrapUp";
        } else {
            if(props.agentData.state === 'Ready') {
                agentStatus = "Ready";
            } else {
                agentStatus = 'Away';
            }
        }
    } else {
        if(props.agentData.on_a_call === 2 || props.agentData.on_a_call === 4) {
            agentStatus = 'Available';
        }
    }
    console.log("agentStatus", agentStatus)


    return (
        <div className="w-full pb-24 sm:w-1/2 lg:w-1/4 sm:p-16"  key={props.agentData.extension} >
            <Card elevation={1} className={clsx(classes[agentStatus], "flex flex-col h-256")} 
            style={{borderRadius: "10px", height: "100%",width: "100%" }}>
                <div
                    className="flex flex-shrink-0 items-center justify-between px-24 h-48"
                    style={{
                        height: "30%",width: "100%",
                        color : 'black'
                    }}
                    >
                    <Typography className="font-medium truncate" color="inherit" style={{color: "#fff"}}>{props.agentData.firstName + ' '+ props.agentData.lastName}</Typography>

                </div>
                <CardContent className="flex flex-col items-center justify-right"
                style={{
                    height: "50%",width: "100%"
                }}>
                    <Typography className="text-center text-16 font-400"  style={{color: "#fff"}}>{props.agentData.extension}</Typography>
                    
                </CardContent>
                <Divider/>
                <CardActions className="justify-center" style={{
                    height: "20%",width: "100%"
                }}>
                                                       
                    
                    <div className="flex items-center justify-center opacity-75">
                        <Icon className="text-20 mr-8" color="inherit"  style={{color: "#fff"}}>access_time</Icon>
                       <Timer timeInSecond={0}/>
                    </div>
                                                      
                </CardActions>
                
            </Card>
        </div>
    )
}
export default withReducer('Agents', reducer)(Agents);
