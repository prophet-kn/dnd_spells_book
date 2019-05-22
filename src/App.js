import React from 'react';
import ClassSelector from './components/spells';
import './App.css';

function App() {
  return (

    <div className="dndapp">
      <header className="dndapp-header">
        D&#38;D Spellbook
      </header>
      <div className="class-selector">
        <ClassSelector />
      </div>
    </div>

  );
}

export default App;
