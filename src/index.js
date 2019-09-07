import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('dndapp'));
serviceWorker.unregister();

console.log( // eslint-disable-next-line
  "%c\                      |         |       |           \n\
  ,---.,---.,---.,---.|---.,---.|---    |__/ ,---.  \n\
  |   ||    |   ||   ||   ||---'|    ---|  \\ |   |  \n\
  |---'`    `---'|---'`   '`---'`---'   `   ``   '  \n\
  |              |                                  ", "background-color: black; color: red;"
)
