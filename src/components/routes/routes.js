// Routes.js
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from '../../components/home/home'
import SpellsTable from '../../components/data-table/spells-table'
import FeatsTable from '../../components/data-table/feats-table'
import DiceRolls from '../../components/dice-roll/dice-roll'
import NPCRandomizer from '../../components/npc-randomizer/npc-randomizer'

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/spells' component={SpellsTable} />
      <Route path='/feats' component={FeatsTable} />
      <Route path='/dice' component={DiceRolls} />
      <Route path='/npcs' component={NPCRandomizer} />
    </Switch>
  </BrowserRouter>
);
