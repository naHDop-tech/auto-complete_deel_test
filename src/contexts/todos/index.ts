import { createContext } from 'react'

import { ITodo } from "../../store/todo/interface";

export interface ITodosContext {
    todos: ITodo[]
    todo: ITodo | null
    searchString: string
    setTodo: (todo: ITodo) => void,
    setTodos: (data: ITodo[]) => void
    setSearchString: (str: string) => void
}

export const TodosContext = createContext<ITodosContext>({
    todos: [],
    searchString: '',
    todo: null,
    setTodos: () => [],
    setSearchString: () => '',
    setTodo: () => null,
})
export const TodosProvider = TodosContext.Provider
