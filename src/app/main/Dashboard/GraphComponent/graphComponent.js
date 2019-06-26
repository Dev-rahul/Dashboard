import React from 'react';
//import ShowcaseButton from '../showcase-components/showcase-button';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalBarSeriesCanvas,
  DiscreteColorLegend,
  Highlight,

} from 'react-vis';
import _ from 'lodash';


import 'react-vis/dist/styles/legends.scss'
import 'react-vis/dist/styles/examples.scss'
import 'react-vis/dist/styles/plot.scss'
import 'react-vis/dist/styles/radial-chart.scss'
import 'react-vis/dist/styles/treemap.scss'

export default class ClusteredBarChart extends React.Component {
  data = [];
    constructor(props) {
        super(props)
    }
  
  state = {
    useCanvas: false,
    lastDrawLocation: null,
    series : []
  };
  // graphResize = () => {
  //   const divHeight = document.getElementsByClassName('graphDiv')[0].clientHeight;
  //   const divWidth = document.getElementsByClassName('graphDiv')[0].clientWidth;
  //   this.setState({ divHeight });
  //   this.setState({ divWidth });
  //   console.log(divHeight,'::::',divWidth)
  // }

  componentDidMount() {
    console.log("qwerty")
    let callwaiting = [], callsConnected =[], agentsReady =[], agentsInWrapUp =[],
    agentsInQueueCall =[], agentsBusy =[], agentsAway =[];
    this.props.queueData.map((queue, index) => {
      let calls_waiting = 0, calls_connected = 0,agents_ready = 0, agents_in_wrapup= 0;
        let agents_in_queue_call = 0, agents_busy= 0, agents_away = 0;
        if(queue.calls_waiting !== undefined) {
          calls_waiting = queue.calls_waiting;
        }
        if(queue.calls_connected !== undefined) {
          calls_connected = queue.calls_connected;
        }
        if(queue.agents_ready !== undefined) {
          agents_ready = queue.agents_ready;
        }
        if(queue.agents_in_wrapup !== undefined) {
          agents_in_wrapup = queue.agents_in_wrapup;
        }
        if(queue.agents_in_queue_call !== undefined) {
          agents_in_queue_call = queue.agents_in_queue_call;
        }
        if(queue.agents_busy !== undefined) {
          agents_busy = queue.agents_busy;
        }
        if(queue.agents_away !== undefined) {
          agents_away = queue.agents_away;
        }
      callwaiting.push({x: index, xa:queue.name, y: calls_waiting});
      callsConnected.push({x: index, xa: queue.name, y: calls_connected});
      agentsReady.push({x:index, xa: queue.name, y: agents_ready});
      agentsInWrapUp.push({x: index,xa: queue.name, y: agents_in_wrapup});
      agentsInQueueCall.push({x: index, xa: queue.name, y: agents_in_queue_call});
      agentsBusy.push({x: index, xa: queue.name, y: agents_busy});
      agentsAway.push({x: index, xa: queue.name, y: agents_away});
    })

    this.data = [{
      data : callwaiting,
      title : 'callsWaiting',
      cluster :'callsWaiting'
    },
    {
      data : callsConnected,
      title : 'callsConnected',
      cluster :'callsConnected',
    },
    {
      data : agentsReady,
      title : 'agentsReady',
      cluster :'agentsState',
    },
    {
      data : agentsInWrapUp,
      title : 'agentsInWrapUp',
      cluster :'agentsState',
    },
    {
      data : agentsInQueueCall,
      title : 'agentsInQueueCall',
      cluster :'agentsState',
    },
    {
      data : agentsBusy,
      title : 'agentsBusy',
      cluster :'agentsState',
    },
    {
      data : agentsAway,
      title : 'agentsAway',
      cluster :'agentsState',
    }];
  };
  componentDidUpdate() {
   // console.log("update",this.props);
    let callwaiting = [], callsConnected =[], agentsReady =[], agentsInWrapUp =[],
    agentsInQueueCall =[], agentsBusy =[], agentsAway =[];
    this.props.queueData.map((queue, index) => {
        let calls_waiting = 0, calls_connected = 0,agents_ready = 0, agents_in_wrapup= 0;
        let agents_in_queue_call = 0, agents_busy= 0, agents_away = 0;
        if(queue.calls_waiting !== undefined) {
          calls_waiting = queue.calls_waiting;
        }
        if(queue.calls_connected !== undefined) {
          calls_connected = queue.calls_connected;
        }
        if(queue.agents_ready !== undefined) {
          agents_ready = queue.agents_ready;
        }
        if(queue.agents_in_wrapup !== undefined) {
          agents_in_wrapup = queue.agents_in_wrapup;
        }
        if(queue.agents_in_queue_call !== undefined) {
          agents_in_queue_call = queue.agents_in_queue_call;
        }
        if(queue.agents_busy !== undefined) {
          agents_busy = queue.agents_busy;
        }
        if(queue.agents_away !== undefined) {
          agents_away = queue.agents_away;
        }
      callwaiting.push({x: index, xa:queue.name, y: calls_waiting});
      callsConnected.push({x: index, xa: queue.name, y: calls_connected});
      agentsReady.push({x:index, xa: queue.name, y: agents_ready});
      agentsInWrapUp.push({x: index,xa: queue.name, y: agents_in_wrapup});
      agentsInQueueCall.push({x: index, xa: queue.name, y: agents_in_queue_call});
      agentsBusy.push({x: index, xa: queue.name, y: agents_busy});
      agentsAway.push({x: index, xa: queue.name, y: agents_away});
    })

    this.data = [{
      data : callwaiting,
      title : 'callsWaiting',
      cluster :'callsWaiting'
    },
    {
      data : callsConnected,
      title : 'callsConnected',
      cluster :'callsConnected',
    },
    {
      data : agentsReady,
      title : 'agentsReady',
      cluster :'agentsState',
    },
    {
      data : agentsInWrapUp,
      title : 'agentsInWrapUp',
      cluster :'agentsState',
    },
    {
      data : agentsInQueueCall,
      title : 'agentsInQueueCall',
      cluster :'agentsState',
    },
    {
      data : agentsBusy,
      title : 'agentsBusy',
      cluster :'agentsState',
    },
    {
      data : agentsAway,
      title : 'agentsAway',
      cluster :'agentsState',
    }];
    console.log("data graph", this.data)
  }


  render() {


      console.log('queueData in graph');
      const {useCanvas} = this.state;
      const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;
      const content = useCanvas ? 'TOGGLE TO SVG' : 'TOGGLE TO CANVAS';
      const {series, lastDrawLocation} = this.state;
  
      return (
        <div>
         
          <XYPlot
            animation
            xDomain={
              lastDrawLocation && [
                lastDrawLocation.left,
                lastDrawLocation.right
              ]
            }
            
            width={this.props.graphWidth -50}
            height={this.props.graphHeight -150}
          >
            
            <DiscreteColorLegend
              style={{  width: this.props.graphWidth-100}}
              orientation="horizontal"
              items={[
                {
                  title: 'Calls Waiting',
                  color: '#31C3E9'
                },
                {
                  title: 'Calls Connected',
                  color: '#034895'
                },
                {
                  title: 'Agents Ready',
                  color: '#2C7D26'
                },
                {
                  title: 'Agents in Warp-up',
                  color: '#31C3E9'
                },
                {
                  title: 'Agents in Queue call',
                  color: '#034895'
                },
                {
                  title: 'Agents Busy',
                  color: '#B83900'
                },
                {
                  title: 'Agents Away',
                  color: '#d29a46'
                }
  
              ]}
            />
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis tickTotal={4} tickFormat={d=>{if(this.data[0].data[_.round(d)])return this.data[0].data[_.round(d)].xa}} />
            <YAxis />
            {this.data.map(entry => (
                <BarSeries x={entry.data.x} key={entry.title}  cluster={entry.cluster} data={entry.data} /> 
              ))
              }
  
            <Highlight
                yEnable={false}
                onBrushEnd={area => this.setState({lastDrawLocation: area})}
                onDrag={area => {
                  if(area.left>0) {
                    console.log("ssgghbjfnfgjgbn")
                    this.setState({
                      lastDrawLocation: {
                        bottom: lastDrawLocation.bottom + (area.top - area.bottom),
                        left: lastDrawLocation.left - (area.right - area.left),
                        right: lastDrawLocation.right - (area.right - area.left),
                        top: lastDrawLocation.top + (area.top - area.bottom)
                      }
                    });
                  }
                  
                }}
              />
          </XYPlot>
        </div>
      );
  }
}