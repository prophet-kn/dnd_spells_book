import React from 'react';
import ClassSelector from './components/classSelector';
import LevelSelector from './components/levelSelector';
import SchoolSelector from './components/schoolSelector';
import './App.css';

function App() {
  return (

    <div className="dndapp">
      <header className="dndapp-header">
        D&#38;D Spellbook
      </header>
      <ClassSelector />
      <LevelSelector />
      <SchoolSelector />
    </div>

  );
}

export default App;
