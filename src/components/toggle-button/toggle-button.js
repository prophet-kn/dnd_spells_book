import React from 'react'
import { cFC } from '../helpers/helpers'
import propTypes from 'prop-types'

class ToggleButton extends React.Component {
  constructor(props) {
    super()
    this.state = {
      toggled: true
    }
  }

  onClickButton() {
    this.props.onClick(this.props, this.state)

    this.setState({
      toggled: this.state.toggled !== true
    })
  }

  render() {
    const classNames = ['btn']

    if (this.state.toggled === false) {
      classNames.push('selected')
    }

    let label = ''
    if (this.props.type !== undefined) {
      label = cFC(this.props.type.toString())
    }

    return (
      <div key={this.props.c} className={classNames.join(' ')} onClick={this.onClickButton.bind(this)}>{label}</div>
    )
  }
}

ToggleButton.propTypes = {
  onClick: propTypes.func,
  type: propTypes.oneOfType([
    propTypes.string,
    propTypes.bool
  ]),
  c: propTypes.string
}

export default ToggleButton
