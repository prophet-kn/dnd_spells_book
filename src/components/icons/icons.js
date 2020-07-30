import React from 'react'
import Icon from './icon'

class Icons extends React.Component {
  render() {
    const icons = []

    for (const [index, value] of this.props.item.s_type.entries()) {
      if (value !== 'damage' && value !== 'support' && value !== 'utility') {
        icons.push(<Icon title={value} key={index}/>)
      }
      if (value === 'damage' && this.props.item.s_damage_type !== 'None') {
        icons.push(<Icon title={this.props.item.s_damage_type} key={index}/>)
      }
    }

    return (
      <span className={'item-icons'}>
        { icons }
      </span>
    )
  }
}

export default Icons
