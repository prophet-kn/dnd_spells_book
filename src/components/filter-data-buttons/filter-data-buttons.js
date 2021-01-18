import React from 'react'
import ToggleButton from '../toggle-button/toggle-button'
import propTypes from 'prop-types'

class FilterDataButtons extends React.Component {
  onClickButton(filter, value) {
    window.scrollTo(0, window.pageYOffset)
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

FilterDataButtons.propTypes = {
  setFilter: propTypes.func,
  title: propTypes.string,
  values: propTypes.array
}

export default FilterDataButtons
