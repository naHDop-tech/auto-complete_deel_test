import { createContext, Dispatch, SetStateAction } from 'react'

import { ITodo } from "@store/todo/interface";

export interface ITodosContext {
    isDropdownOpen: boolean
    todos: ITodo[]
    todo: ITodo | null
    searchString: string
    setTodo: Dispatch<SetStateAction<ITodo | null>>
    setTodos: Dispatch<SetStateAction<ITodo[]>>
    setSearchString: Dispatch<SetStateAction<string>>
    setIsDropdownOpen: Dispatch<SetStateAction<boolean>>
    
    serverError: string | null
    setServerError: (err: string | null) => void
}

export const TodosContext = createContext<ITodosContext>({
    isDropdownOpen: false,
    todos: [],
    searchString: '',
    todo: null,
    serverError: null,
    setTodos: () => [],
    setSearchString: () => '',
    setTodo: () => null,
    setIsDropdownOpen: () => null,
    setServerError: () => null
})
export const TodosProvider = TodosContext.Provider
