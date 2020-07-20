import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Headroom from 'react-headroom'

class Menu extends Component {
  header() {
    return (
      <header className={"dndapp-top-menu"}>
        <Headroom disableInlineStyles>
          <nav>
            <ul>
              <li><Link to={'/'}>Home</Link></li>
              <li><Link to={'/spells'}>Spells</Link></li>
              <li><Link to={'/feats'}>Feats</Link></li>
              <li><Link to={'/dice'}>Dice</Link></li>
              <li><Link to={'/npcs'}>NPCs</Link></li>
            </ul>
          </nav>
        </Headroom>
      </header>
    )
  }

  lander() {
    return (
      <div className={'dndapp-lander'}>
        <div className={"dndapp-menu"}>
          <div className={'lander-button lander-logo'}>
            <Link to={'/'}>Prophet&#39;s<br></br>Companion<br></br>v0.60:41ph4</Link>
          </div>
          <div className={'lander-button'}>
            <Link to={'/spells'}>List of Spells</Link>
          </div>
          <div className={'lander-button'}>
            <Link to={'/feats'}>List of Feats</Link>
          </div>
          <div className={'lander-button'}>
            <Link to={'/dice'}>Dice Roll</Link>
          </div>
          <div className={'lander-button'}>
            <Link to={'/npcs'}>NPC Randomizer</Link>
          </div>
          <div className={'lander-button disabled'}>
            <span>Monster List</span>
          </div>
          <div className={'lander-button disabled'}>
            <span>Class Features</span>
          </div>
          <div className={'lander-button disabled'}>
            <span>List of Feats</span>
          </div>
          <div className={'lander-button disabled'}>
            <span>Character Sheet</span>
          </div>
          <div className={'lander-button disabled'}>
            <span>Music Board</span>
          </div>
        </div>
        <div className={'dndapp-lander-extra'}>
          <span>You can help expanding the app by contributing to the open source repository.</span>
          <div className={'dndapp-lander-extra-button'}>
            <a href="https://github.com/prophet-kn/dnd_spells_book" target="_blank" rel="noopener noreferrer"><span>Contribute</span></a>
          </div>
        </div>
      </div>
    )
  }

  render() {
    let menu = "";
    if (this.props.location.pathname === "/") {
      menu = this.lander()
    } else {
      menu = this.header()
    }

    return (
      <div className={"dndapp-menu-wrapper"}>
        {menu}
      </div>
    )
  }
}

export default withRouter(Menu)
