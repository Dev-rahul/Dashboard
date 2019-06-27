import React, {Component} from 'react';
import {FusePageSimple} from '@fuse';
import {makeStyles} from '@material-ui/styles';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from '../../store/actions';
import reducer from '../../store/reducers';
import withReducer from 'app/store/withReducer';
import 'react-awesome-tabs/src/sass/react-awesome-tabs.scss';
import axios from'axios';
import {Typography, Paper, Button, Card, CardContent, IconButton,Divider, Fab,CardActions, Icon, LinearProgress, MenuItem , Menu ,FormControlLabel, Checkbox} from '@material-ui/core';
import { useCookies } from 'react-cookie';
import {FuseAnimate, FuseAnimateGroup} from '@fuse';
import Agents from './Agents/agents';
import Queue from './Queue/queue';
import io from 'socket.io-client';
import AgentDistribution from './AgentDisribution/agentDistribution';
import ClusteredBarChart from './GraphComponent/graphComponent';
import _ from 'lodash';
import RGL, { WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css';
const ReactGridLayout = WidthProvider(RGL)
let originalLayout = getFromLS('layout') || []


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
    //  console.log("1234567890");
      originalLayout = getFromLS('layout') || []
        super(props);
        this.state = {
            agentList: [],
            queueList: [],
            upadte: false,
            layout: JSON.parse(JSON.stringify(originalLayout)),
            connected: 'false',
            divHeight: 400,
            divWidth: 900,
            anchorMenu :null,
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
        // saveToLS('layout', layout)
        if(layout[0].i===null||layout[1].i===null||layout[2].i===null||layout[3].i===null) {
          
        } else {
          saveToLS('layout', layout)
        }
        this.setState({ layout })
        this.props.onLayoutChange(layout) // updates status display
      }
      onResize = args => {
        if(this.graphContainer) {
          this.setState({divHeight: this.graphContainer.clientHeight, divWidth: this.graphContainer.clientWidth});
        } 
      }



    componentDidMount() {
      console.log(this.props.settings)
      if(this.graphContainer) {
        this.setState({divHeight: this.graphContainer.clientHeight, divWidth: this.graphContainer.clientWidth});
      }
    }
    componentWillUnmount() {
        // this.connection = null;
    }
    shouldComponentUpdate(nextProps) {
      if(this.props.settings !== nextProps.settings) {
        this.forceUpdate();
       
      }
      return true;
    }
    
    render() {
      let displayName = 'Agents';
      if(this.props.settings) {
        displayName = 'A'
      }
      let culstedComponent = null;
      if(this.props.queueData.length>0) {
        culstedComponent = (
          <ClusteredBarChart queueData={this.props.queueData} graphHeight={this.state.divHeight}
          graphWidth ={this.state.divWidth}/>
        )
      }

      const agents = (
        <div key='1' data-grid={{ w: 12, minH: 4, minW:6, h: 4, x: 0, y: 0, i: "1" }} >
        
            <Paper className="w-full rounded-8 shadow-none border-1" style={{borderColor:"#157fcc", borderRadius: 4, borderWidth: 5, height: "100%", width: "100%"}}>
                <div className="flex items-center justify-between px-8 py-8 border-b-1" style={{background: "#157fcc", cursor: "crosshair"}}>
                    <Typography className="text-16" style={{color: "#fff"}}>Agents</Typography>
                    <IconButton size="small" color="secondary"  onClick={this.props.closeButton('agents')}><Icon>close</Icon>
                    </IconButton>
                </div>
                <div className="flex flex-col flex-1 w-full" style={{height: "75%", width: "100%", overflow: "auto"}}>
                    <div className="flex flex-col flex-1 max-w-2xl w-full mx-auto "
                    
                     style={{height: "100%", width: "100%"}}>
                    <FuseAnimateGroup
                     
                                        enter={{
                                            animation: "transition.slideUpBigIn"
                                        }}
                                        className="flex flex-wrap px-16"
                                        
                                    >
                                     {this.props.agentData.map(function(agent, index){
                        
                        return <Agents key={index} agentData={agent}/>
                      })}
                    </FuseAnimateGroup>
                    </div>
                </div>
            </Paper>
            </div>
      );
      const queues = (
        <div key='2' data-grid={{w: 12, minH: 4, minW:6, h: 4, x: 0, y: 32, i: "2" }}>
            <Paper className="w-full rounded-8 shadow-none border-1"  style={{borderColor:"#157fcc", borderRadius: 4, borderWidth: 5, height: "100%", width: "100%"}}>
                <div className="flex items-center justify-between px-8 py-8 border-b-1" style={{background: "#157fcc", cursor: "crosshair"}}>
                    <Typography className="text-16" style={{color: "#fff"}}>Queues</Typography>
                    <IconButton size="small" color="secondary"  onClick={this.props.closeButton('queues')}><Icon>close</Icon>
                    </IconButton>
                </div>
                <div className="flex flex-col flex-1 w-full" style={{height: "75%", width: "100%", overflow: "auto"}}>
                    <div className="flex flex-col flex-1 max-w-2xl w-full mx-auto " style={{height: "100%", width: "100%"}}>
                    <FuseAnimateGroup
                                        enter={{
                                            animation: "transition.slideUpBigIn"
                                        }}
                                        className="flex flex-wrap py-16"
                                    >
                                     {this.props.queueData.map(function(queue, index){
                        
                                         return <Queue key={index} queueData={queue}/>
                                    })}
                    </FuseAnimateGroup>
                    </div>
                </div>
            </Paper>
            </div>
      );
      const agentDistribution = (
        <div key='3' data-grid={{ w: 12, minH: 8, minW:6, h: 8, x: 0, y: 64, i: "3" }}>
            <Paper className="w-full rounded-8 shadow-none border-1"  style={{borderColor:"#157fcc", borderRadius: 4, borderWidth: 5, height: "100%", width: "100%"}}>
                <div className="flex items-center justify-between px-8 py-8 border-b-1" style={{background: "#157fcc", cursor: "crosshair"}}>
                    <Typography className="text-16" style={{color: "#fff"}}>Agent Disribution</Typography>
                    <IconButton size="small" color="secondary"  onClick={this.props.closeButton('agentDistribution')}><Icon>close</Icon>
                    </IconButton>
                </div>
                <div className="flex flex-col flex-1 w-full MyDraggableCancel" style={{height: "100%", width: "100%"}}>
                    <div className="flex flex-col flex-1 max-w-2xl w-full mx-auto px-8 sm:px-16 ">
                    <FuseAnimateGroup
                                        enter={{
                                            animation: "transition.slideUpBigIn"
                                        }}
                                        className="flex flex-wrap "
                                    >
                                    <AgentDistribution agentData={this.props.agentData}/>
                    </FuseAnimateGroup>
                    </div>
                </div>
            </Paper>
            </div>
      )
      const callsAndAgents = (
        <div key='4' data-grid={{ w: 12, minH: 8, minW:6, h: 8, x: 0, y: 96, i: "4" }}>
        <Paper className="w-full rounded-8 shadow-none border-1"  style={{borderColor:"#157fcc", borderRadius: 4, borderWidth: 5, height: "100%", width: "100%"}}>
            <div className="flex items-center justify-between px-8 py-8 border-b-1" style={{background: "#157fcc", cursor: "crosshair"}}>
                <Typography className="text-16" style={{color: "#fff"}}>Calls And Agents</Typography>
                <IconButton size="small" color="secondary"  onClick={this.props.closeButton('callsAndAgents')}><Icon>close</Icon>
                    </IconButton>
            </div>
            <div className="flex flex-col flex-1 w-full MyDraggableCancel" style={{height: "100%", width: "100%"}}>
                <div className="flex flex-col flex-1 max-w-2xl w-full mx-auto px-8 sm:px-16 py-24"
                style={{height: "100%", width: "100%"}}
                ref={ (graphContainer) => this.graphContainer = graphContainer}>
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
      )
      return (
        <div>
        <div style={{marginLeft: "90%"}}>
        <Fab  onClick={this.resetLayout}
        size="small"
        color="secondary">
        <Icon>restore</Icon>
        </Fab>
       {/* <Button  variant="contained" >
      Reset Layout
      </Button>       */}
     </div>
     
           <ReactGridLayout
        {...this.props}
        layout={this.state.layout}
        draggableCancel=".MyDraggableCancel" 
        onLayoutChange={this.onLayoutChange}
        onResizeStop={this.onResize}
      >
       {this.props.dashboardItems.agents ? agents : <div key="q" data-grid={{ w: 0, h: 0, minW: 0, minH: 0, x: 0, y: 1, i: "5",static: true }}></div>}
      {this.props.dashboardItems.queues ? queues : <div key="w" data-grid={{ w: 0, h: 0, minW: 0, minH: 0,  x: 0, y: 1, i: "6",static: true }}></div>}
      {this.props.dashboardItems.agentDistribution ? agentDistribution : <div key ="e" data-grid={{ w: 0, h: 0, minW: 0, minH: 0, x: 0, y: 1, i: "7",static: true }}></div>}
      {this.props.dashboardItems.callsAndAgents ? callsAndAgents : <div key ="r" data-grid={{ w: 0, h: 0, minW: 0, minH: 0,  x: 0, y: 1, i: "8",static: true }}></div>}
       </ReactGridLayout>
          </div>
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