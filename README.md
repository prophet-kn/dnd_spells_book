# <a href="https://prophet-kn.github.io/dnd_spells_book/">Prophet's Companion</a>

## Check <a href="https://github.com/prophet-kn/dnd_spells_book/issues">issues</a> and <a href="https://github.com/prophet-kn/dnd_spells_book/projects">projects</a> to work on, if you wish to contribute. :)

# branching guidelines and creating issues
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
