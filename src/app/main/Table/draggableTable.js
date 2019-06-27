
import React, { Component } from 'react'
import ReactTable, { ReactTableDefaults } from 'react-table'
import 'react-table/react-table.css';
import _ from 'lodash';

Object.assign(ReactTableDefaults, {
defaultPageSize: 10,
minRows: 3
})

class DraggableTable extends Component {
constructor (props) {
super(props)
this.dragged = null
this.reorder = []
this.cols= []
this.state = {
trigger: 0
}
this.a = null
this.b = null
}
mountEvents () {
const headers = Array.prototype.slice.call(
document.querySelectorAll('.draggable-header')
)

headers.forEach((header, i) => {
header.setAttribute('draggable', true)
// the dragged header
header.ondragstart = e => {
e.stopPropagation()
this.a= _.findIndex(this.cols, function(o) { return o.Header.props.children === e.path[0].innerHTML});
this.dragged = this.a
console.log(this.a,':::::',this.cols[0].Header.props.children)
}

header.ondrag = e => e.stopPropagation

header.ondragend = e => {
e.stopPropagation()

//setTimeout(() => (this.dragged = null), 8000)
}

// the dropped header
header.ondragover = e => {
e.preventDefault()
}

header.ondrop = e => {
e.preventDefault()
const { target, dataTransfer } = e
this.b = _.findIndex(this.cols, function(o) { return o.Header.props.children === e.path[0].innerHTML});
console.log(this.b,':::',this.dragged )
if(this.a !== this.b) {
this.reorder.push({ a: this.b, b: this.dragged })
this.setState({ trigger: Math.random() })
}

}
})
}
componentDidMount () {
this.mountEvents()
}

componentDidUpdate () {
this.mountEvents()
}
render () {
const { rows, columns } = this.props

this.cols = columns.map(col => ({
...col,
Header: <span className='draggable-header' style={{width: '80%'}}>{col.Header}</span>
}))

// run all reorder events
this.reorder.forEach(o => 
this.cols.splice(o.a, 0, this.cols.splice(o.b, 1)[0])
)


// render
return (
<div className='esr-table'>
<ReactTable {...this.props} data={rows} columns={this.cols} />
</div>
)
}
}

export default DraggableTable