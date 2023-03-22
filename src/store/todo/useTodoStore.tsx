import { useState } from "react";

import { ITodosContext } from "@root/contexts/todos";
import { ITodo } from "@store/todo/interface";

export function useTodoStore(): ITodosContext {
    const [defaultDotos, setDefaultTodos] = useState<ITodo[]>([])
    const [chosenTodo, setChosenTodo] = useState<ITodo | null>(null)
    const [searchStr, setSearchStr] = useState<string>('')

    return {
        setTodo: setChosenTodo,
        chosenTodo: chosenTodo,
        todos: defaultDotos,
        filteredStr: searchStr,
        setFilteredTodos: setDefaultTodos,
        setSearchStr: setSearchStr
    }
}