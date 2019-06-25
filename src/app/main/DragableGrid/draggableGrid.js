import React from 'react'
import RGL, { WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css';
import Dashboard from '../Dashboard/dashboard';
const ReactGridLayout = WidthProvider(RGL)
const originalLayout = getFromLS('layout') || []

/**
 * This layout demonstrates how to sync to localstorage.
 */
class DraggableGrid extends React.PureComponent {
  static defaultProps = {
    className: 'layout',
    cols: 12,
    items: 3,
    rowHeight: 30,
    onLayoutChange: function () {}
  }

  constructor (props) {
    super(props)

    this.state = {
      layout: JSON.parse(JSON.stringify(originalLayout))
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
    //console.log(args)
  }

  render () {
    return (
      <div>
        <button onClick={this.resetLayout}>Reset Layout</button>
        <ReactGridLayout
          {...this.props}
          layout={this.state.layout}
          onLayoutChange={this.onLayoutChange}
          onResizeStop={this.onResize}
        >
          <div key='1' data-grid={{ w: 2, h: 4, x: 0, y: 0 }}>
            
              <Dashboard/>
           
          </div>
          <div key='2' data-grid={{ w: 2, h: 4, x: 2, y: 0 }}>
            <span className='text'>
             Bar chart
            </span>
          </div>
          <div key='3' data-grid={{ w: 2, h: 4, x: 4, y: 0 }}>
            <span className='text'>3</span>
          </div>
          <div key='4' data-grid={{ w: 2, h: 4, x: 6, y: 0 }}>
            <span className='text'>4</span>
          </div>
          <div key='5' data-grid={{ w: 2, h: 4, x: 8, y: 0 }}>
            <span className='text'>5</span>
          </div>
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

export default DraggableGrid;