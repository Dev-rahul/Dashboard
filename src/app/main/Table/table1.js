import React, { useState } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import DraggableTable from './draggableTable'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/styles'
import RightSideLayout1 from 'app/fuse-layouts/layout1/components/RightSideLayout1'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {InputAdornment, IconButton,FormControl} from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';



const useStyles = makeStyles({
  spanButton: {
    width: '95%'
  },
  addButton: {
    float: 'right',
    color: 'red',
    padding: 'inherit'
  }
})

function DataTable (props) {
  const [data, setData] = useState(props.extensionList);
  // const [filterMenuEl, setAnchorEl] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [columnFilter, setcolumnFilter] = React.useState({
    firstname: true,
    lastname: true,
    extension: true,
    status: true,
  });


  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

 

 


  //console.log('datataa', props)



  const Precolumns = [
    {
      Header: 'First Name',
      accessor: 'firstname',
      show: true
    },
    {
      Header: 'Last Name',
      accessor: 'lastname',
      show: true
    },
    {
      Header: 'Extension',
      accessor: 'extension',
      show: true
    },
    {
      Header: 'Status',
      accessor: 'status',
      show: true
    }
  ]
  const [columns, setColumns] = useState(Precolumns)

 

  const handleShow = index => {
    console.log(index)
    let newColumns = [...columns]
    newColumns[index].show = !newColumns[index].show
    setColumns(newColumns);
    
  }

  const handleChange = name => event => {
   // console.log('onCick',event.target.checked)
    setcolumnFilter({ ...columnFilter, [name]: event.target.checked });
    const index = columns.map(e => e.accessor).indexOf(name);
   // console.log(columnFilter)
    handleShow(index);
  };


  return (
    <div className="flex flex-col justify-between flex-1 px-24 pt-24">
        <div >
          <div style={{float: "right"}}>
          <IconButton className= "h-40 w-40 p-0"  aria-owns={anchorEl ? 'simple-menu' : null} aria-haspopup="true" onClick={handleClick}>
          <Icon>more_horiz</Icon>
        </IconButton>   
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}><FormControlLabel
        control={
          <Checkbox checked={columnFilter.firstname} onChange={handleChange('firstname')} value="firstname" />
        }
        label="First Name"
      /></MenuItem>
          <MenuItem onClick={handleClose}><FormControlLabel
        control={
          <Checkbox checked={columnFilter.lastname} onChange={handleChange('lastname')} value="lastname" />
        }
        label="Last Name"
      /></MenuItem>
          <MenuItem onClick={handleClose}><FormControlLabel
        control={
          <Checkbox checked={columnFilter.extension} onChange={handleChange('extension')} value="extension" />
        }
        label="Extension"
      /></MenuItem>
       <MenuItem onClick={handleClose}><FormControlLabel
        control={
          <Checkbox checked={columnFilter.status} onChange={handleChange('status')} value="status" />
        }
        label="Status"
      /></MenuItem>
      
        </Menu>            
                          
          </div>
        </div>
      <DraggableTable
        rows={data}
        columns={columns}
        className='-striped -highlight'
        filterable={false}
        show='true'
      />


    </div>
  )
}

export default DataTable