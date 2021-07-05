import React, { Component } from 'react'
import _ from 'lodash'
import NPCData from './../../data/npc_randomizer.json'
import NPCStats from './../../data/npc_stats.json'

const getData = _.chain(NPCData)
  .map(function(data) {
    return data
  })
  .sort().flatten().uniq().value()

const getRaces = _.chain(NPCData)
  .map(function(data) {
    return data.race
  })
  .sort().flatten().uniq().value()

const getStats = _.chain(NPCStats)
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
    const pickRaceOnClick = getRaces[Math.floor(Math.random() * getRaces.length)]
    const pickClassOnClick = getStats[Math.floor(Math.random() * getStats.length)]

    this.setState({
      race: pickRaceOnClick,
      stats: pickClassOnClick
    })
  }

  getModifier(int) {
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

  npcCard() {
    const checkRace = this.state.race
    const getClass = this.state.stats
    const dataPerRace = _.chain(getData)
      .filter((pick) => {
        return _.isEqual(checkRace, pick.race)
      })
      .value()

    return (
      <div className={'dndapp-npcrandomizer-choices-card-details'}>
        {dataPerRace.map((e, i) => {
          const race = e.race
          const age = Math.floor(Math.random() * e.traits.map(a => a.Age)) + 17
          const weight = Math.floor(Math.random() * 20 + 1) + e.traits.map(a => a.weight)[0]
          const speed = e.traits.map(a => a.speed)
          const darkvision = e.traits.map(a => a.Darkvision)
          const sizeFeet = e.traits.map(a => a.size)[0][Math.floor(Math.random() * e.traits.map(a => a.size)[0].length)]
          const sizeInches = Math.floor(Math.random() * 12 + 1)
          const languages = e.traits.map(a => a.languages)
          const raceFeatures = e.traits.map(a => a.extra)[0]
          // Subraces.
          const subraces = e.subraces.map(w => w)
          const pickedSubrace = subraces.length !== 0 ? Object.keys(subraces[0])[Math.floor(Math.random() * Object.keys(subraces[0]).length)] : null
          const pickExtraFeaturePerPickedSubrace = pickedSubrace !== null ? subraces[0][pickedSubrace][0] : null
          // Stats.
          const extraStrength = Math.floor(e.traits.map(a => a.bonus_stats)[0].map(attr => attr.Strength))
          const extraDexterity = Math.floor(e.traits.map(a => a.bonus_stats)[0].map(attr => attr.Dexterity))
          const extraConstitution = Math.floor(e.traits.map(a => a.bonus_stats)[0].map(attr => attr.Constitution))
          const extraIntelligence = Math.floor(e.traits.map(a => a.bonus_stats)[0].map(attr => attr.Intelligence))
          const extraWisdom = Math.floor(e.traits.map(a => a.bonus_stats)[0].map(attr => attr.Wisdom))
          const extraChairsma = Math.floor(e.traits.map(a => a.bonus_stats)[0].map(attr => attr.Chairsma))
          // Bonus stats per race.
          const checkIfBonusStatsExist = pickExtraFeaturePerPickedSubrace !== null ? _.hasIn(pickExtraFeaturePerPickedSubrace, 'bonus_stats') : false
          const getExtraStengthPerSubrace = checkIfBonusStatsExist === true ? pickExtraFeaturePerPickedSubrace.bonus_stats[0].Strength : 0
          const getExtraDexterityPerSubrace = checkIfBonusStatsExist === true ? pickExtraFeaturePerPickedSubrace.bonus_stats[0].Dexterity : 0
          const getExtraConstitutionPerSubrace = checkIfBonusStatsExist === true ? pickExtraFeaturePerPickedSubrace.bonus_stats[0].Constitution : 0
          const getExtraIntelligencePerSubrace = checkIfBonusStatsExist === true ? pickExtraFeaturePerPickedSubrace.bonus_stats[0].Intelligence : 0
          const getExtraWisdomPerSubrace = checkIfBonusStatsExist === true ? pickExtraFeaturePerPickedSubrace.bonus_stats[0].Wisdom : 0
          const getExtraCharismaPerSubrace = checkIfBonusStatsExist === true ? pickExtraFeaturePerPickedSubrace.bonus_stats[0].Charisma : 0
          // Total extra stats.
          const totalExtraStrength = extraStrength + (_.isEqual(getExtraStengthPerSubrace, undefined) ? 0 : getExtraStengthPerSubrace)
          const totalExtraDexterity = extraDexterity + (_.isEqual(getExtraDexterityPerSubrace, undefined) ? 0 : getExtraDexterityPerSubrace)
          const totalExtraConstitution = extraConstitution + (_.isEqual(getExtraConstitutionPerSubrace, undefined) ? 0 : getExtraConstitutionPerSubrace)
          const totalExtraIntelligence = extraIntelligence + (_.isEqual(getExtraIntelligencePerSubrace, undefined) ? 0 : getExtraIntelligencePerSubrace)
          const totalExtraWisdom = extraWisdom + (_.isEqual(getExtraWisdomPerSubrace, undefined) ? 0 : getExtraWisdomPerSubrace)
          const totalExtraChairsma = extraChairsma + (_.isEqual(getExtraCharismaPerSubrace, undefined) ? 0 : getExtraCharismaPerSubrace)
          // Names
          const randomMaleName = e.gender_names.map(w => w.male)[0][Math.floor(Math.random() * e.gender_names.map(w => w.male)[0].length)]
          const randomFemaleName = e.gender_names.map(w => w.female)[0][Math.floor(Math.random() * e.gender_names.map(w => w.female)[0].length)]
          const randomFamilyName = e.gender_names.map(w => w.family)[0][Math.floor(Math.random() * e.gender_names.map(w => w.family)[0].length)]
          const combineNames = [{ Male: randomMaleName, Female: randomFemaleName }]
          const pickGender = Object.keys(combineNames[0])[Math.floor(Math.random() * Object.keys(combineNames[0]).length)]
          const pickNameFromGender = combineNames[0][pickGender]
          // Get stats from Class.
          const AC = getClass.AC
          const HP = getClass.HP
          const npcSize = getClass.size
          const npcType = getClass.type
          const classSpeed = getClass.speed
          const damageResistances = getClass.damageResistance
          const passivePerception = getClass.passivePerception
          const classLanguage = getClass.Language
          const challengeRating = getClass.Challenge
          // Get nested arrays from Class.
          const classStats = getClass.stats[0]
          const getSavingThrows = getClass.saving_throws[0] !== undefined ? getClass.saving_throws[0] : ''
          // Skills.
          const classSkills = getClass.skills[0]
          const classSkillsList = classSkills !== undefined ? Object.entries(classSkills) : ''
          // Features.
          const classFeatures = getClass.Features[0]
          const classFeaturesList = classFeatures !== undefined ? Object.entries(classFeatures) : ''
          // Actions.
          const classActions = getClass.Actions[0]
          const classActionsList = classActions !== undefined ? Object.entries(classActions) : ''
          // Reactions.
          const classReactions = getClass.Reactions[0]
          const classReactionsList = classReactions !== undefined ? Object.entries(classReactions) : ''

          return (
            <div key={i} className={'dndapp-npcrandomizer-choices-card-details-list'}>
              <div className={'dndapp-npcrandomizer-choices-card-details-list-top'}>
                <div className={'dndapp-npcrandomizer-choices-card-details-list-top-names'}>
                  <h2>{pickNameFromGender} {randomFamilyName ? ' ' + randomFamilyName : ''}</h2>
                  <h2>{pickGender} {pickedSubrace !== null ? pickedSubrace + ' ' : ''}{race}</h2>
                </div>
                <div className={'dndapp-npcrandomizer-choices-card-details-list-top-misc'}>
                  <span><strong>Age:</strong> {age}</span>
                  <span><strong>Size:</strong> {sizeFeet}&apos;{sizeInches}&apos;&apos;</span>
                  <span><strong>Weight:</strong> {weight}</span>
                  <span><strong>Speed:</strong> {speed} feet</span>
                  <span><strong>Languages:</strong> {languages[0].map(e => e + ' ')}</span>
                  <span><strong>Darkvision:</strong> {darkvision} feet</span>
                </div>
                {raceFeatures.map((feature, i) => {
                  return (
                    <div key={i} className={'dndapp-npcrandomizer-choices-card-details-list-racial-features'}>
                      <div className={'dndapp-npcrandomizer-choices-card-details-list-racial-features-title'}>
                        <h2>Racial Features: </h2>
                      </div>
                      <div className={'dndapp-npcrandomizer-choices-card-details-list-racial-features-values'}>
                        {Object.entries(feature).map(([key, value]) => {
                          return (
                            <div key={key} className={'dndapp-npcrandomizer-choices-card-details-list-racial-features-values-value'}>
                              <span><b>{key}: </b>{value}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
                {pickExtraFeaturePerPickedSubrace !== null && _.isEmpty(pickExtraFeaturePerPickedSubrace) === false
                  ? <div className={'dndapp-npcrandomizer-choices-card-details-racial-extra-features'}>
                    <div className={'dndapp-npcrandomizer-choices-card-details-racial-extra-features-title'}>
                      <h2>Subracial Features: </h2>
                    </div>
                    <div className={'dndapp-npcrandomizer-choices-card-details-racial-extra-features-list'}>
                      {Object.entries(pickExtraFeaturePerPickedSubrace).slice(1).map(([key, value]) => {
                        return (
                          <div key={key} className={'dndapp-npcrandomizer-choices-card-details-racial-extra-features-list-value'}>
                            <span><b>{key}: </b>{value}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  : null}
              </div>

              <div className={'dndapp-npcrandomizer-choices-card-details-list-class'}>
                <div className={'dndapp-npcrandomizer-choices-card-details-list-class-top'}>
                  <div className={'dndapp-npcrandomizer-choices-card-details-list-class-top-name'}>
                    <h2>{getClass.name}</h2>
                  </div>
                  <div className={'dndapp-npcrandomizer-choices-card-details-list-class-top-stats'}>
                    <span><i>{npcSize} {npcType}</i></span>
                    <span><strong>Armor Class</strong> {AC}</span>
                    <span><strong>Hit Points</strong> {HP}</span>
                    <span><strong>Speed</strong> {classSpeed}</span>
                  </div>
                </div>

                <div className={'dndapp-npcrandomizer-choices-card-details-list-class-stats'}>
                  <span><strong>STR</strong> {classStats.Strength + totalExtraStrength} ({this.getModifier(classStats.Strength + totalExtraStrength)})</span>
                  <span><strong>DEX</strong> {classStats.Dexterity + totalExtraDexterity} ({this.getModifier(classStats.Dexterity + totalExtraDexterity)})</span>
                  <span><strong>CON</strong> {classStats.Constitution + totalExtraConstitution} ({this.getModifier(classStats.Constitution + totalExtraConstitution)})</span>
                  <span><strong>INT</strong> {classStats.Intelligence + totalExtraIntelligence} ({this.getModifier(classStats.Intelligence + totalExtraIntelligence)})</span>
                  <span><strong>WIS</strong> {classStats.Wisdom + totalExtraWisdom} ({this.getModifier(classStats.Wisdom + totalExtraWisdom)})</span>
                  <span><strong>CHA</strong> {classStats.Charisma + totalExtraChairsma} ({this.getModifier(classStats.Charisma + totalExtraChairsma)})</span>
                </div>

                <div className={'dndapp-npcrandomizer-choices-card-details-list-class-attributes'}>
                  {getSavingThrows !== ''
                    ? <div className={'dndapp-npcrandomizer-choices-card-details-list-class-attributes-saving-throws'}>
                      <span><strong>Saving Throws</strong></span>
                      <span>{getSavingThrows.Strength !== undefined ? 'Str +' + getSavingThrows.Strength + ' ' : ''}</span>
                      <span>{getSavingThrows.Dexterity !== undefined ? 'Dex +' + getSavingThrows.Dexterity + ' ' : ''}</span>
                      <span>{getSavingThrows.Constitution !== undefined ? 'Con +' + getSavingThrows.Constitution + ' ' : ''}</span>
                      <span>{getSavingThrows.Intelligence !== undefined ? 'Int +' + getSavingThrows.Intelligence + ' ' : ''}</span>
                      <span>{getSavingThrows.Wisdom !== undefined ? 'Wis +' + getSavingThrows.Wisdom + ' ' : ''}</span>
                      <span>{getSavingThrows.Charisma !== undefined ? 'Cha +' + getSavingThrows.Charisma + ' ' : ''}</span>
                    </div>
                    : ''}
                  <div className={'dndapp-npcrandomizer-choices-card-details-list-class-attributes-misc'}>
                    {damageResistances !== '' ? <span><strong>Damage resistance</strong> {damageResistances}</span> : ''}
                    {passivePerception !== '' ? <span><strong>Passive perception</strong> {passivePerception}</span> : ''}
                    {classLanguage !== '' ? <span><strong>Languages</strong> {classLanguage}</span> : ''}
                    {challengeRating !== '' ? <span><strong>Challenge</strong> {challengeRating}</span> : ''}
                  </div>
                </div>

                {classSkillsList !== ''
                  ? <div className={'dndapp-npcrandomizer-choices-card-details-list-class-skills'}>
                    {classSkillsList.map(([key, value]) => {
                      return (
                        <div key={key} className={'dndapp-npcrandomizer-choices-card-details-list-class-skills-value'}>
                          <span><b>{key}: </b>{value}</span>
                        </div>
                      )
                    })}
                  </div>
                  : null}

                {classFeaturesList !== ''
                  ? <div className={'dndapp-npcrandomizer-choices-card-details-list-class-features'}>
                    {classFeaturesList.map(([key, value]) => {
                      return (
                        <div key={key} className={'dndapp-npcrandomizer-choices-card-details-list-class-features-value'}>
                          <span><b>{key}: </b>{value}</span>
                        </div>
                      )
                    })}
                  </div>
                  : null}

                {classActionsList !== ''
                  ? <div className={'dndapp-npcrandomizer-choices-card-details-list-class-actions'}>
                    {classActionsList.map(([key, value]) => {
                      return (
                        <div key={key} className={'dndapp-npcrandomizer-choices-card-details-list-class-actions-value'}>
                          <span><b>{key}: </b>{value}</span>
                        </div>
                      )
                    })}
                  </div>
                  : null}

                {classReactionsList !== ''
                  ? <div className={'dndapp-npcrandomizer-choices-card-details-list-class-reactions'}>
                    {classReactionsList.map(([key, value]) => {
                      return (
                        <div key={key} className={'dndapp-npcrandomizer-choices-card-details-list-class-reactions-value'}>
                          <span><b>{key}: </b>{value}</span>
                        </div>
                      )
                    })}
                  </div>
                  : null}

              </div>
            </div>
          )
        })}
        {dataPerRace.length === 0
          ? <div className={'dndapp-npcrandomizer-choices-card-details-none'}>
            <h2>Click one of the buttons above to generate a NPC!</h2>
          </div>
          : null}
      </div>
    )
  }

  render() {
    return (
      <div className={'dndapp-npcrandomzier'}>
        <div className={'dndapp-npcrandomizer-choices'}>
          <div className={'dndapp-npcrandomizer-choices-title'}>
            <h1>Randomize NPC</h1>
          </div>
          <div className={'dndapp-npcrandomizer-choices-btns'}>
            <div className={'btn'} onClick={(e) => this.pickRace()} >
              <span>Total Randomize</span>
            </div>
            <div className={'btn disabled'}>
              <span>Partial Randomize</span>
            </div>
          </div>
          <div className={'dndapp-npcrandomizer-choices-card'}>
            {this.npcCard()}
          </div>
        </div>
      </div>
    )
  }
}

export default NPCRandomizer
