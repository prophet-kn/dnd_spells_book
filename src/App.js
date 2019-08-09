import React from 'react'
import Output from './components/output/output'
import './App.css'

function App() {
  return (

    <div className={"dndapp"}>
      <header className={"dndapp-header"}>
        D&#38;D 5e Companion v0.40.41ph4
      </header>
      <div className={"dndapp-body"}>
        <Output />
      </div>
      <div className={'dndapp-footer'}>
        <i>Va'esse deireádh aep eigean, va'esse eigh faidh'ar</i>
        <i>by: <a href="https://github.com/prophet-kn">prophet-kn</a></i>
        <br></br>
        <i>
          Wizards of the Coast, Dungeons &#38; Dragons, and their logos are trademarks of Wizards of the Coast LLC in the United States and other countries. © 1993-2019 Wizards. All Rights Reserved.
          This React App, D&#38;D 5e Spellbook Companion, is not affiliated with, endorsed, sponsored, or specifically approved by Wizards of the Coast LLC. This React App, D&#38;D 5e Spellbook Companion, may use the trademarks and other intellectual property of Wizards of the Coast LLC, which is permitted under <a href="https://dnd.wizards.com/articles/features/fan-site-kit">Wizards' Fan Site Policy</a>. For example, Dungeons &#38; Dragons® is a trademark[s] of Wizards of the Coast. For more information about Wizards of the Coast or any of Wizards' trademarks or other intellectual property, please visit their website at (<a href="https://www.wizards.com">www.wizards.com</a>).
        </i>
      </div>
    </div>

  );
}

export default App
