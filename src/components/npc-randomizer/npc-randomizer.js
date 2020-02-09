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

let getStats = _.chain(NPCStats)
.map(function(data) {
  return data
})
.sort().flatten().uniq().value()

class NPCRandomizer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      race: '',
      stats: ''
    }

    this.npcCard = this.npcCard.bind(this)
    this.pickRace = this.pickRace.bind(this)
    this.getModifier = this.getModifier.bind(this)
  }

  pickRace() {
    let pickRaceOnClick = getRaces[Math.floor(Math.random() * getRaces.length)]
    let pickClassOnClick = getStats[Math.floor(Math.random() * getStats.length)]

    this.setState({
      race: pickRaceOnClick,
      stats: pickClassOnClick
    })
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

  npcCard() {
    let checkRace = this.state.race
    let getClass = this.state.stats
    const dataPerRace =  _.chain(getData)
    .filter((pick) => {
      return _.isEqual(checkRace, pick.race)
    })
    .value()

    return (
      <div className={"dndapp-npcrandomizer-choices-card-details"}>
        {dataPerRace.map((e, i) => {
          let race = e.race,
            age = Math.floor(Math.random() * e.traits.map(a => a.Age)) + 17,
            weight = Math.floor(Math.random() * 20 + 1) + e.traits.map(a => a.weight)[0],
            speed = e.traits.map(a => a.speed),
            darkvision = e.traits.map(a => a.Darkvision),
            sizeFeet = e.traits.map(a => a.size)[0][Math.floor(Math.random() * e.traits.map(a => a.size)[0].length)],
            sizeInches = Math.floor(Math.random() * 12 + 1),
            languages = e.traits.map(a => a.languages),
            raceFeatures = e.traits.map(a => a.extra)[0],
          // Subraces.
            subraces = e.subraces.map(w => w),
            pickedSubrace = subraces.length !== 0 ? Object.keys(subraces[0])[Math.floor(Math.random() * Object.keys(subraces[0]).length)] : null,
            pickExtraFeaturePerPickedSubrace = pickedSubrace !== null ? subraces[0][pickedSubrace][0] : null,
          // Stats.
            extraStrength = Math.floor(e.traits.map(a => a.bonus_stats)[0].map(attr => attr.Strength)),
            extraDexterity = Math.floor(e.traits.map(a => a.bonus_stats)[0].map(attr => attr.Dexterity)),
            extraConstitution = Math.floor(e.traits.map(a => a.bonus_stats)[0].map(attr => attr.Constitution)),
            extraIntelligence = Math.floor(e.traits.map(a => a.bonus_stats)[0].map(attr => attr.Intelligence)),
            extraWisdom = Math.floor(e.traits.map(a => a.bonus_stats)[0].map(attr => attr.Wisdom)),
            extraChairsma = Math.floor(e.traits.map(a => a.bonus_stats)[0].map(attr => attr.Chairsma)),
            checkIfBonusStatsExist = pickExtraFeaturePerPickedSubrace !== null ? _.hasIn(pickExtraFeaturePerPickedSubrace, 'bonus_stats') : false,
            getExtraStengthPerSubrace = checkIfBonusStatsExist === true ? pickExtraFeaturePerPickedSubrace.bonus_stats[0].Strength : 0,
            getExtraDexterityPerSubrace = checkIfBonusStatsExist === true ? pickExtraFeaturePerPickedSubrace.bonus_stats[0].Dexterity : 0,
            getExtraConstitutionPerSubrace = checkIfBonusStatsExist === true ? pickExtraFeaturePerPickedSubrace.bonus_stats[0].Constitution : 0,
            getExtraIntelligencePerSubrace = checkIfBonusStatsExist === true ? pickExtraFeaturePerPickedSubrace.bonus_stats[0].Intelligence : 0,
            getExtraWisdomPerSubrace = checkIfBonusStatsExist === true ? pickExtraFeaturePerPickedSubrace.bonus_stats[0].Wisdom : 0,
            getExtraCharismaPerSubrace = checkIfBonusStatsExist === true ? pickExtraFeaturePerPickedSubrace.bonus_stats[0].Charisma : 0,
          // Total extra stats.
            totalExtraStrength = extraStrength + (_.isEqual(getExtraStengthPerSubrace, undefined) ? 0 : getExtraStengthPerSubrace),
            totalExtraDexterity = extraDexterity + (_.isEqual(getExtraDexterityPerSubrace, undefined) ? 0 : getExtraDexterityPerSubrace),
            totalExtraConstitution = extraConstitution + (_.isEqual(getExtraConstitutionPerSubrace, undefined) ? 0 : getExtraConstitutionPerSubrace),
            totalExtraIntelligence = extraIntelligence + (_.isEqual(getExtraIntelligencePerSubrace, undefined) ? 0 : getExtraIntelligencePerSubrace),
            totalExtraWisdom = extraWisdom + (_.isEqual(getExtraWisdomPerSubrace, undefined) ? 0 : getExtraWisdomPerSubrace),
            totalExtraChairsma = extraChairsma + (_.isEqual(getExtraCharismaPerSubrace, undefined) ? 0 : getExtraCharismaPerSubrace),
          // Get other features.
            subraceExtraFeaturesKeys = pickExtraFeaturePerPickedSubrace !== null ? Object.keys(pickExtraFeaturePerPickedSubrace).filter(function(pickExtraFeaturePerPickedSubrace) { return pickExtraFeaturePerPickedSubrace !== 'bonus_stats' }) : '',
            subraceExtraFeaturesValues = pickExtraFeaturePerPickedSubrace !== null ? Object.values(pickExtraFeaturePerPickedSubrace).slice(1) : '',
          // Names
            randomMaleName = e.gender_names.map(w => w.male)[0][Math.floor(Math.random() * e.gender_names.map(w => w.male)[0].length)],
            randomFemaleName = e.gender_names.map(w => w.female)[0][Math.floor(Math.random() * e.gender_names.map(w => w.female)[0].length)],
            randomFamilyName = e.gender_names.map(w => w.family)[0][Math.floor(Math.random() * e.gender_names.map(w => w.family)[0].length)],
            combineNames = [{"Male": randomMaleName, "Female": randomFemaleName}],
            pickGender = Object.keys(combineNames[0])[Math.floor(Math.random() * Object.keys(combineNames[0]).length)],
            pickNameFromGender = combineNames[0][pickGender],
          // Get stats from Class.
            getAllStats = Object.values(getClass)[0][0],
            statBlockName = Object.keys(getClass),
            AC = getAllStats.AC,
            HP = getAllStats.HP,
            classSpeed = getAllStats.speed,
            damageResistances = getAllStats.damageResistance,
            passivePerception = getAllStats.passivePerception,
            classLanguage = getAllStats.Language,
            challengeRating = getAllStats.Challenge,
          // Get nested arrays from Class.
            classStats = getAllStats.stats[0],
            getSavingThrows = getAllStats.saving_throws[0] !== undefined ? getAllStats.saving_throws[0] : '',
          // Skills.
            classSkills = getAllStats.skills[0],
            classSkillsKeys = classSkills !== undefined ? Object.keys(classSkills): '',
            classSkillsValues = classSkills !== undefined ? Object.values(classSkills): '',
          // Features.
            classFeatures = getAllStats.Features[0],
            classFeaturesKeys = classFeatures !== undefined ? Object.keys(classFeatures): '',
            classFeaturesValues = classFeatures !== undefined ? Object.values(classFeatures): '',
          // Actions.
            classActions = getAllStats.Actions[0],
            classActionsKeys = classActions !== undefined ? Object.keys(classActions): '',
            classActionsValues = classActions !== undefined ? Object.values(classActions): '',
          // Reactions.
            classReactions = getAllStats.Reactions[0],
            classReactionsKeys = classReactions !== undefined ? Object.keys(classReactions): '',
            classReactionsValues = classReactions !== undefined ? Object.values(classReactions): ''

          return (
            <div key={i} className={"dndapp-npcrandomizer-choices-card-details-list"}>
              <div className={"dndapp-npcrandomizer-choices-card-details-list-top"}>
                <div className={"dndapp-npcrandomizer-choices-card-details-list-top-names"}>
                  <span>{pickNameFromGender} {randomFamilyName ? ' ' + randomFamilyName : ''}</span>
                  <span>{pickGender} {pickedSubrace !== null ? pickedSubrace + ' ' : ''}{race}</span>
                </div>
                <div className={"dndapp-npcrandomizer-choices-card-details-list-top-misc"}>
                  <span>Age: {age}</span>
                  <span>Size: {sizeFeet}'{sizeInches}''</span>
                  <span>Weight: {weight}</span>
                  <span>Speed: {speed} feet</span>
                  <span>Languages: {languages[0].map(e => e + ' ')}</span>
                  <span>Darkvision: {darkvision} feet</span>
                </div>
                {raceFeatures.map((feature, i) => {
                  return (
                    <div key={i} className={"dndapp-npcrandomizer-choices-card-details-racial-features"}>
                      <div className={"dndapp-npcrandomizer-choices-card-details-racial-features-title"}>
                        <span>Racial Features: </span>
                      </div>
                      <div className={"dndapp-npcrandomizer-choices-card-details-racial-features-list"}>

                        <div className={"dndapp-npcrandomizer-choices-card-details-racial-features-keys"}>
                          {Object.keys(feature)}
                        </div>
                        <div className={"dndapp-npcrandomizer-choices-card-details-racial-features-values"}>
                          {Object.values(feature)}
                        </div>

                      </div>
                    </div>
                  )
                })}
                {subraceExtraFeaturesKeys !== '' ?
                <div className={"dndapp-npcrandomizer-choices-card-details-racial-extra-features"}>
                  <div className={"dndapp-npcrandomizer-choices-card-details-racial-extra-features-title"}>
                    <span>Extra Racial Features: </span>
                  </div>
                  <div className={"dndapp-npcrandomizer-choices-card-details-racial-extra-features-list"}>

                    <div className={"dndapp-npcrandomizer-choices-card-details-racial-extra-features-keys"}>
                      {subraceExtraFeaturesKeys}
                    </div>
                    <div className={"dndapp-npcrandomizer-choices-card-details-racial-extra-features-values"}>
                      {subraceExtraFeaturesValues}
                    </div>

                  </div>
                </div>
              :
              null}
              </div>
              <div className={"dndapp-npcrandomizer-choices-card-details-list-class"}>
                <div className={"dndapp-npcrandomizer-choices-card-details-list-class-top"}>
                  <div className={"dndapp-npcrandomizer-choices-card-details-list-class-top-name"}>
                    <span>{statBlockName}</span>
                  </div>

                  <span>Armor Class {AC}</span>
                  <span>Hit Points {HP}</span>
                  <span>Speed {classSpeed}</span>
                </div>

                <div className={"dndapp-npcrandomizer-choices-card-details-list-class-stats"}>
                  <span>STR {classStats.Strength + totalExtraStrength} ({this.getModifier(classStats.Strength + totalExtraStrength)})</span>
                  <span>DEX {classStats.Dexterity + totalExtraDexterity} ({this.getModifier(classStats.Dexterity + totalExtraDexterity)})</span>
                  <span>CON {classStats.Constitution + totalExtraConstitution} ({this.getModifier(classStats.Constitution + totalExtraConstitution)})</span>
                  <span>INT {classStats.Intelligence + totalExtraIntelligence} ({this.getModifier(classStats.Intelligence + totalExtraIntelligence)})</span>
                  <span>WIS {classStats.Wisdom + totalExtraWisdom} ({this.getModifier(classStats.Wisdom + totalExtraWisdom)})</span>
                  <span>CHA {classStats.Charisma + totalExtraChairsma} ({this.getModifier(classStats.Charisma + totalExtraChairsma)})</span>
                </div>

                <div className={"dndapp-npcrandomizer-choices-card-details-list-class-attributes"}>
                  {getSavingThrows !== '' ?
                  <div className={"dndapp-npcrandomizer-choices-card-details-list-class-attributes-saving-throws"}>
                    <span>Saving Throws</span>
                    <span>{getSavingThrows.Strength !== undefined ? 'Str +' + getSavingThrows.Strength + ' ' : ''}</span>
                    <span>{getSavingThrows.Dexterity !== undefined ? 'Dex +' + getSavingThrows.Dexterity + ' ' : ''}</span>
                    <span>{getSavingThrows.Constitution !== undefined ? 'Con +' + getSavingThrows.Constitution + ' ' : ''}</span>
                    <span>{getSavingThrows.Intelligence !== undefined ? 'Int +' + getSavingThrows.Intelligence + ' ' : ''}</span>
                    <span>{getSavingThrows.Wisdom !== undefined ? 'Wis +' + getSavingThrows.Wisdom + ' ' : ''}</span>
                    <span>{getSavingThrows.Charisma !== undefined ? 'Cha +' + getSavingThrows.Charisma + ' ' : ''}</span>
                  </div>
                : ''}
                  <div className={"dndapp-npcrandomizer-choices-card-details-list-class-attributes-misc"}>
                    {damageResistances !== '' ? <span>Damage resistance {damageResistances}</span> : ''}
                    {passivePerception !== '' ? <span>Passive perception {passivePerception}</span> : ''}
                    {classLanguage !== '' ? <span>Languages {classLanguage}</span> : ''}
                    {challengeRating !== '' ? <span>Challenge {challengeRating}</span> : ''}
                  </div>
                </div>
                <div className={"dndapp-npcrandomizer-choices-card-details-list-class-skills"}>
                  <div className={"dndapp-npcrandomizer-choices-card-details-list-class-skills-keys"}>
                    {classSkillsKeys}
                  </div>
                  <div className={"dndapp-npcrandomizer-choices-card-details-list-class-skills-values"}>
                    {classSkillsValues}
                  </div>
                </div>
                <div className={"dndapp-npcrandomizer-choices-card-details-list-class-features"}>
                  <div className={"dndapp-npcrandomizer-choices-card-details-list-class-features-keys"}>
                    {classFeaturesKeys}
                  </div>
                  <div className={"dndapp-npcrandomizer-choices-card-details-list-class-features-values"}>
                    {classFeaturesValues}
                  </div>
                </div>
                <div className={"dndapp-npcrandomizer-choices-card-details-list-class-actions"}>
                  <div className={"dndapp-npcrandomizer-choices-card-details-list-class-actions-keys"}>
                    {classActionsKeys}
                  </div>
                  <div className={"dndapp-npcrandomizer-choices-card-details-list-class-actions-values"}>
                    {classActionsValues}
                  </div>
                </div>
                <div className={"dndapp-npcrandomizer-choices-card-details-list-class-reactions"}>
                  <div className={"dndapp-npcrandomizer-choices-card-details-list-class-reactions-keys"}>
                    {classReactionsKeys}
                  </div>
                  <div className={"dndapp-npcrandomizer-choices-card-details-list-class-reactions-values"}>
                    {classReactionsValues}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      {dataPerRace.length === 0 ?
        <div className={"dndapp-npcrandomizer-choices-card-details"}>
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
            <span>Total Randomize</span>
          </div>
          <div className={"dndapp-npcrandomizer-choices-btn"}>
            <span>Partial Randomize</span>
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
