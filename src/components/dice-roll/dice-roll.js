import React, { Component } from 'react'

class DiceRolls extends Component {
  constructor(props) {
    super()
    this.state = {
      d100: 'Roll d100',
      d20: 'Roll d20',
      d12: 'Roll d12',
      d10: 'Roll d10',
      d8: 'Roll d8',
      d6: 'Roll d6',
      d4: 'Roll d4',
      d2: 'Roll d2',
      rollToggled: true
    }
  }

  rollD100() {
    const roll = Math.floor(Math.random() * 100 + 1)
    this.setState({d100: roll})
  }

  rollD20() {
    const roll = Math.floor(Math.random() * 20 + 1)
    this.setState({d20: roll})
  }

  rollD12() {
    const roll = Math.floor(Math.random() * 12 + 1)
    this.setState({d12: roll})
  }

  rollD10() {
    const roll = Math.floor(Math.random() * 10 + 1)
    this.setState({d10: roll})
  }

  rollD8() {
    const roll = Math.floor(Math.random() * 8 + 1)
    this.setState({d8: roll})
  }

  rollD6() {
    const roll = Math.floor(Math.random() * 6 + 1)
    this.setState({d6: roll})
  }

  rollD4() {
    const roll = Math.floor(Math.random() * 4 + 1)
    this.setState({d4: roll})
  }

  rollD2() {
    const roll = Math.floor(Math.random() * 2 + 1)
    this.setState({d2: roll})
  }

  toggleRollAnimation() {
    this.props.onClick(this.props, this.state)

    this.setState({
      rollToggled: this.state.rollToggled === true ? false : true,
    })
  }

  render() {
    const diceClasses = ['dndapp-dice-rolls-roll-dice']

    if (this.state.rollToggled === false) {
      diceClasses.push('rolling')
    }

    return (
      <div className={'dndapp-dice-rolls'}>
        <span className={'dndapp-dice-rolls-title'}>For best outcome, click and hold, then release for your roll! On mobile you can safely tap!</span>
        <div className={'dndapp-dice-rolls-roll'}>
          <div className={'dndapp-dice-rolls-roll-label'}>D 100</div>
          <div className={diceClasses.join(' ')} onClick={() => {this.rollD100(); this.toggleRollAnimation.bind(this);}}><span>{this.state.d100}</span></div>
        </div>
        <div className={'dndapp-dice-rolls-roll'}>
          <div className={'dndapp-dice-rolls-roll-label'}>D 20</div>
          <div className={'dndapp-dice-rolls-roll-dice d20'} onClick={() => {this.rollD20()}}><span>{this.state.d20}</span></div>
        </div>
        <div className={'dndapp-dice-rolls-roll'}>
          <div className={'dndapp-dice-rolls-roll-label'}>D 12</div>
          <div className={'dndapp-dice-rolls-roll-dice d12'} onClick={() => {this.rollD12()}}><span>{this.state.d12}</span></div>
        </div>
        <div className={'dndapp-dice-rolls-roll'}>
          <div className={'dndapp-dice-rolls-roll-label'}>D 10</div>
          <div className={'dndapp-dice-rolls-roll-dice d10'} onClick={() => {this.rollD10()}}><span>{this.state.d10}</span></div>
        </div>
        <div className={'dndapp-dice-rolls-roll'}>
          <div className={'dndapp-dice-rolls-roll-label'}>D 8</div>
          <div className={'dndapp-dice-rolls-roll-dice d8'} onClick={() => {this.rollD8()}}><span>{this.state.d8}</span></div>
        </div>
        <div className={'dndapp-dice-rolls-roll'}>
          <div className={'dndapp-dice-rolls-roll-label'}>D 6</div>
          <div className={'dndapp-dice-rolls-roll-dice d6'} onClick={() => {this.rollD6()}}><span>{this.state.d6}</span></div>
        </div>
        <div className={'dndapp-dice-rolls-roll'}>
          <div className={'dndapp-dice-rolls-roll-label'}>D 4</div>
          <div className={'dndapp-dice-rolls-roll-dice d4'} onClick={() => {this.rollD4()}}><span>{this.state.d4}</span></div>
        </div>
        <div className={'dndapp-dice-rolls-roll'}>
          <div className={'dndapp-dice-rolls-roll-label'}>D 2</div>
          <div className={'dndapp-dice-rolls-roll-dice d2'} onClick={() => {this.rollD2()}}><span>{this.state.d2}</span></div>
        </div>
      </div>
    )
  }

}

export default DiceRolls
