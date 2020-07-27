import React, { Component } from 'react'

class initiativeTracker extends Component {
  constructor(props) {
    super()
    this.state = {
      items: 0
    }
  }

  bars() {
    const items = []

    for (let i = 0; i < this.state.items; i += 1) {
      items.push(
        <div key={i}>
          <input type={'number'}></input>
          <input type={'text'}></input>
          <input type={'number'}></input>
          <input type={'number'}></input>
        </div>
      )
    }

    return (
      <div>
        init count, name, hp, add or remove
        {items}
      </div>
    )
  }

  addItem() {
    this.setState({
      items: this.state.items + 1
    })
  }

  removeItem() {
    // Prevent going to negative values in count.
    if (this.state.items !== 0) {
      this.setState({
        items: this.state.items - 1
      })
    } else {
      this.setState({
        items: 0
      })
    }
  }

  render() {
    return (
      <div>
        {this.bars()}
        <div onClick={this.addItem.bind(this)}>
          add
        </div>
        <div onClick={this.removeItem.bind(this)}>
          remove
        </div>
      </div>
    )
  }
}

export default initiativeTracker
