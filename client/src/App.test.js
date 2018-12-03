import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SearchTableContainer from './components/SearchTableContainer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

// it('renders without crashing', () => {
//   ReactDOM.render(<SearchTableContainer />);
// });


