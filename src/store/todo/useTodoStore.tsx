import { useState } from "react";

import { ITodosContext } from "@root/contexts/todos";
import { ITodo } from "@store/todo/interface";

export function useTodoStore(): ITodosContext {
    const [todos, setTodos] = useState<ITodo[]>([])
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
    const [todo, setTodo] = useState<ITodo | null>(null)
    const [searchString, setSearchString] = useState<string>('')
    const [serverError, setServerError] = useState<string | null>(null)

    return {
        serverError,
        isDropdownOpen,
        setTodo,
        todo,
        todos,
        searchString,
        setTodos,
        setSearchString,
        setIsDropdownOpen,
        setServerError,
    }
}