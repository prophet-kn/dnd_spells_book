import React, { Component } from 'react'
import ReactHtmlParser from 'react-html-parser'

class featItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showList: false,
      toggled: true,
     }

    this.addClassName = this.addClassName.bind(this)
    this.onPinClick = this.onPinClick.bind(this)
  }

  addClassName(e, i) {
    let featState = this.state
    featState.showList = featState.showList === i ? false : i
    this.setState(featState)
  }

  featDescription(featItem, i) {
    if (this.state.showList === i) {
      return (
        <div className={"item-definitions"}>
          <div className={"item-top-level"}>
            <i>Prerequisites:</i>
          </div>
          <div className={"item-details"}>
            <div className={"item-prerequisite-race"}><b>Race:</b> {Array.isArray(featItem.f_prerequisite_race) ? featItem.f_prerequisite_race.join(", ") : featItem.f_prerequisite_race}</div>
            <div className={"item-prerequisite-skill"}><b>Skill:</b> {Array.isArray(featItem.f_prerequisite_skill) ? featItem.f_prerequisite_skill.join(", ") : featItem.f_prerequisite_skill}</div>
          </div>
          <div className={"item-description"}>{ReactHtmlParser(featItem.f_description)}</div>
        </div>
      )
    }
  }

  onPinClick() {
    this.props.pinStatus(this.state.toggled, this.props.feat.f_id)
    this.setState({
      toggled: this.state.toggled === false
    })

  }

  render() {
    let featItem = this.props.feat
    let i = featItem.f_id

    return (
      <div className={this.state.showList === i ? "item-dropdown" : "item-dropdown hide-child"}>
        <div className={"item-name"} onClick={(e) => {this.addClassName(e, i)}}>
          <span>{featItem.f_name}</span>
          <svg className={this.state.showList === i ? "chevron opened" : "chevron"} width="30" height="30" viewBox="0 0 10 16"><path fillRule="evenodd" d="M5 11L0 6l1.5-1.5L5 8.25 8.5 4.5 10 6l-5 5z"></path></svg>
        </div>

        <div onClick={this.onPinClick.bind(this)} className={"item-pin"}>
          <svg width="40" height="40" viewBox="0 0 8 16"><path fillRule="evenodd" d="M4 10.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM4 12a4 4 0 100-8 4 4 0 000 8z"></path></svg>
        </div>
        {this.featDescription(featItem, i)}
      </div>
    )
  }

}

export default featItem