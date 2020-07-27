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
        <li id={i} key={i}>
          <input id={'initiative-' + i} type={'number'}></input>
          <input id={'name-' + i} type={'text'}></input>
          <input id={'current-hp-' + i} type={'number'}></input>
          <input id={'modify-hp-' + i} type={'number'}></input>
        </li>
      )
    }

    return (
      <div>
        init count, name, current hp, add or remove hp
        <ul>
          {items}
        </ul>
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
