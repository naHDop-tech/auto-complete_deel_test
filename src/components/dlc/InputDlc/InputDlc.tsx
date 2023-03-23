import { ChangeEvent, useCallback, useContext } from "react";

import { Input } from "@components/ui/Input";
import { apiClient } from "@root/clients/api";
import { ITodo } from "@store/todo/interface";
import { GenericMSResponse } from "@root/clients/api/interface";
import { TodosContext } from "@root/contexts/todos";
import { useDebouncedCallback } from "@hooks/useDebounce";

export function InputDlc() {
    const {
        setTodos,
        setSearchString,
        searchString,
        todo,
        setTodo,
        setIsDropdownOpen,
        isDropdownOpen,
        setServerError,
        serverError,
    } = useContext(TodosContext)
    const debounceDelay = 500
    
    const getTodos = async () => {
        if (isDropdownOpen) {
            setIsDropdownOpen(true)
        }
        try {
            // If you have limit filter a.k.a pagination
            // You can request first 10 and after that 
            // send new requests with filter and more pagination range
            const todos = await apiClient.get<ITodo, GenericMSResponse<ITodo[]>>('/todos')
            if (todos.data?.length) {
                // Usually this logic on server side
                const filteredTodos = todos.data.filter((t) => t.title.includes(searchString))
                setTodos(filteredTodos)
            }
            setServerError(null)
        } catch {
            setServerError("Serverside failed")
            setIsDropdownOpen(false)
        }
    }

    const debouncedOnSearch = useDebouncedCallback(getTodos, debounceDelay)

    const changeHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            if(todo?.title) {
                setTodo(null)
            }
            if (!isDropdownOpen) {
                setIsDropdownOpen(true)
            }
            setSearchString(e.target.value)
            debouncedOnSearch()
        },
        [
            debouncedOnSearch,
            todo,
            isDropdownOpen,
            setIsDropdownOpen,
            setSearchString,
            setTodo,
        ]
    )

    return (
        <Input
            errorText={serverError}
            label="Input text for searching"
            placeholder="Typing i.e. 'delectus...'"
            {
                ...(todo?.title ? { value: todo.title } : { value: searchString })
            }
            onChange={changeHandler}
        />
    );
}
