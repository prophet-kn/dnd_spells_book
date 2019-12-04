# <a href="https://prophet-kn.github.io/dnd_spells_book/">Prophet's Companion</a>

---
# to do (features)
- Add a Ritual filter for spell list
- Create a SFX sound board for DMs
- Create a mobile character sheet with exportable/importable json file for local device storage
- Eventually create a backend and stop hosting on github pages
- Create an NPC randomizer

# to do (fix/refactor)
- Fix Pinned state (doesn't always work on first click)
- Fix main page buttons (doesn't always trigger properly, printing nothing at times)

# done
- INTEGRATE SASS
- Pinned state
- Allow an on/off functionality for each of the buttons, so that you can select a few levels and display those -
- Make a front page which shows 5 buttons - Spells List, Dice Rolling, Character Sheet, music board and NPC randomizer

---

# branching guidelines
### If you are creating a new feature, your branch should be something along the lines of:
- `feature/PC-{next-number}_{name-of-feature}`

### in example:

- `feature/PC-3_landing_page`

### If you are refactoring or fixing a piece of already existing code:
- `refactor/PCF-{next-number}_{name-of-refactor}`

### in example:

- `refactor/PCF-2_fixing_sass`


# installation
- Run:
  - `nvm install 12.13.1`
  - `nvm use 12.13.1`
  - `git clone https://github.com/prophet-kn/dnd_spells_book.git`
  - `cd dnd_spells_book`
  - `yarn install`
- or:
  - `npm install`

# running locally
- Make sure you're using the correct node version in your terminal:
  - `node -v`
    - `(it should be 12.13.1)`
- In two separate terminals, run:
  - `yarn gulp`
  - `yarn start`
- or
  - `gulp`
  - `npm start`
