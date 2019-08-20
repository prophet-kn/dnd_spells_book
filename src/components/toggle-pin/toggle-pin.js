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
    return (
      <svg key={this.props.c} className={"spell-pin"} onClick={this.onPinClick.bind(this)} width="20" height="20" viewBox="0 0 16 16" version="1.1" aria-hidden="true"><path fillRule="evenodd" d="M10 1.2V2l.5 1L6 6H2.2c-.44 0-.67.53-.34.86L5 10l-4 5 5-4 3.14 3.14a.5.5 0 0 0 .86-.34V10l3-4.5 1 .5h.8c.44 0 .67-.53.34-.86L10.86.86a.5.5 0 0 0-.86.34z"></path></svg>
    )
  }

}

export default TogglePin
