import React from 'react'

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
      toggled: this.state.toggled === true ? false : true,
    })
  }

  render() {
    const classNames = ['btn']

    if (this.state.toggled === false) {
      classNames.push('selected')
    }

    return (
      <div key={this.props.c} className={classNames.join(' ')} onClick={this.onClickButton.bind(this)}>{this.props.type.toString()}</div>
    )
  }

}

export default ToggleButton
