import React, { Component } from 'react'
import ReactHtmlParser from 'react-html-parser'
import Icons from '../icons/icons'

class SpellItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showList: false,
      toggled: true
    }

    this.addClassName = this.addClassName.bind(this)
    this.onPinClick = this.onPinClick.bind(this)
  }

  addClassName(e, i) {
    const spellState = this.state
    spellState.showList = spellState.showList === i ? false : i
    this.setState(spellState)
  }

  spellDescription(spellItem, i) {
    if (this.state.showList === i) {
      return (
        <div className={'item-definitions'}>
          <div className={'item-top-level'}>
            <i>{spellItem.s_lvl} Level {spellItem.s_school} spell {spellItem.s_ritual === true ? '(ritual)' : ''}</i>
          </div>
          <div className={'item-details'}>
            <div className={'item-casting-time'}><b>Casting Time:</b> {spellItem.s_cast_time}</div>
            <div className={'item-range'}><b>Range:</b> {spellItem.s_range}</div>
            <div className={'item-components'}><b>Components:</b> {spellItem.s_components}</div>
            <div className={'item-duration'}><b>Duration:</b> {spellItem.s_duration}</div>
            {spellItem.s_damage_type !== 'None' && <div className={'item-damage'}><b>Damage:</b> {spellItem.s_damage_dice} {spellItem.s_damage_type}</div>}
          </div>
          <div className={'item-description'}>{ReactHtmlParser(spellItem.s_description)}</div>
          <div className={'item-can-cast'}><i>Classes: {spellItem.s_class_usage.join(', ')}</i></div>
        </div>
      )
    }
  }

  onPinClick() {
    this.props.pinStatus(this.state.toggled, this.props.spell.s_id)
    this.setState({
      toggled: this.state.toggled === false
    })
  }

  render() {
    const spellItem = this.props.spell
    const i = spellItem.s_id

    return (
      <div className={this.state.showList === i ? 'item-dropdown' : 'item-dropdown hide-child'}>
        <div className={'item-name'} onClick={(e) => { this.addClassName(e, i) }}>
          <span className={'item-label'}>{spellItem.s_name}</span>
          <Icons item={spellItem}/>
          <div className={'item-tooltip'}>L: {spellItem.s_lvl.slice(0, 1)}</div>
          <svg className={this.state.showList === i ? 'chevron opened' : 'chevron'} width="30" height="30" viewBox="0 0 10 16"><path fillRule="evenodd" d="M5 11L0 6l1.5-1.5L5 8.25 8.5 4.5 10 6l-5 5z"></path></svg>
        </div>

        <div onClick={this.onPinClick.bind(this)} className={'item-pin'}>
          <svg width="40" height="40" viewBox="0 0 8 16"><path fillRule="evenodd" d="M4 10.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM4 12a4 4 0 100-8 4 4 0 000 8z"></path></svg>
        </div>
        {this.spellDescription(spellItem, i)}
      </div>
    )
  }
}

export default SpellItem
