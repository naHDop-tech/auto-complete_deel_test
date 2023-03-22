import React from 'react';
import './App.css';
import { ICommonStyle } from './components/commin-style-types'

import cs from './components/CommonStyle.module.css'

import { AutoCompleteDlc } from './components/dlc/AutoCompleteDlc'

const commonStyle = cs as unknown as ICommonStyle

function App() {
  return (
    <div className="App">
      <h1>Auto complete me</h1>
        <div className={commonStyle.Margin24} />
        <div className="padding-wrapper__32">
            <div className="input-wrapper__500">
                <AutoCompleteDlc />
            </div>
            {/*<div className={commonStyle.Margin24} />*/}
            {/*<div className="radio-selector__column">*/}
            {/*    <input type="radio" name="radio" />*/}
            {/*    <input type="radio" name="radio" />*/}
            {/*    <input type="radio" name="radio" />*/}
            {/*    <input type="radio" name="radio" />*/}
            {/*</div>*/}
        </div>
    </div>
  );
}

export default App;
