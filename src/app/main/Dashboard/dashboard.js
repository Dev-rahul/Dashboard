import React, {Component} from 'react';
import {FusePageSimple} from '@fuse';
import {makeStyles} from '@material-ui/styles';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from '../../store/actions';
import reducer from '../../store/reducers';
import withReducer from 'app/store/withReducer';
import 'react-awesome-tabs/src/sass/react-awesome-tabs.scss';
import axios from'axios';
import {Typography, Paper, Button, Card, CardContent, Divider, CardActions, Icon, LinearProgress} from '@material-ui/core';
import { useCookies } from 'react-cookie';
import {FuseAnimate, FuseAnimateGroup} from '@fuse';
import Agents from './Agents/agents';
import Queue from './Queue/queue';
import io from 'socket.io-client';
import AgentDistribution from './AgentDisribution/agentDistribution';
import ClusteredBarChart from './GraphComponent/graphComponent';

import RGL, { WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css';
const ReactGridLayout = WidthProvider(RGL)
const originalLayout = getFromLS('layout') || []


//const useForceUpdate = () => useState()[1];


const styles = theme => ({
    layoutRoot: {}
});

const useStyles = makeStyles({
    addButton: {
        position: 'absolute',
        right   : 12,
        bottom  : 12,
        zIndex  : 99
    }
});

class Dashboard extends Component {

    static defaultProps = {
        className: 'layout',
        cols: 12,
        items: 4,
        rowHeight: 50,
        onLayoutChange: function () {}
      }


    connection = null;
    constructor(props) {
        super(props);
        this.state = {
            agentList: [],
            queueList: [],
            upadte: false,
            layout: JSON.parse(JSON.stringify(originalLayout)),
            connected: 'false'
        }
          this.onLayoutChange = this.onLayoutChange.bind(this)
          this.resetLayout = this.resetLayout.bind(this)
    }


    resetLayout () {
        this.setState({
          layout: []
        })
      }
    
      onLayoutChange = layout => {
        saveToLS('layout', layout)
        this.setState({ layout })
        this.props.onLayoutChange(layout) // updates status display
      }
      onResize = args => {
        console.log(args)
      }



    componentDidMount() {
        this.connection = new WebSocket('ws://10.226.14.70:7778/6/sock');
        const sendData = JSON.stringify({
                    request: "fetch_agent_events"
                });
            
                const queue_sendData = JSON.stringify({
                    request: "fetch_queue_events"
                });
                
        this.connection.onopen = () => {
                 //  console.log("123456677")
                 this.setState({connected: true});
                this.connection.send('panel_type:dashboard');
                this.connection.send(queue_sendData);
                this.connection.send(sendData);
                setInterval( _ =>{
                    if(this.connection !== null && this.state.connected) {
                      this.connection.send('ping');
                    }
                 
      }, 5000 )
               }
               this.connection.onmessage = evt => { 
                        // add the new message to state
                        if(evt.data !== 'pong') {
                            const responaeData = JSON.parse(evt.data);
                            if(responaeData.action === 'create_agent') {
                              //  console.log("agentResponse", responaeData.response);
                                this.setState({agentList: responaeData.response});
                            }
                            if(responaeData.action === 'update_agent') {
                                console.log("updateResponse", responaeData.response);

                                let tempAgentList = [...this.state.agentList];
                                 //console.log('tempQueList',tempQueList)
                                
                                
                                    responaeData.response.map(currAgent => {
                                       let index = 0;
                                       tempAgentList.map(agent => {
                                           if(agent.extension === currAgent.extension) {
                                             //  queue.current_calls = currQueue.current_calls;
                                             tempAgentList.splice(index, 1, currAgent);
                                           }
                                           index = index+ 1;
                                        })
                                    })
                                this.setState({agentList: tempAgentList});
                            }
                            if(responaeData.action === 'create_queue') {
                              //  console.log("QueueResponse", responaeData.response);
                                this.setState({queueList: responaeData.response});
                            }
                            if(responaeData.action === 'update_queue') {
                              //  console.log("UpdateQueueResponse", responaeData.response);
                                 let tempQueList = [...this.state.queueList];
                                 console.log('tempQueList',tempQueList)
                                
                                
                                    responaeData.response.map(currQueue => {
                                       let index = 0;
                                        tempQueList.map(queue => {
                                           if(queue.extension === currQueue.extension) {
                                             //  queue.current_calls = currQueue.current_calls;
                                             tempQueList.splice(index, 1, currQueue);
                                           }
                                           index = index+ 1;
                                        })
                                    })
                                 
                                
                                this.setState({queueList: tempQueList });
                                console.log('filteredItems',this.state.queueList);
                            }
                        }
                        
                      };

                   


                    this.connection.onclose = () => {
                            this.connection = null;
                            this.setState({connected: false});
                        //    let connection = new WebSocket('ws://10.226.14.70:7778/6/sock');
                    }
    }
    componentWillUnmount() {
        // this.connection = null;
    }
    
    render() {
      let culstedComponent = null;
      if(this.state.queueList.length>0) {
        culstedComponent = (
          <ClusteredBarChart queueData={this.state.queueList}/>
        )
      }
        return (
             <ReactGridLayout
          {...this.props}
          layout={this.state.layout}
          draggableCancel=".MyDraggableCancel" 
          onLayoutChange={this.onLayoutChange}
          onResizeStop={this.onResize}
        >
         <div key='1' data-grid={{ w: 12, minH: 4, minW:6, h: 4, x: 0, y: 0, i: "1" }}>
            <Paper className="w-full rounded-8 shadow-none border-1" style={{borderColor:"#157fcc", borderRadius: 4, borderWidth: 5, height: "100%", width: "100%"}}>
                <div className="flex items-center justify-between px-8 py-8 border-b-1" style={{background: "#157fcc"}}>
                    <Typography className="text-16" style={{color: "#fff"}}>Agents</Typography>
                </div>
                <div className="flex flex-col flex-1 w-full" style={{height: "100%", width: "100%"}}>
                    <div className="flex flex-col flex-1 max-w-2xl w-full mx-auto " style={{height: "100%", width: "100%"}}>
                    <FuseAnimateGroup
                                        enter={{
                                            animation: "transition.slideUpBigIn"
                                        }}
                                        className="flex flex-wrap px-16"
                                        
                                    >
                                     {this.state.agentList.map(function(agent, index){
                        
                        return <Agents key={index} agentData={agent}/>
                      })}
                    </FuseAnimateGroup>
                    {/* <Agents/> */}
    
                   
                       
                        
                    </div>
                </div>
            </Paper>
            </div>
            <div key='2' data-grid={{w: 12, minH: 4, minW:6, h: 4, x: 0, y: 32, i: "2" }}>
            <Paper className="w-full rounded-8 shadow-none border-1"  style={{borderColor:"#157fcc", borderRadius: 4, borderWidth: 5, height: "100%", width: "100%"}}>
                <div className="flex items-center justify-between px-8 py-8 border-b-1" style={{background: "#157fcc"}}>
                    <Typography className="text-16">Queues</Typography>
                </div>
                <div className="flex flex-col flex-1 w-full" style={{height: "100%", width: "100%"}}>
                    <div className="flex flex-col flex-1 max-w-2xl w-full mx-auto " style={{height: "100%", width: "100%"}}>
                    <FuseAnimateGroup
                                        enter={{
                                            animation: "transition.slideUpBigIn"
                                        }}
                                        className="flex flex-wrap py-16"
                                    >
                                     {this.state.queueList.map(function(queue, index){
                        
                                         return <Queue key={index} queueData={queue}/>
                                    })}
                    </FuseAnimateGroup>
    
                   
                       
                        
                    </div>
                </div>
            </Paper>
            </div>
            <div key='3' data-grid={{ w: 12, minH: 8, minW:6, h: 8, x: 0, y: 64, i: "3" }}>
            <Paper className="w-full rounded-8 shadow-none border-1"  style={{borderColor:"#157fcc", borderRadius: 4, borderWidth: 5, height: "100%", width: "100%"}}>
                <div className="flex items-center justify-between px-8 py-8 border-b-1" style={{background: "#157fcc"}}>
                    <Typography className="text-16">Agent Disribution</Typography>
                </div>
                <div className="flex flex-col flex-1 w-full MyDraggableCancel" style={{height: "100%", width: "100%"}}>
                    <div className="flex flex-col flex-1 max-w-2xl w-full mx-auto px-8 sm:px-16 ">
                    <FuseAnimateGroup
                                        enter={{
                                            animation: "transition.slideUpBigIn"
                                        }}
                                        className="flex flex-wrap "
                                    >
                                    <AgentDistribution agentData={this.state.agentList}/>
                    </FuseAnimateGroup>
    
                   
                       
                        
                    </div>
                </div>
            </Paper>
            </div>

            <div key='4' data-grid={{ w: 12, minH: 8, minW:6, h: 8, x: 0, y: 96, i: "4" }}>
            <Paper className="w-full rounded-8 shadow-none border-1"  style={{borderColor:"#157fcc", borderRadius: 4, borderWidth: 5, height: "100%", width: "100%"}}>
                <div className="flex items-center justify-between px-8 py-8 border-b-1" style={{background: "#157fcc"}}>
                    <Typography className="text-16">Calls And Agents</Typography>
                </div>
                <div className="flex flex-col flex-1 w-full MyDraggableCancel" style={{height: "100%", width: "100%"}}>
                    <div className="flex flex-col flex-1 max-w-2xl w-full mx-auto px-8 sm:px-16 py-24">
                    <FuseAnimateGroup
                                        enter={{
                                            animation: "transition.slideUpBigIn"
                                        }}
                                        className="flex flex-wrap py-24"
                                    >
                                    {culstedComponent}
                                    
                    </FuseAnimateGroup>
    
                   
                       
                        
                    </div>
                </div>
            </Paper>
            </div>

            
            </ReactGridLayout>
        )
    }
    
}

function getFromLS (key) {
    let ls = {}
    if (global.localStorage) {
      try {
        ls = JSON.parse(global.localStorage.getItem('rgl-7')) || {}
      } catch (e) {
      }
    }
    return ls[key]
  }
  
  function saveToLS (key, value) {
    if (global.localStorage) {
      global.localStorage.setItem(
        'rgl-7',
        JSON.stringify({
          [key]: value
        })
      )
    }
  }
export default withReducer('Dashboard', reducer)(Dashboard);