import React from 'react';
import './App.css';
const spells_json = require('./spells_list/spells.json');

console.log(spells_json);
function App() {
  return (

    <div className="dndapp">
      <header className="dndapp-header">
        D&#38;D Spellbook
      </header>
    </div>

  );
}

export default App;
