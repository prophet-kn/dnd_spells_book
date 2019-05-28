import React from 'react'
import Output from './components/output/output'
import './App.css'

function App() {
  return (

    <div className={"dndapp"}>
      <header className={"dndapp-header"}>
        D&#38;D Spellbook v0.0.7a
      </header>
      <div className={"dndapp-body"}>
        <Output />
      </div>
      <div className={'dndapp-footer'}>
        <i>Va'esse deireádh aep eigean, va'esse eigh faidh'ar</i>
        <i>by: prophet-kn</i>
      </div>
    </div>

  );
}

export default App
