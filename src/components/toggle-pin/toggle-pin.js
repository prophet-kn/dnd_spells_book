import React from 'react'

class TogglePin extends React.Component {
  constructor(props) {
    super()
    this.state = {
      toggled: true
    }
  }

  onPinClick() {
    this.props.onPin(this.state.toggled, this.props.type)
    this.setState({
      toggled: this.state.toggled === true ? false : true,
    })
  }
  onClickButton(filter, value) {
    this.props.setFilter(this.props.title, filter, value)
  }

  render() {
    const classNames = ['spell-pin']

    if (this.state.toggled === false) {
      classNames.push('pinned')
    }

    return (
      <div key={this.props.c} className={classNames.join(' ')} onClick={this.onPinClick.bind(this)}></div>
    )
  }

}

export default TogglePin
