import React from 'react';
import './App.css';

import { AutoCompleteDlc } from './components/dlc/AutoCompleteDlc'

function App() {
  return (
    <div className="App">
      <h1>Auto complete me</h1>
        <AutoCompleteDlc />
    </div>
  );
}

export default App;

// export const themes = {
//     light: {
//         '--color-background': '#1d2335',
//         '--color-text': '#ffffff',
//         '--color-accent': '#171725',
//         '--color-form-background': '#171725',
//     },
//     dark: {
//         '--color-background': '#ffffff',
//         '--color-text': '#1d2335',
//         '--color-accent': '#f1f1f5',
//         '--color-form-background': '#ffffff'
//     },
// }