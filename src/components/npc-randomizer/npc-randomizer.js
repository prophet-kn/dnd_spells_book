import React, { Component } from 'react'
import _ from 'lodash'
import NPCData from './../../data/npc_randomizer.json'
import NPCStats from './../../data/npc_stats.json'

let getData = _.chain(NPCData)
.map(function(data) {
  return data
})
.sort().flatten().uniq().value()

let getRaces = _.chain(NPCData)
.map(function(data) {
  return data.race
})
.sort().flatten().uniq().value()

class NPCRandomizer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      race: ''
    }

    this.npcCard = this.npcCard.bind(this)
    this.pickRace = this.pickRace.bind(this)
  }

  pickRace() {
    let pickRaceOnClick = getRaces[Math.floor(Math.random() * getRaces.length)]

    this.setState({
      race: pickRaceOnClick
    })
  }

  npcCard() {
    let checkRace = this.state.race
    const dataPerRace =  _.chain(getData)
    .filter((pick) => {
      return _.isEqual(checkRace, pick.race)
    })
    .value()

    return (
      <div className={"q"}>
        {dataPerRace.map((e, i) => {
          let race = e.race,
              age = Math.floor(Math.random() * e.traits.map(a => a.Age)) + 17,
              weight = Math.floor(Math.random() * 20 + 1) + e.traits.map(a => a.weight)[0],
              speed = e.traits.map(a => a.speed),
              darkvision = e.traits.map(a => a.Darkvision),
              extraStrength = Math.floor(e.traits.map(a => a.bonus_stats)[0].map(attr => attr.Strength)),
              extraDexterity = Math.floor(e.traits.map(a => a.bonus_stats)[0].map(attr => attr.Dexterity)),
              extraConstitution = Math.floor(e.traits.map(a => a.bonus_stats)[0].map(attr => attr.Constitution)),
              extraIntelligence = Math.floor(e.traits.map(a => a.bonus_stats)[0].map(attr => attr.Intelligence)),
              extraWisdom = Math.floor(e.traits.map(a => a.bonus_stats)[0].map(attr => attr.Wisdom)),
              extraChairsma = Math.floor(e.traits.map(a => a.bonus_stats)[0].map(attr => attr.Chairsma)),
              sizeFeet = e.traits.map(a => a.size)[0][Math.floor(Math.random() * e.traits.map(a => a.size)[0].length)],
              sizeInches = Math.floor(Math.random() * 12 + 1),
              languages = e.traits.map(a => a.languages),
              raceFeatures = e.traits.map(a => a.extra)[0]

          console.log(
            e.subraces.map(w => w)
            //e.gender_names.map(w => w)
          )

          return (
            <div key={i}>
              <br></br>Race: {race}
              <br></br>Age: {age}
              <br></br>Weight: {weight}
              <br></br>Speed: {speed} feet
              <br></br>Darkvision: {darkvision} feet
              <br></br>Size: {sizeFeet}'{sizeInches}''
              <br></br>Languages: {languages}
              <br></br>Racial Features: 
                {raceFeatures.map((feature, i) => {
                  return (
                    <div key={i} className={"Racial Features"} >
                      {Object.entries(feature)}
                    </div>
                  )
                })}
            </div>
          )
        })}
        {dataPerRace.length === 0 ?
          <div className={"qq"}>
            <span>Click one of the buttons to generate NPC!</span>
          </div>
        : null}
      </div>
    )

  }

  render() {
    return (
      <div className={"dndapp-npcrandomzier"}>
        <div className={"dndapp-npcrandomizer-choices"}>
          <div className={"dndapp-npcrandomizer-choices-title"}>
            <span>Randomize NPC</span>
          </div>
          <div className={"dndapp-npcrandomizer-choices-btn"} onClick={(e) => this.pickRace()} >
            <span>Total</span>
          </div>
          <div className={"dndapp-npcrandomizer-choices-btn"}>
            <span>Partial</span>
          </div>
          <div className={"dndapp-npcrandomizer-choices-card"}>
            {this.npcCard()}
          </div>
        </div>
      </div>
    )
  }

}

export default NPCRandomizer
