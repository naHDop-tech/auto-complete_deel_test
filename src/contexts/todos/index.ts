import { createContext } from 'react'

import { ITodo } from "../../store/todo/interface";

export interface ITodosContext {
    todos: ITodo[]
    chosenTodo: ITodo | null
    filteredStr: string
    setTodo: (todo: ITodo) => void,
    setFilteredTodos: (data: ITodo[]) => void
    setSearchStr: (str: string) => void
}

export const TodosContext = createContext<ITodosContext>({
    todos: [],
    filteredStr: '',
    chosenTodo: null,
    setFilteredTodos: () => [],
    setSearchStr: () => '',
    setTodo: () => null,
})
export const TodosProvider = TodosContext.Provider
