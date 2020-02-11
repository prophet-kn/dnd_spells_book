import React, { Component } from 'react'

class MonsterItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showList: false,
    }

    this.addClassName = this.addClassName.bind(this)
    this.getModifier = this.getModifier.bind(this)
  }

  addClassName(e, i) {
    let monsterState = this.state
    monsterState.showList = monsterState.showList === i ? false : i
    this.setState(monsterState)
  }

  getModifier(int) {
    let mod = int
    switch(int) {
      case 0:
      case 1:
        mod = '-5'
        break
      case 2:
      case 3:
        mod = '-4'
        break
      case 4:
      case 5:
        mod = '-3'
        break
      case 6:
      case 7:
        mod = '-2'
        break
      case 8:
      case 9:
        mod = '-1'
        break
      case 10:
      case 11:
        mod = '+0'
        break
      case 12:
      case 13:
        mod = '+1'
        break
      case 14:
      case 15:
        mod = '+2'
        break
      case 16:
      case 17:
        mod = '+3'
        break
      case 18:
      case 19:
        mod = '+4'
        break
      case 20:
      case 21:
        mod = '+5'
        break
      case 22:
      case 23:
        mod = '+6'
        break
      default:
        mod = 0
    }

    return mod
  }

  monsterDescription(monsterItem, i) {
    // Parse data.
    let name = monsterItem.name,
        AC = monsterItem.AC,
        HP = monsterItem.HP,
        npcSize = monsterItem.size,
        npcType = monsterItem.type,
        classSpeed = monsterItem.speed,
        damageResistances = monsterItem.damageResistance,
        passivePerception = monsterItem.passivePerception,
        classLanguage = monsterItem.Language,
        challengeRating = monsterItem.Challenge,
      // Get nested arrays from Class.
        classStats = monsterItem.stats[0],
        getSavingThrows = monsterItem.saving_throws[0] !== undefined ? monsterItem.saving_throws[0] : '',
      // Skills.
        classSkills = monsterItem.skills[0],
        classSkillsList = classSkills !== undefined ? Object.entries(classSkills): '',
      // Features.
        classFeatures = monsterItem.Features[0],
        classFeaturesList = classFeatures !== undefined ? Object.entries(classFeatures): '',
      // Actions.
        classActions = monsterItem.Actions[0],
        classActionsList = classActions !== undefined ? Object.entries(classActions): '',
      // Reactions.
        classReactions = monsterItem.Reactions[0],
        classReactionsList = classReactions !== undefined ? Object.entries(classReactions): ''

    if (this.state.showList === i) {
      return (
        <div className={"monster-definitions"}>
          <div className={"monster-definitions-top"}>
            <div className={"monster-definitions-top-name"}>
              <h2>{name}</h2>
            </div>
            <div className={"monster-definitions-top-stats"}>
              <span><i>{npcSize} {npcType}</i></span>
              <span><strong>Armor Class</strong> {AC}</span>
              <span><strong>Hit Points</strong> {HP}</span>
              <span><strong>Speed</strong> {classSpeed}</span>
            </div>
          </div>

          <div className={"monster-definitions-stats"}>
            <span><strong>STR</strong> {classStats.Strength} ({this.getModifier(classStats.Strength)})</span>
            <span><strong>DEX</strong> {classStats.Dexterity} ({this.getModifier(classStats.Dexterity)})</span>
            <span><strong>CON</strong> {classStats.Constitution} ({this.getModifier(classStats.Constitution)})</span>
            <span><strong>INT</strong> {classStats.Intelligence} ({this.getModifier(classStats.Intelligence)})</span>
            <span><strong>WIS</strong> {classStats.Wisdom} ({this.getModifier(classStats.Wisdom)})</span>
            <span><strong>CHA</strong> {classStats.Charisma } ({this.getModifier(classStats.Charisma)})</span>
          </div>

          <div className={"monster-definitions-attributes"}>
            {getSavingThrows !== '' ?
            <div className={"monster-definitions-attributes-saving-throws"}>
              <span><strong>Saving Throws</strong></span>
              <span>{getSavingThrows.Strength !== undefined ? 'Str +' + getSavingThrows.Strength + ' ' : ''}</span>
              <span>{getSavingThrows.Dexterity !== undefined ? 'Dex +' + getSavingThrows.Dexterity + ' ' : ''}</span>
              <span>{getSavingThrows.Constitution !== undefined ? 'Con +' + getSavingThrows.Constitution + ' ' : ''}</span>
              <span>{getSavingThrows.Intelligence !== undefined ? 'Int +' + getSavingThrows.Intelligence + ' ' : ''}</span>
              <span>{getSavingThrows.Wisdom !== undefined ? 'Wis +' + getSavingThrows.Wisdom + ' ' : ''}</span>
              <span>{getSavingThrows.Charisma !== undefined ? 'Cha +' + getSavingThrows.Charisma + ' ' : ''}</span>
            </div>
          : ''}
            <div className={"monster-definitions-attributes-misc"}>
              {damageResistances !== '' ? <span><strong>Damage resistance</strong> {damageResistances}</span> : ''}
              {passivePerception !== '' ? <span><strong>Passive perception</strong> {passivePerception}</span> : ''}
              {classLanguage !== '' ? <span><strong>Languages</strong> {classLanguage}</span> : ''}
              {challengeRating !== '' ? <span><strong>Challenge</strong> {challengeRating}</span> : ''}
            </div>
          </div>

          {classSkillsList !== '' ? 
            <div className={"monster-definitions-skills"}>
              {classSkillsList.map(([key, value]) => {
                return (
                  <div key={key} className={"monster-definitions-skills-value"}>
                    <span><b>{key}: </b>{value}</span>
                  </div>
                  )
              })}
            </div>
          : null}

          {classFeaturesList !== '' ? 
            <div className={"monster-definitions-features"}>
              {classFeaturesList.map(([key, value]) => {
                return (
                  <div key={key} className={"monster-definitions-features-value"}>
                    <span><b>{key}: </b>{value}</span>
                  </div>
                  )
              })}
            </div>
          : null}

          {classActionsList !== '' ? 
            <div className={"monster-definitions-actions"}>
              {classActionsList.map(([key, value]) => {
                return (
                  <div key={key} className={"monster-definitions-actions-value"}>
                    <span><b>{key}: </b>{value}</span>
                  </div>
                  )
              })}
            </div>
          : null}

          {classReactionsList !== '' ? 
            <div className={"monster-definitions-reactions"}>
              {classReactionsList.map(([key, value]) => {
                return (
                  <div key={key} className={"monster-definitions-reactions-value"}>
                    <span><b>{key}: </b>{value}</span>
                  </div>
                  )
              })}
            </div>
          : null}
        </div>
      )
    }
  }

  render() {
    let monsterItem = this.props.monsterData
    let i = monsterItem.name

    return (
      <div className={this.state.showList === i ? "monster-dropdown" : "monster-dropdown hide-child"}>
        <div className={"monster-name"} onClick={(e) => {this.addClassName(e, i)}}>
          <span>{monsterItem.name}</span>
          <div className={"monster-tooltip"}>AC: {monsterItem.AC}, HP: {monsterItem.HP}, C: {monsterItem.Challenge}</div>
          <svg className={this.state.showList === i ? "chevron opened" : "chevron"} width="30" height="30" viewBox="0 0 10 16"><path fillRule="evenodd" d="M5 11L0 6l1.5-1.5L5 8.25 8.5 4.5 10 6l-5 5z"></path></svg>
        </div>

        {this.monsterDescription(monsterItem, i)}
      </div>
    )
  }

}

export default MonsterItem
