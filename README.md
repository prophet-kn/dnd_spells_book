# D&D 5e Companion

## INSTALLATION
- Run:
  - `nvm install 12.13.1`
  - `nvm use 12.13.1`
  - `git clone https://github.com/prophet-kn/dnd_spells_book.git`
  - `cd dnd_spells_bookSS`
  - `yarn install`

## RUNNING
- Make sure you're using the correct node version:
  - `nvm use 12.13.1`
- In two separate terminals, run:
  - `yarn gulp`
  - `npm start`

## TO DO LIST
- Music board sort of a thingy?
- Make a front page which shows 5 buttons - Spells List, Dice Rolling, Character Sheet, music board and NPC randomizer
- char sheet will be grayed out for now
- Since Pinned state is enabled, either add redux and create state store, or cookies, or a store that remembers the pinned elements (maybe the query idea, maybe a custom ID that referes to specific combination)


## TO DO - DONE
- INTEGRATE SASS - PRIORITY
- Pinned state
- Allow an on/off functionality for each of the buttons, so that you can select a few levels and display those -
