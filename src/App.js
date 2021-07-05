import React, { Component } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Nav from './components/nav/nav'
import SpellsTable from './components/data-table/spells-table'
import FeatsTable from './components/data-table/feats-table'
import DiceRolls from './components/dice-roll/dice-roll'
import NPCRandomizer from './components/npc-randomizer/npc-randomizer'
import Lander from './components/lander/lander'
import MonsterList from './components/monster-list/monster-list'
import '../src/compiled/theme.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: 'dark'
    }

    this.pickTheme = this.pickTheme.bind(this)
  }

  pickTheme() {
    return (
      <div className={'dndapp-wrapper-theme'}>
        <div className={'dndapp-wrapper-theme-picker dark'} onClick={() => this.setState({ theme: 'dark' })}>
          <svg width="50" height="50" viewBox="0 0 8 16"><path fillRule="evenodd" d="M0 8c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4z"></path></svg>
        </div>
        <div className={'dndapp-wrapper-theme-picker light'} onClick={() => this.setState({ theme: 'light' })}>
          <svg width="50" height="50" viewBox="0 0 8 16"><path fillRule="evenodd" d="M0 8c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4z"></path></svg>
        </div>
      </div>
    )
  }

  render() {
    const themeClass = ['dndapp-main']

    if (this.state.theme === 'dark') {
      themeClass.push('dark-theme')
    } else if (this.state.theme === 'light') {
      themeClass.push('light-theme')
    }

    return (
      <div className={themeClass.join(' ')}>
        <div className={'dndapp'}>

          <Router>
            <Nav />
            <div className={'dndapp-body'}>
              <Switch>
                <Route exact path='/' component={Lander} />
                <Route exact path='/spells-table' component={ SpellsTable } />
                <Route exact path='/feats-table' component={ FeatsTable } />
                <Route exact path='/dice-rolls' component={ DiceRolls } />
                <Route exact path='/npc-randomizer' component={ NPCRandomizer } />
                <Route exact path='/monster-list' component={ MonsterList } />
              </Switch>
            </div>
          </Router>

          <div className={'dndapp-body'}>
            {this.pickTheme()}
          </div>
          <div className={'dndapp-footer'}>
            <i>Va&apos;esse deireádh aep eigean, va&apos;esse eigh faidh&apos;ar</i>
            <i>by: <a target="_blank" rel="noopener noreferrer" href="https://github.com/prophet-kn">prophet-kn</a> {'&'} <a target="_blank" rel="noopener noreferrer" href="https://github.com/CuriousCactus">CuriousCactus</a></i>
            <br></br>
            <i>
              Wizards of the Coast, Dungeons &#38; Dragons, and their logos are trademarks of Wizards of the Coast LLC in the United States and other countries. © 1993-2020 Wizards. All Rights Reserved.
              This React App, Prophet&apos;s Companion, is not affiliated with, endorsed, sponsored, or specifically approved by Wizards of the Coast LLC. This React App, Prophet&apos;s Companion, may use the trademarks and other intellectual property of Wizards of the Coast LLC, which is permitted under <a href="https://dnd.wizards.com/articles/features/fan-site-kit">Wizards&apos; Fan Site Policy</a>. For example, Dungeons &#38; Dragons® is a trademark[s] of Wizards of the Coast. For more information about Wizards of the Coast or any of Wizards&apos; trademarks or other intellectual property, please visit their website at (<a href="https://www.wizards.com">www.wizards.com</a>).
            </i>
          </div>
        </div>
      </div>
    )
  }
}

export default App
