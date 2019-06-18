import React, { useState } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import DraggableTable from './draggableTable'

function DataTable(props) {

     const [data, setData] = useState(props.extensionList);

    console.log('datataa', props)
    const Precolumns = [
      {
        Header:  <span>First Name <button>hide</button></span>,
        accessor: 'firstname',
        
      },
      {
        Header: 'Last Name',
        accessor: 'lastname'
      },
      {
        Header: 'Extension',
        accessor: 'extension'
      },
      {
        Header: 'Status',
        accessor: 'status'
      },
      {
        Header: <button>hide</button>,
        width: 50,
        filterable: false
        
      }
    ]
    const [columns, setColumns] = useState(Precolumns);
 
  
  const handleShow = () => {
    let newColumns = [...columns]
    newColumns[0].show = !newColumns[0].show
    setColumns(newColumns);
  }



   /*  
    const data = [
      {
        firstName: 'Tanner Linsley',
        status: 26,
        lastName: 'Jason Maurer',
        age: 23
      },
      {
        firstName: 'John Doe',
        status: 21,
        lastName: 'Blah',
        age: 20
      },
      {
        firstName: 'Jane Doe',
        status: 36,
        lastName: 'Doe Jane',
        age: 43
      }
    ] */

    return (
      <div  >
        <DraggableTable
          rows={data}
          columns={columns}
          className='-striped -highlight'
          filterable
          show='true'
          
        />
      </div>
    )
  
}

export default DataTable
