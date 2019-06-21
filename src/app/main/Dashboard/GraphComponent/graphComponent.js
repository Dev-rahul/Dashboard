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
  Highlight
} from 'react-vis';
import _ from 'lodash';


import 'react-vis/dist/styles/legends.scss'
import 'react-vis/dist/styles/examples.scss'
import 'react-vis/dist/styles/plot.scss'
import 'react-vis/dist/styles/radial-chart.scss'
import 'react-vis/dist/styles/treemap.scss'

export default class ClusteredBarChart extends React.Component {
    constructor(props) {
        super(props)
    }
  
  state = {
    useCanvas: false,
    lastDrawLocation: null,
  };
  render() {
      console.log('queueData in graph', this.props.queueData);
      let callwaiting = [], callsConnected =[], agentsReady =[], agentsInWrapUp =[],
      agentsInQueueCall =[], agentsBusy =[], agentsAway =[];
      this.props.queueData.map((queue, index) => {
          
        callwaiting.push({x: index, xa:queue.name, y: queue.calls_waiting});
        callsConnected.push({x: index, xa: queue.name, y: queue.calls_connected});
        
        agentsReady.push({x:index, xa: queue.name, y: queue.agents_ready});
        agentsInWrapUp.push({x: index,xa: queue.name, y: queue.agents_in_wrapup});
        agentsInQueueCall.push({x: index, xa: queue.name, y: queue.agents_in_queue_call});
        agentsBusy.push({x: index, xa: queue.name, y: queue.agents_busy});
        agentsAway.push({x: index, xa: queue.name, y: queue.agents_away});
      })
      console.log("callwaiting", callwaiting)
      console.log("callsConnected", callsConnected)
      console.log("agentsReady", agentsReady)
      console.log("agentsInWrapUp", agentsInWrapUp)
      console.log("agentsInQueueCall", agentsInQueueCall)
      console.log("agentsBusy", agentsBusy)
      console.log("agentsAway", agentsAway)
    const {useCanvas} = this.state;
    const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;
    const content = useCanvas ? 'TOGGLE TO SVG' : 'TOGGLE TO CANVAS';
    const {series, lastDrawLocation} = this.state;

    return (
      <div>
       
        <XYPlot
            xType="ordinal"
          animation
          xDomain={
            lastDrawLocation && [
              lastDrawLocation.left,
              lastDrawLocation.right
            ]
          }
          yDomain={
            lastDrawLocation && [
              lastDrawLocation.bottom,
              lastDrawLocation.top
            ]
          }
          width={900}
          height={600}
        >
          
          <DiscreteColorLegend
            style={{position: 'absolute', left: '50px', top: '-50px'}}
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
          <XAxis tickFormat={d=>{return callwaiting[_.round(d)].xa}} />
          <YAxis />
        
          <BarSeries
            cluster="callsWaiting"
            color="#31C3E9"
            data={callwaiting}
          />
           <BarSeries
            cluster="callsConnected"
            color="#034895"
            data={callsConnected}
          />
          <BarSeries
            cluster="agentsState"
            color="#2C7D26"
            data={agentsReady}
          />
          <BarSeries
            cluster="agentsState"
            color="#31C3E9"
            data={agentsInWrapUp}
          />
          <BarSeries
            cluster="agentsState"
            color="#034895"
            data={agentsInQueueCall}
          />
           <BarSeries
            cluster="agentsState"
            color="#B83900"
            data={agentsBusy}
          />
          <BarSeries
            cluster="agentsState"
            color="#d29a46"
            data={agentsAway}
          />
          <Highlight
          
              onBrushEnd={area => this.setState({lastDrawLocation: area})}
              onDrag={area => {
                this.setState({
                  lastDrawLocation: {
                    bottom: lastDrawLocation.bottom + (area.top - area.bottom),
                    left: lastDrawLocation.left - (area.right - area.left),
                    right: lastDrawLocation.right - (area.right - area.left),
                    top: lastDrawLocation.top + (area.top - area.bottom)
                  }
                });
              }}
            />
        </XYPlot>
      </div>
    );
  }
}