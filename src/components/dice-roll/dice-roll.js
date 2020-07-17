import React, { Component } from 'react'

class DiceRolls extends Component {
  constructor (props) {
    super()
    this.state = {
      d100: 'Roll d100',
      d20: 'Roll d20',
      d12: 'Roll d12',
      d10: 'Roll d10',
      d8: 'Roll d8',
      d6: 'Roll d6',
      d4: 'Roll d4',
      rollToggled: true,
      resultD100: [],
      resultD20: [],
      resultD12: [],
      resultD10: [],
      resultD8: [],
      resultD6: [],
      resultD4: [],
      totalD100: 0,
      totalD20: 0,
      totalD12: 0,
      totalD10: 0,
      totalD8: 0,
      totalD6: 0,
      totalD4: 0
    }
  }

  rollD100 () {
    const roll = Math.floor(Math.random() * 100 + 1)
    this.setState({ d100: roll })
    this.state.resultD100.push(roll + ', ')
    this.setState({ totalD100: this.state.totalD100 + roll })
  }

  rollD20 () {
    const roll = Math.floor(Math.random() * 20 + 1)
    this.setState({ d20: roll })
    this.state.resultD20.push(roll + ', ')
    this.setState({ totalD20: this.state.totalD20 + roll })
  }

  rollD12 () {
    const roll = Math.floor(Math.random() * 12 + 1)
    this.setState({ d12: roll })
    this.state.resultD12.push(roll + ', ')
    this.setState({ totalD12: this.state.totalD12 + roll })
  }

  rollD10 () {
    const roll = Math.floor(Math.random() * 10 + 1)
    this.setState({ d10: roll })
    this.state.resultD10.push(roll + ', ')
    this.setState({ totalD10: this.state.totalD10 + roll })
  }

  rollD8 () {
    const roll = Math.floor(Math.random() * 8 + 1)
    this.setState({ d8: roll })
    this.state.resultD8.push(roll + ', ')
    this.setState({ totalD8: this.state.totalD8 + roll })
  }

  rollD6 () {
    const roll = Math.floor(Math.random() * 6 + 1)
    this.setState({ d6: roll })
    this.state.resultD6.push(roll + ', ')
    this.setState({ totalD6: this.state.totalD6 + roll })
  }

  rollD4 () {
    const roll = Math.floor(Math.random() * 4 + 1)
    this.setState({ d4: roll })
    this.state.resultD4.push(roll + ', ')
    this.setState({ totalD4: this.state.totalD4 + roll })
  }

  toggleRollAnimation () {
    this.props.onClick(this.props, this.state)

    this.setState({
      rollToggled: this.state.rollToggled !== true
    })
  }

  render () {
    return (
      <div className={'dndapp-dice-rolls'}>
        <span className={'dndapp-dice-rolls-title'}>For best outcome, click and hold, then release for your roll! On mobile you can safely tap!</span>

        <div className={'dndapp-dice-rolls-roll'}>
          <span>Type</span>
          <span>Roll</span>
          <span>History</span>
          <span>Total</span>
        </div>

        <div className={'dndapp-dice-rolls-roll'}>
          <svg onClick={() => { this.rollD100(); this.toggleRollAnimation.bind(this) }} className={'dndapp-dice-rolls-roll-dice d100'} viewBox="0 0 99.945321 100.00108" height="100.00108" width="99.945312">
            <g transform="translate(35.154651,-13.987975)">
              <path transform="matrix(-0.2494573,-0.933079,0.93275015,-0.25049118,-68.37509,29.339202)" d="m -13.404712,99.112633 -9.908601,12.236107 -13.204804,8.5753 -15.208427,4.07508 -15.723345,-0.82402 -14.699151,-5.64248 -12.236103,-9.9086 -8.575297,-13.204804 -4.07509,-15.208428 0.82403,-15.723345 5.64247,-14.699151 9.908604,-12.236103 13.204803,-8.5753 15.208427,-4.075085 15.723345,0.824025 14.699152,5.642476 12.236103,9.908601 8.575299,13.204803 4.075086,15.208428 -0.8240256,15.723344 z" />
            </g>
          </svg>
          <div className={'dndapp-dice-rolls-roll-label'}><span>{this.state.d100}</span></div>
          <div className={'dndapp-dice-rolls-roll-result'}><span>{this.state.resultD100}</span></div>
          <div className={'dndapp-dice-rolls-roll-total'}><span>{this.state.totalD100}</span></div>

        </div>

        <div className={'dndapp-dice-rolls-roll'}>
          <svg onClick={() => { this.rollD20() }} className={'dndapp-dice-rolls-roll-dice d20'} viewBox="0 0 100.87276 100.92654" height="100.92654" width="100.87276">
            <g transform="translate(0.34624218,0.21825997)">
              <path transform="matrix(1.0128867,-0.27154687,0.2714022,1.0134267,-11.87469,12.705916)" d="M 89.659294,74.011627 47.817982,98.16872 5.9766691,74.011627 5.9766693,25.697441 47.817982,1.5403481 89.659294,25.697441 Z" />
            </g>
          </svg>
          <div className={'dndapp-dice-rolls-roll-label'}><span>{this.state.d20}</span></div>
          <div className={'dndapp-dice-rolls-roll-result'}><span>{this.state.resultD20}</span></div>
          <div className={'dndapp-dice-rolls-roll-total'}><span>{this.state.totalD20}</span></div>

        </div>

        <div className={'dndapp-dice-rolls-roll'}>
          <svg onClick={() => { this.rollD12() }} className={'dndapp-dice-rolls-roll-dice d12'} viewBox="0 0 100.04429 99.79877" height="99.798767" width="100.04428">
            <g transform="translate(26.729747,-10.842244)">
              <path transform="matrix(-0.27080069,-0.97765477,1.0125556,-0.26245784,-71.244751,25.268328)" d="M -13.404712,99.112633 -67.449889,123.1751 -107.03553,79.210788 -77.455623,27.976889 -19.588596,40.276906 Z" />
            </g>
          </svg>
          <div className={'dndapp-dice-rolls-roll-label'}><span>{this.state.d12}</span></div>
          <div className={'dndapp-dice-rolls-roll-result'}><span>{this.state.resultD12}</span></div>
          <div className={'dndapp-dice-rolls-roll-total'}><span>{this.state.totalD12}</span></div>

        </div>

        <div className={'dndapp-dice-rolls-roll'}>
          <svg onClick={() => { this.rollD10() }} className={'dndapp-dice-rolls-roll-dice d10'} viewBox="0 0 73.007003 99.942128" height="99.942131" width="73.006996">
            <g transform="translate(26.621131,-21.3026)">
              <path d="M 9.882367,23.351062 44.9065,56.896881 V 85.65044 L 9.882367,119.19627 -25.141766,85.65044 V 56.896881 Z" />
            </g>
          </svg>
          <div className={'dndapp-dice-rolls-roll-label'}><span>{this.state.d10}</span></div>
          <div className={'dndapp-dice-rolls-roll-result'}><span>{this.state.resultD10}</span></div>
          <div className={'dndapp-dice-rolls-roll-total'}><span>{this.state.totalD10}</span></div>

        </div>

        <div className={'dndapp-dice-rolls-roll'}>
          <svg onClick={() => { this.rollD8() }} className={'dndapp-dice-rolls-roll-dice d8'} viewBox="0 0 80.331405 99.997105" height="99.997108" width="80.331398">
            <g transform="translate(35.117633,-14.165227)">
              <path transform="matrix(-0.38734521,-0.83539136,0.671301,-0.4826014,-66.668545,52.246038)" d="M -13.404712,99.112633 -82.14904,117.53262 -100.56903,48.788292 -31.824699,30.368305 Z" />
            </g>
          </svg>
          <div className={'dndapp-dice-rolls-roll-label'}><span>{this.state.d8}</span></div>
          <div className={'dndapp-dice-rolls-roll-result'}><span>{this.state.resultD8}</span></div>
          <div className={'dndapp-dice-rolls-roll-total'}><span>{this.state.totalD8}</span></div>

        </div>

        <div className={'dndapp-dice-rolls-roll'}>
          <svg onClick={() => { this.rollD6() }} className={'dndapp-dice-rolls-roll-dice d6'} viewBox="0 0 99.987453 100.17678" height="100.17678" width="99.98745">
            <g transform="translate(11.437716,5.7475448)">
              <path transform="matrix(1.1089479,0,0,1.1110477,101.75148,-37.821646)" d="M -13.404712,99.112633 -82.14904,117.53262 -100.56903,48.788292 -31.824699,30.368305 Z" />
            </g>
          </svg>
          <div className={'dndapp-dice-rolls-roll-label'}><span>{this.state.d6}</span></div>
          <div className={'dndapp-dice-rolls-roll-result'}><span>{this.state.resultD6}</span></div>
          <div className={'dndapp-dice-rolls-roll-total'}><span>{this.state.totalD6}</span></div>

        </div>

        <div className={'dndapp-dice-rolls-roll'}>
          <svg onClick={() => { this.rollD4() }} className={'dndapp-dice-rolls-roll-dice d4'} viewBox="0 0 100.00087 100.05759" height="100.05759" width="100.00086">
            <g transform="translate(21.984946,8.1786587)">
              <path transform="matrix(1.1077933,-0.29651448,0.29739438,1.1087025,61.669664,-49.549089)" d="m -13.404712,99.112633 -87.164318,0 43.58216,-75.486511 z" />
            </g>
          </svg>
          <div className={'dndapp-dice-rolls-roll-label'}><span>{this.state.d4}</span></div>
          <div className={'dndapp-dice-rolls-roll-result'}><span>{this.state.resultD4}</span></div>
          <div className={'dndapp-dice-rolls-roll-total'}><span>{this.state.totalD4}</span></div>

        </div>

      </div>
    )
  }
}

export default DiceRolls
