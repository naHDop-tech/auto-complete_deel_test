import { ChangeEvent, useCallback, useContext } from "react";

import { Input } from "../../ui/Input";
import { apiClient } from "../../../clients/api";
import { ITodo } from "../../../store/todo/interface";
import { GenericMSResponse } from "../../../clients/api/interface";
import { TodosContext } from "../../../contexts/todos";
import { useDebouncedCallback } from "../../../hooks/useDebounce";

export function InputDlc() {
    const {
        setTodos,
        setSearchString,
        searchString,
        todo,
        setTodo,
        setIsDropdownOpen,
        isDropdownOpen,
    } = useContext(TodosContext)
    const debounceDelay = 500
    
    const getTodos = async () => {
        // If you have limit filter a.k.a pagination
        // You can request first 10 and after that 
        // sent requests with filter and more pagination range
        if (isDropdownOpen) {
            setIsDropdownOpen(true)
        }
        const todos = await apiClient.get<ITodo, GenericMSResponse<ITodo[]>>('todos')
        if (todos.data?.length) {
            const filteredTodos = todos.data.filter((t) => t.title.includes(searchString))
            setTodos(filteredTodos)
        }
    }

    const debouncedOnSearch = useDebouncedCallback(getTodos, debounceDelay)

    const changeHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            if(todo?.title) {
                setTodo(null)
            }
            if (isDropdownOpen) {
                setIsDropdownOpen(true)
            }
            setSearchString(e.target.value)
            debouncedOnSearch()
        },
        [searchString, debouncedOnSearch, todo, isDropdownOpen]
    )

    return (
        <Input
            label="Input text for searching"
            placeholder="Typing i.e. 'delectus...'"
            {
                ...(todo?.title ? { value: todo.title } : { value: searchString })
            }
            onChange={changeHandler}
        />
    );
}
