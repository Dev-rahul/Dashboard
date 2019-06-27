import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
import * as zoom from 'chartjs-plugin-zoom'
//import * as zoom from 'chartjs-plugin-brush';
const data = {
    labels: ["January", 'February' , "March", "April"],
    datasets: [
      {
        label: 'January',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [65, 75, 12, 11]
      },
      {
        label: 'February',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [59,23,67,87]
      },
      {
        label: 'March',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [80,87,12,45],
        stack: 'stack1'
      },
      {
        label: 'April',
        stack: 'stack1',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [ 81,78,65,90]
      }

    ]
  };
class Settings extends Component {
    
    constructor(props) {
        super(props);

    }
    
    render() {
        return(
            <div>
        <h2>Bar Example (custom size)</h2>
        <Bar
          data={data}
          options={{
            maintainAspectRatio: false,
            plugins: {
                zoom: {
                    // Container for pan options
                    pan: {
                        // Boolean to enable panning
                        enabled: false,
            
                        // Panning directions. Remove the appropriate direction to disable
                        // Eg. 'y' would only allow panning in the y direction
                        mode: 'x',
                        rangeMin: {
                            // Format of min pan range depends on scale type
                            x: null,
                            y: null
                        },
                        rangeMax: {
                            // Format of max pan range depends on scale type
                            x: null,
                            y: null
                        },
                        // Function called once panning is completed
                        // Useful for dynamic data loading
                        onPan: function({chart}) { console.log(`I was panned!!!`); }
                    },
            
                    // Container for zoom options
                    zoom: {
                        // Boolean to enable zooming
                        enabled: true,
            
                        // Enable drag-to-zoom behavior
                        drag: true,
            
                        // Drag-to-zoom rectangle style can be customized
                        drag: {
                        	 borderColor: 'rgba(225,225,225,0.3)',
                        	 borderWidth: 5,
                        	 backgroundColor: 'rgb(225,225,225)'
                        },
            
                        // Zooming directions. Remove the appropriate direction to disable
                        // Eg. 'y' would only allow zooming in the y direction
                        mode: 'x',
                        sensitivity: 0.5,
            
                       
            
                        // Speed of zoom via mouse wheel
                        // (percentage of zoom on a wheel event)
                        speed: 0.5,
            
                        // Function called once zooming is completed
                        // Useful for dynamic data loading
                        onZoom: function({chart}) { console.log(`I was zoomed!!!`); }
                    }
                }
            }
          }}
        />
      </div>
        )
    }
}
export default Settings;