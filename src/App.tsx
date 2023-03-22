import './App.css';
import { ICommonStyle } from './components/commin-style-types'

import cs from './components/CommonStyle.module.css'

import { DropdownDlc } from './components/dlc/DropdownDlc'
import { TodosProvider } from './contexts/todos'
import { useTodoStore } from "./store/todo/useTodoStore";

const commonStyle = cs as unknown as ICommonStyle

function App() {
    const contextValue = useTodoStore()

    return (
        <div className="App">
            <TodosProvider value={contextValue}>
              <h1>Auto complete me</h1>
                <div className={commonStyle.Margin24} />
                <div className="padding-wrapper__32">
                    <div className="input-wrapper__500">
                        <DropdownDlc />
                    </div>
                </div>
            </TodosProvider>
        </div>
    );
}

export default App;
