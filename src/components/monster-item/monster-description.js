import React from 'react'

const MonsterDescription = ({ monsterItem, i }) => {
  const getModifier = (int) => {
    let mod = int
    switch (int) {
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

  // Parse data.
  const name = monsterItem.name
  const AC = monsterItem.AC
  const HP = monsterItem.HP
  const npcSize = monsterItem.size
  const npcType = monsterItem.type
  const alignment = monsterItem.alignment
  const classSpeed = monsterItem.speed
  const damageResistances = monsterItem.damageResistance
  const passivePerception = monsterItem.passivePerception
  const classLanguage = monsterItem.Language
  const challengeRating = monsterItem.Challenge
  // Get nested arrays from Class
  const classStats = monsterItem.stats[0]
  const getSavingThrows = monsterItem.saving_throws[0] !== undefined ? monsterItem.saving_throws[0] : ''
  // Skills
  const classSkills = monsterItem.skills[0]
  const classSkillsList = classSkills !== undefined ? Object.entries(classSkills) : ''
  // Features
  const classFeatures = monsterItem.Features[0]
  const classFeaturesList = classFeatures !== undefined ? Object.entries(classFeatures) : ''
  // Actions
  const classActions = monsterItem.Actions[0]
  const classActionsList = classActions !== undefined ? Object.entries(classActions) : ''
  // Reactions
  const classReactions = monsterItem.Reactions[0]
  const classReactionsList = classReactions !== undefined ? Object.entries(classReactions) : ''
  // Legendary Actions
  const classLegendaryActions = monsterItem.LegendaryActions[0]
  const classLegendaryActionsList = classLegendaryActions !== undefined ? Object.entries(classLegendaryActions) : ''

  return (
    <div className={'monster-definitions'}>
      <div className={'monster-definitions-top'}>
        <div className={'monster-definitions-top-name'}>
          <h2>{name}</h2>
        </div>
        <div className={'monster-definitions-top-stats'}>
          <span><i>{npcSize} {npcType}{alignment ? ', ' : null}{alignment}</i></span>
          <span><strong>Armor Class: </strong> {AC}</span>
          <span><strong>Hit Points: </strong> {HP}</span>
          <span><strong>Speed: </strong> {classSpeed}</span>
        </div>
      </div>

      <div className={'monster-definitions-stats'}>
        <span><strong>STR</strong> {classStats.Strength} ({getModifier(classStats.Strength)})</span>
        <span><strong>DEX</strong> {classStats.Dexterity} ({getModifier(classStats.Dexterity)})</span>
        <span><strong>CON</strong> {classStats.Constitution} ({getModifier(classStats.Constitution)})</span>
        <span><strong>INT</strong> {classStats.Intelligence} ({getModifier(classStats.Intelligence)})</span>
        <span><strong>WIS</strong> {classStats.Wisdom} ({getModifier(classStats.Wisdom)})</span>
        <span><strong>CHA</strong> {classStats.Charisma } ({getModifier(classStats.Charisma)})</span>
      </div>

      <div className={'monster-definitions-attributes'}>
        {getSavingThrows !== ''
          ? <div className={'monster-definitions-attributes-saving-throws'}>
            <span><strong>Saving Throws: </strong></span>
            {getSavingThrows.Strength !== undefined ? <span>Str + {getSavingThrows.Strength}, </span> : ''}
            {getSavingThrows.Dexterity !== undefined ? <span>Dex + {getSavingThrows.Dexterity}, </span> : ''}
            {getSavingThrows.Constitution !== undefined ? <span>Con + {getSavingThrows.Constitution}, </span> : ''}
            {getSavingThrows.Intelligence !== undefined ? <span>Int + {getSavingThrows.Intelligence}, </span> : ''}
            {getSavingThrows.Wisdom !== undefined ? <span>Wis + {getSavingThrows.Wisdom}, </span> : ''}
            {getSavingThrows.Charisma !== undefined ? <span>Cha + {getSavingThrows.Charisma}, </span> : ''}
          </div>
          : ''}
        <div className={'monster-definitions-attributes-misc'}>
          {damageResistances !== '' ? <span><strong>Damage Resistances: </strong> {damageResistances}</span> : ''}
          {passivePerception !== '' ? <span><strong>Passive Perception: </strong> {passivePerception}</span> : ''}
          {classLanguage !== '' ? <span><strong>Languages: </strong> {classLanguage}</span> : ''}
          {challengeRating !== '' ? <span><strong>Challenge: </strong> {challengeRating}</span> : ''}
        </div>
      </div>

      {classSkillsList !== ''
        ? <div className={'monster-definitions-skills'}>
          {classSkillsList.map(([key, value]) => {
            return (
              <div key={key} className={'monster-definitions-skills-value'}>
                <span><b>{key}: </b>{value}</span>
              </div>
            )
          })}
        </div>
        : null}

      {classFeaturesList !== ''
        ? <div className={'monster-definitions-features'}>
          {classFeaturesList.map(([key, value]) => {
            return (
              <div key={key} className={'monster-definitions-features-value'}>
                <span><b>{key}: </b>{value}</span>
              </div>
            )
          })}
        </div>
        : null}

      {classActionsList !== ''
        ? <div className={'monster-definitions-actions'}>
          {classActionsList.map(([key, value]) => {
            return (
              <div key={key} className={'monster-definitions-actions-value'}>
                <span><b>{key}: </b>{value}</span>
              </div>
            )
          })}
        </div>
        : null}

      {classReactionsList !== ''
        ? <div className={'monster-definitions-reactions'}>
          {classReactionsList.map(([key, value]) => {
            return (
              <div key={key} className={'monster-definitions-reactions-value'}>
                <span><b>{key}: </b>{value}</span>
              </div>
            )
          })}
        </div>
        : null}

      {classLegendaryActionsList !== ''
        ? <div className={'monster-definitions-reactions'}>
          {classLegendaryActionsList.map(([key, value]) => {
            return (
              <div key={key} className={'monster-definitions-legendary-actions-value'}>
                <span><b>{key}: </b>{value}</span>
              </div>
            )
          })}
        </div>
        : null}
    </div>
  )
}

export { MonsterDescription }
