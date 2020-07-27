import React, { Component } from 'react'

class Lander extends Component {
  render() {
    return (
      <div className={'dndapp-lander'}>
        <h3>Welcome!</h3>
        <p>
          The purpose of this app is to provide a quick, mobile friendly and ad-free experience for a couple of features that utilize Dungeons & Dragons 5th Edition rules.
          It is useful for both the Dungeon Masters and Players alike! It is being expanded upon every once in a while, however development takes time.
          Many more things in the pipeline, though!
        </p>
        <h4>
          Use the navigation to get around.
        </h4>
        <p>
          Feel free to give feedback with the contribute button below on GitHub as well as provide ideas, features and bug reports!
          You can also help expanding the app by contributing code!
        </p>
        <div className={'dndapp-lander-extra'}>
          <div className={'dndapp-lander-extra-button'}>
            <a href="https://github.com/prophet-kn/dnd_spells_book" target="_blank" rel="noopener noreferrer"><span>Contribute</span></a>
          </div>
        </div>
      </div>
    )
  }
}

export default Lander
