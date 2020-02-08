import React, { Component } from 'react'
import NPCData from './../../data/npc_randomizer.json'
import NPCStats from './../../data/npc_stats.json'

class NPCRandomizer extends Component {
  constructor(props) {
    super()
    this.state = {
      view: 'default'
    }

    this.randomizeButtons = this.randomizeButtons.bind(this)
    this.npcCard = this.npcCard.bind(this)
  }

  randomizeButtons() {
    return (
      <div className={"dndapp-npcrandomizer-choices"}>
        <div className={"dndapp-npcrandomizer-choices-title"}>
          <span>Randomize NPC</span>
        </div>
        <div className={"dndapp-npcrandomizer-choices-btn"}>
          <span>Total</span>
        </div>
        <div className={"dndapp-npcrandomizer-choices-btn"}>
          <span>Partial</span>
        </div>
      </div>
    )
  }

  npcCard() {
    return (
      <div>
        yay
      </div>
    )
  }

  render() {
    return (
      <div className={"dndapp-npcrandomzier"}>
        {this.randomizeButtons()}
        {this.npcCard()}
      </div>
    )
  }

}

export default NPCRandomizer
