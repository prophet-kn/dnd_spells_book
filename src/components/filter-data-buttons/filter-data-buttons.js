import React from 'react'
import ToggleButton from '../toggle-button/toggle-button'

class FilterDataButtons extends React.Component {
  onClickButton(filter, value) {
    this.props.setFilter(this.props.title, filter, value)
  }

  render() {
    return (
      <div className={'filter-button-wrapper'}>
        <h2>{this.props.title}</h2>
        <div className={'selector'}>
          {this.props.values.map((value, i) => {
            return <ToggleButton type={value} key={i} onClick={this.onClickButton.bind(this)} />
          })}
        </div>
      </div>
    )
  }
}

export default FilterDataButtons
