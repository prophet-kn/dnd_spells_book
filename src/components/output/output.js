import React, { Component } from 'react'
import DataTable from './../data-table/data-table'

class Output extends Component {
  constructor(props) {
    super()
    this.state = {
      currentView: 'default'
    }
  }

  render() {
    return (
      <div className={"dndapp-wrapper"}>
        <DataTable/>
      </div>
    )

  }

}

export default Output
