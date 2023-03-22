import {ChangeEvent, useCallback, useContext, useMemo} from "react";

import { Input } from "../../ui/Input";
import { apiClient } from "../../../clients/api";
import { ITodo } from "../../../store/todo/interface";
import { GenericMSResponse } from "../../../clients/api/interface";
import { TodosContext } from "../../../contexts/todos";
import { debounce } from "../../../utils/debounce";

export function InputDlc() {
    const { setTodos, setSearchString, searchString, todo } = useContext(TodosContext)
    const debounceDelay = 1000
    
    const getTodos = async () => {
        // If you have limit filter a.k.a pagination
        // You can request first 10 and after that 
        // sent requests with filter and more pagination range
        const todos = await apiClient.get<ITodo, GenericMSResponse<ITodo[]>>('todos')
        if (todos.data?.length) {
            const filteredTodos = todos.data.filter((t) => t.title.includes(searchString))
            setTodos(filteredTodos)
        }
    }

    const debouncedOnSearch = useMemo(() => {
        if (debounceDelay > 0) {
            return debounce(getTodos, debounceDelay)
        }

        return getTodos
    }, [getTodos, debounceDelay])

    const changeHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setSearchString(e.target.value)
            debouncedOnSearch()
        },
        [searchString, debouncedOnSearch]
    )

    return (
        <Input onChange={changeHandler} />
    );
}
