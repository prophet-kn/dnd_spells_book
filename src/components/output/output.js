import React, { Component } from 'react'
import '.././../App.css'
import DataTable from './../data-table/data-table'

// Output Component
class Output extends Component {

  render() {
    return (
      <div className={"dndapp-wrapper"}>
        <DataTable/>
      </div>
    )

  }

}

export default Output
