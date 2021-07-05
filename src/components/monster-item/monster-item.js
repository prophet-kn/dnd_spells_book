import React, { Component } from 'react'
import { MonsterDescription } from './monster-description'

class MonsterItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showList: false
    }

    this.addClassName = this.addClassName.bind(this)
  }

  addClassName(e, i) {
    const monsterState = this.state
    monsterState.showList = monsterState.showList === i ? false : i
    this.setState(monsterState)
  }

  render() {
    const monsterItem = this.props.monsterData
    const i = monsterItem.name

    return (
      <div className={this.state.showList === i ? 'monster-dropdown' : 'monster-dropdown hide-child'}>
        <div className={'monster-name'} onClick={ (e) => { this.addClassName(e, i) } }>
          <span>{monsterItem.name}</span>
          <div className={'monster-tooltip'}>CR: {monsterItem.Challenge}</div>
          <svg className={this.state.showList === i ? 'chevron opened' : 'chevron'} width='30' height='30' viewBox='0 0 10 16'><path fillRule='evenodd' d='M5 11L0 6l1.5-1.5L5 8.25 8.5 4.5 10 6l-5 5z'></path></svg>
        </div>
        {this.state.showList === i ? <MonsterDescription monsterItem={monsterItem} i={i}/> : null}
      </div>
    )
  }
}

export default MonsterItem
