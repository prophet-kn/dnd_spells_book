import React from 'react'
import Icon from './icon'
import propTypes from 'prop-types'

class Icons extends React.Component {
  getIcons() {
    const icons = []

    for (const [index, value] of this.props.item.s_type.entries()) {
      if (value !== 'damage' && value !== 'support' && value !== 'utility') {
        icons.push(<Icon title={value} key={index}/>)
      }
      if (value === 'damage' && this.props.item.s_damage_type !== 'None') {
        icons.push(<Icon title={this.props.item.s_damage_type} key={index}/>)
      }
    }

    return icons
  }

  render() {
    return (
      <span className={'item-icons'}>
        { this.getIcons() }
      </span>
    )
  }
}

Icons.propTypes = {
  item: propTypes.object
}

export default Icons
