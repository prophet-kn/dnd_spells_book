import React, { Component } from 'react'

class initiativeTracker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: 1,
      currentHp: [0, 0]
    }
  }

  bars() {
    const items = []

    for (let i = 0; i < this.state.items; i += 1) {
      items.push(
        <li id={i} key={i}>
          <input id={'initiative'} type={'number'}></input>
          <input id={'name'} type={'text'} defaultValue={'Name'}></input>
          <input id={'current-hp'} type={'number'} value={this.state.currentHp[1]} onChange={(e) => this.setState({ currentHp: [i, e.target.value] })}></input>
          <input id={'add-hp'} type={'number'} onKeyDown={(e) => this.updateHP(items, i, e, 'add')}></input>
          <input id={'remove-hp'} type={'number'} onKeyDown={(e) => this.updateHP(items, i, e, 'remove')}></input>
        </li>
      )
    }

    return (
      <div>
        init count, name, current hp, add hp, remove hp
        <ul>
          {items}
        </ul>
      </div>
    )
  }

  updateHP(items, currentKey, value, check) {
    console.log(
      this.state.currentHp
    )
    if (value.key === 'Enter') {
      items.forEach((val, key) => {
        if (currentKey === key) {
          val.props.children.forEach((child, i) => {
            if (child.props.id === 'current-hp') {
              if (check === 'add') {
                this.setState({
                  currentHp: [
                    currentKey,
                    parseInt(this.state.currentHp[1]) + parseInt(value.target.value)
                  ]
                })
                value.target.value = null
              } else if (check === 'remove') {
                this.setState({
                  currentHp: [
                    currentKey,
                    parseInt(this.state.currentHp[1]) - parseInt(value.target.value)
                  ]
                })
                value.target.value = null
              }
            }
          })
        }
      })
    }
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
